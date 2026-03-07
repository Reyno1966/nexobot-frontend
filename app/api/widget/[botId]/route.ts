import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { openai, AI_MODEL, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_SYSTEM_PROMPT_CHARS } from "@/lib/openai";
import { PLAN_LIMITS } from "@/lib/plans";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Cliente Supabase con service role para acceso sin auth del usuario
function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    const supabase = getAdminClient();

    // ── 1. Obtener bot ──
    const { data: bot, error: botError } = await supabase
      .from("bots")
      .select("*")
      .eq("id", botId)
      .single();

    if (botError || !bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });
    if (bot.status !== "active") return NextResponse.json({ error: "Bot inactivo" }, { status: 403 });

    // ── 2. Verificar límite del plan del dueño del bot ──
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("plan_name")
      .eq("user_id", bot.user_id)
      .eq("status", "active")
      .single();

    const planName = subData?.plan_name ?? "free";
    const limits = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];
    const currentCount = bot.messages_this_month ?? 0;

    if (limits.messages !== -1 && currentCount >= limits.messages) {
      return NextResponse.json({
        reply: "Este bot ha alcanzado el límite de mensajes del mes. Por favor, contacta al administrador.",
        limitReached: true,
      });
    }

    // ── 3. System prompt con límite de caracteres ──
    const systemPrompt = bot.system_prompt?.trim()
      ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
      : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional.`;

    const recentHistory: Message[] = (history as Message[])
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 800) }));

    // ── 4. Llamar a OpenAI ──
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

    // ── 5. Incrementar contador ──
    await supabase
      .from("bots")
      .update({
        messages_count: (bot.messages_count ?? 0) + 1,
        messages_this_month: currentCount + 1,
      })
      .eq("id", botId);

    // ── 6. CORS headers para embeds externos ──
    return NextResponse.json({ reply }, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });

  } catch (err) {
    console.error("Widget chat error:", err);
    return NextResponse.json({ error: "Error al procesar" }, { status: 500 });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
