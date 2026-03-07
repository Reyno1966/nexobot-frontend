import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { callOpenAI, AI_MODEL, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_SYSTEM_PROMPT_CHARS, needsMonthlyReset } from "@/lib/openai";
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

    // ── 4. Reset mensual automático ──
    let currentCount = bot.messages_this_month ?? 0;
    const resetNeeded = needsMonthlyReset(bot.last_reset_at);
    if (resetNeeded) {
      currentCount = 0;
    }

    // ── 5. Verificar límite del plan ──
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("plan_name")
      .eq("user_id", userId)
      .eq("status", "active")
      .single();

    const planName = subData?.plan_name ?? "free";
    const limits = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];

    if (limits.messages !== -1 && currentCount >= limits.messages) {
      return NextResponse.json({
        error: `Límite de ${limits.messages} mensajes/mes alcanzado. Mejora tu plan para continuar.`,
        limitReached: true,
      }, { status: 429 });
    }

    // ── 6. Preparar mensajes ──
    const systemPrompt = bot.system_prompt?.trim()
      ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
      : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional. Si no sabes algo, dilo con honestidad.`;

    const recentHistory: Message[] = (history as Message[])
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 1000) }));

    const userMessage = message.trim().substring(0, 800);

    // ── 7. Llamar a OpenAI con reintentos ──
    const completion = await callOpenAI({
      model: AI_MODEL,
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        ...recentHistory,
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "Lo siento, no pude procesar tu mensaje.";
    const tokensUsed = completion.usage?.total_tokens ?? 0;

    // ── 8. Actualizar contadores (con reset si aplica) ──
    await supabase
      .from("bots")
      .update({
        messages_count: (bot.messages_count ?? 0) + 1,
        messages_this_month: currentCount + 1,
        last_reset_at: resetNeeded ? new Date().toISOString() : bot.last_reset_at,
        updated_at: new Date().toISOString(),
      })
      .eq("id", botId);

    // ── 9. Guardar mensajes en historial ──
    try {
      // Buscar o crear conversación de prueba (dashboard)
      const sessionId = `dashboard-${userId}-${botId}`;
      let conversationId: string | null = null;

      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id")
        .eq("bot_id", botId)
        .eq("session_id", sessionId)
        .single();

      if (existingConv) {
        conversationId = existingConv.id;
        await supabase
          .from("conversations")
          .update({ last_message_at: new Date().toISOString(), message_count: (existingConv as { id: string; message_count?: number }).message_count ? (existingConv as { id: string; message_count: number }).message_count + 2 : 2 })
          .eq("id", conversationId);
      } else {
        const { data: newConv } = await supabase
          .from("conversations")
          .insert({ bot_id: botId, session_id: sessionId, visitor_name: "Prueba (Dashboard)", message_count: 2 })
          .select("id")
          .single();
        conversationId = newConv?.id ?? null;
      }

      if (conversationId) {
        await supabase.from("messages").insert([
          { conversation_id: conversationId, bot_id: botId, role: "user", content: userMessage, tokens_used: 0 },
          { conversation_id: conversationId, bot_id: botId, role: "assistant", content: reply, tokens_used: tokensUsed },
        ]);
      }
    } catch {
      // No interrumpir si falla el guardado del historial
    }

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
