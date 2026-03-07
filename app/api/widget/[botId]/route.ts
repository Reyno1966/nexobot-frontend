import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { callOpenAI, AI_MODEL, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_SYSTEM_PROMPT_CHARS, needsMonthlyReset } from "@/lib/openai";
import { PLAN_LIMITS } from "@/lib/plans";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const body = await req.json();
    const { message, history = [], sessionId } = body;

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

    if (botError || !bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404, headers: CORS });
    if (bot.status !== "active") return NextResponse.json({ error: "Bot inactivo" }, { status: 403, headers: CORS });

    // ── 2. Reset mensual automático ──
    let currentCount = bot.messages_this_month ?? 0;
    const resetNeeded = needsMonthlyReset(bot.last_reset_at);
    if (resetNeeded) currentCount = 0;

    // ── 3. Verificar límite del plan del dueño ──
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("plan_name")
      .eq("user_id", bot.user_id)
      .eq("status", "active")
      .single();

    const planName = subData?.plan_name ?? "free";
    const limits = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];

    if (limits.messages !== -1 && currentCount >= limits.messages) {
      return NextResponse.json({
        reply: "Este bot ha alcanzado el límite de mensajes del mes. Por favor, contacta al administrador.",
        limitReached: true,
      }, { headers: CORS });
    }

    // ── 4. System prompt ──
    const systemPrompt = bot.system_prompt?.trim()
      ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
      : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional.`;

    const recentHistory: Message[] = (history as Message[])
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 800) }));

    const userMessage = message.trim().substring(0, 800);

    // ── 5. Llamar a OpenAI con reintentos automáticos ──
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

    // ── 6. Actualizar contadores ──
    await supabase
      .from("bots")
      .update({
        messages_count: (bot.messages_count ?? 0) + 1,
        messages_this_month: currentCount + 1,
        last_reset_at: resetNeeded ? new Date().toISOString() : bot.last_reset_at,
      })
      .eq("id", botId);

    // ── 7. Guardar conversación y mensajes en historial ──
    try {
      const visitorSession = sessionId || `anon-${Date.now()}`;
      let conversationId: string | null = null;

      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id, message_count")
        .eq("bot_id", botId)
        .eq("session_id", visitorSession)
        .single();

      if (existingConv) {
        conversationId = existingConv.id;
        await supabase
          .from("conversations")
          .update({
            last_message_at: new Date().toISOString(),
            message_count: (existingConv.message_count ?? 0) + 2,
          })
          .eq("id", conversationId);
      } else {
        const { data: newConv } = await supabase
          .from("conversations")
          .insert({
            bot_id: botId,
            session_id: visitorSession,
            visitor_name: "Visitante",
            message_count: 2,
          })
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
      // No interrumpir el flujo principal si falla el historial
    }

    return NextResponse.json({ reply }, { headers: CORS });

  } catch (err) {
    console.error("Widget chat error:", err);
    return NextResponse.json({ error: "Error al procesar" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
