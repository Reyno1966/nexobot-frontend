import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  callOpenAI,
  AI_MODEL,
  MAX_OUTPUT_TOKENS,
  MAX_HISTORY_MESSAGES,
  MAX_SYSTEM_PROMPT_CHARS,
  MAX_MESSAGES_PER_SESSION,
  needsMonthlyReset,
} from "@/lib/openai";
import { PLAN_LIMITS } from "@/lib/plans";
import { sendLimitAlertEmail, sendNewLeadEmail, sendLimitReachedEmail } from "@/lib/email";

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

// ── CORS dinámico según dominio registrado ──
function getCorsHeaders(allowedOrigin: string) {
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  const requestOrigin = req.headers.get("origin") || "*";

  try {
    const { botId } = await params;
    const body = await req.json();
    const { message, history = [], sessionId } = body;

    if (!message?.trim()) {
      return NextResponse.json(
        { error: "Mensaje vacío" },
        { status: 400, headers: getCorsHeaders(requestOrigin) }
      );
    }

    const supabase = getAdminClient();

    // ── 1. Obtener bot ──
    const { data: bot, error: botError } = await supabase
      .from("bots")
      .select("*")
      .eq("id", botId)
      .single();

    if (botError || !bot) {
      return NextResponse.json(
        { error: "Bot no encontrado" },
        { status: 404, headers: getCorsHeaders(requestOrigin) }
      );
    }
    if (bot.status !== "active") {
      return NextResponse.json(
        { error: "Bot inactivo" },
        { status: 403, headers: getCorsHeaders(requestOrigin) }
      );
    }

    // ── 2. Validar origen por dominio registrado del cliente ──
    let allowedOrigin = "*";
    const { data: profile } = await supabase
      .from("profiles")
      .select("company_website")
      .eq("user_id", bot.user_id)
      .single();

    if (profile?.company_website) {
      try {
        const website = profile.company_website.startsWith("http")
          ? profile.company_website
          : `https://${profile.company_website}`;
        const registeredOrigin = new URL(website).origin;
        allowedOrigin = registeredOrigin;

        // Si el origen de la petición no coincide con el dominio registrado → rechazar
        if (requestOrigin !== "*" && requestOrigin !== registeredOrigin) {
          return NextResponse.json(
            { error: "Origen no autorizado" },
            { status: 403, headers: getCorsHeaders(allowedOrigin) }
          );
        }
      } catch {
        // URL inválida en perfil → permitir todo
        allowedOrigin = "*";
      }
    }

    const CORS = getCorsHeaders(allowedOrigin);

    // ── 3. Reset mensual automático ──
    let currentCount = bot.messages_this_month ?? 0;
    const resetNeeded = needsMonthlyReset(bot.last_reset_at);
    if (resetNeeded) currentCount = 0;

    // ── 4. Verificar límite del plan del dueño ──
    const { data: subData } = await supabase
      .from("subscriptions")
      .select("plan_name")
      .eq("user_id", bot.user_id)
      .eq("status", "active")
      .single();

    const planName = subData?.plan_name ?? "free";
    const limits = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];

    if (limits.messages !== -1 && currentCount >= limits.messages) {
      return NextResponse.json(
        {
          reply: "Este bot ha alcanzado el límite de mensajes del mes. Por favor, contacta al administrador.",
          limitReached: true,
          messagesLeft: 0,
        },
        { headers: CORS }
      );
    }

    // ── 5. Verificar límite por sesión de visitante ──
    const visitorSession = sessionId || `anon-${Date.now()}`;
    const { data: existingConv } = await supabase
      .from("conversations")
      .select("id, message_count")
      .eq("bot_id", botId)
      .eq("session_id", visitorSession)
      .single();

    // message_count se incrementa de 2 en 2 (user + assistant), dividimos para obtener turnos reales
    const sessionTurns = Math.floor((existingConv?.message_count ?? 0) / 2);
    if (sessionTurns >= MAX_MESSAGES_PER_SESSION) {
      return NextResponse.json(
        {
          reply: "Has alcanzado el límite de mensajes para esta sesión. Por favor, recarga la página para continuar.",
          limitReached: true,
          messagesLeft: limits.messages === -1 ? -1 : limits.messages - currentCount,
        },
        { headers: CORS }
      );
    }

    // ── 6. System prompt ──
    const systemPrompt = bot.system_prompt?.trim()
      ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
      : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional.`;

    const recentHistory: Message[] = (history as Message[])
      .slice(-MAX_HISTORY_MESSAGES)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 800) }));

    const userMessage = message.trim().substring(0, 800);

    // ── 7. Llamar a OpenAI con reintentos automáticos ──
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

    // ── 8. Actualizar contadores del bot ──
    await supabase
      .from("bots")
      .update({
        messages_count: (bot.messages_count ?? 0) + 1,
        messages_this_month: currentCount + 1,
        last_reset_at: resetNeeded ? new Date().toISOString() : bot.last_reset_at,
      })
      .eq("id", botId);

    // ── 9. Guardar conversación y mensajes en historial ──
    try {
      let conversationId: string | null = null;

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

      // ── Notificar nuevo lead al dueño (solo en conversación nueva) ──
      if (!existingConv) {
        supabase.auth.admin.getUserById(bot.user_id).then(({ data }) => {
          const email = data?.user?.email;
          if (email) sendNewLeadEmail({ to: email, botName: bot.name }).catch(() => {});
        }).catch(() => {});
      }
    } catch {
      // No interrumpir el flujo principal si falla el historial
    }

    // ── 10. Alertas por email al 80% y al 100% del límite mensual ──
    const newCount = currentCount + 1;
    if (limits.messages !== -1) {
      const threshold80 = Math.floor(limits.messages * 0.8);
      // Alerta al 80% (se dispara una sola vez)
      if (newCount === threshold80) {
        supabase.auth.admin.getUserById(bot.user_id).then(({ data: ownerData }) => {
          const ownerEmail = ownerData?.user?.email;
          if (ownerEmail) {
            sendLimitAlertEmail({
              to:            ownerEmail,
              botName:       bot.name,
              planName:      planName,
              messagesUsed:  newCount,
              messagesLimit: limits.messages,
            }).catch(() => {});
          }
        }).catch(() => {});
      }
      // Alerta al 100% — último mensaje procesado antes del bloqueo
      if (newCount >= limits.messages) {
        supabase.auth.admin.getUserById(bot.user_id).then(({ data: ownerData }) => {
          const ownerEmail = ownerData?.user?.email;
          if (ownerEmail) {
            sendLimitReachedEmail({
              to:            ownerEmail,
              botName:       bot.name,
              planName:      planName,
              messagesLimit: limits.messages,
            }).catch(() => {});
          }
        }).catch(() => {});
      }
    }

    // ── 11. Respuesta final con mensajes restantes ──
    const messagesLeft = limits.messages === -1 ? -1 : limits.messages - newCount;

    return NextResponse.json({ reply, messagesLeft }, { headers: CORS });

  } catch (err) {
    console.error("Widget chat error:", err);
    return NextResponse.json(
      { error: "Error al procesar" },
      { status: 500, headers: getCorsHeaders(requestOrigin) }
    );
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
