import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { openai, AI_MODEL, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_SYSTEM_PROMPT_CHARS } from "@/lib/openai";
import { PLAN_LIMITS } from "@/lib/plans";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    // ── 1. Autenticación con auto-refresh ──
    const auth = await getAuth();
    if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { supabase, userId } = auth;

    // ── 2. Leer body ──
    const body = await req.json();
    const { botId, message, history = [] } = body;

    if (!botId || !message?.trim()) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // ── 3. Obtener bot y verificar pertenencia ──
    const { data: bot, error: botError } = await supabase
      .from("bots")
      .select("*")
      .eq("id", botId)
      .eq("user_id", userId)
      .single();

    if (botError || !bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });
    if (bot.status !== "active") return NextResponse.json({ error: "El bot está inactivo" }, { status: 403 });

    // ── 4. Verificar límite del plan ──
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("plan_name")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    const planName = subData?.plan_name ?? "free";
    const limits = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];
    const currentCount = bot.messages_this_month ?? 0;

    if (limits.messages !== -1 && currentCount >= limits.messages) {
      return NextResponse.json({
        error: `Límite de ${limits.messages} mensajes/mes alcanzado. Mejora tu plan para continuar.`,
        limitReached: true,
      }, { status: 429 });
    }

    // ── 5. Preparar mensajes con límite de historial ──
    const systemPrompt = bot.system_prompt?.trim()
      ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
      : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional. Si no sabes algo, dilo con honestidad.`;

    const recentHistory: Message[] = (history as Message[])
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 1000) }));

    // ── 6. Llamar a OpenAI ──
    const completion = await openai.chat.completions.create({
      model: AI_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...recentHistory,
        { role: "user", content: message.trim().substring(0, 800) },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "Lo siento, no pude procesar tu mensaje.";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    // ── 7. Incrementar contador de mensajes ──
    await supabase
      .from("bots")
      .update({
        messages_count: (bot.messages_count ?? 0) + 1,
        messages_this_month: currentCount + 1,
        updated_at: new Date().toISOString(),
      })
      .eq("id", botId);

    return NextResponse.json({
      reply,
      tokensUsed,
      messagesLeft: limits.messages === -1 ? -1 : limits.messages - currentCount - 1,
    });

  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("Error en chat API:", message);
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 });
  }
}
