/**
 * lib/processBotMessage.ts
 * Lógica central del bot: límites de plan, OpenAI, alertas, contadores.
 * Reutilizable desde app/api/chat (dashboard/widget) y app/api/whatsapp/webhook.
 * NO depende de cookies ni de getAuth() — recibe userId y supabase ya listos.
 */

import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { callOpenAI, AI_MODEL, MAX_OUTPUT_TOKENS, MAX_HISTORY_MESSAGES, MAX_SYSTEM_PROMPT_CHARS, needsMonthlyReset } from "@/lib/openai";
import { runAgentLoop, AGENT_SYSTEM_INSTRUCTIONS } from "@/lib/agentLoop";
import { tryExtractAppointment } from "@/lib/appointments";
import { getInventoryContext } from "@/lib/getInventoryContext";
import { PLAN_LIMITS } from "@/lib/plans";
import { sendLimitAlertEmail, sendLimitReachedEmail } from "@/lib/email";

export interface BotMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ProcessBotMessageParams {
  userId:  string;
  botId:   string;
  message: string;
  history: BotMessage[];
  supabase: SupabaseClient;
  /** "dashboard" = prueba interna; "widget" = iframe; "whatsapp" = canal WA */
  source?: "dashboard" | "widget" | "whatsapp";
}

export interface ProcessBotMessageResult {
  reply:        string;
  tokensUsed:   number;
  messagesLeft: number;     // -1 = ilimitado
  limitReached: boolean;
  error?:       string;
}

/**
 * Función principal — procesa un mensaje del usuario y devuelve la respuesta del bot.
 * En caso de límite alcanzado devuelve { limitReached: true, reply: "" }.
 * En caso de error interno devuelve { error: "..." }.
 */
export async function processBotMessage({
  userId,
  botId,
  message,
  history,
  supabase,
  source = "dashboard",
}: ProcessBotMessageParams): Promise<ProcessBotMessageResult> {

  // ── 1. Obtener bot y verificar pertenencia ────────────────────────────────
  const { data: bot, error: botError } = await supabase
    .from("bots")
    .select("*")
    .eq("id", botId)
    .eq("user_id", userId)
    .single();

  if (botError || !bot) {
    return { reply: "", tokensUsed: 0, messagesLeft: 0, limitReached: false, error: "Bot no encontrado" };
  }
  if (bot.status !== "active") {
    return { reply: "", tokensUsed: 0, messagesLeft: 0, limitReached: false, error: "El bot está inactivo" };
  }

  // ── 2. Reset mensual automático ───────────────────────────────────────────
  let currentCount = bot.messages_this_month ?? 0;
  const resetNeeded = needsMonthlyReset(bot.last_reset_at);
  if (resetNeeded) currentCount = 0;

  // ── 3. Verificar límite del plan ──────────────────────────────────────────
  const { data: subData } = await supabase
    .from("subscriptions")
    .select("plan_name")
    .eq("user_id", userId)
    .eq("status", "active")
    .single();

  const planName = subData?.plan_name ?? "free";
  const limits   = PLAN_LIMITS[planName] ?? PLAN_LIMITS["free"];

  if (limits.messages !== -1 && currentCount >= limits.messages) {
    return {
      reply: `Límite de ${limits.messages} mensajes/mes alcanzado. Por favor mejora tu plan para continuar.`,
      tokensUsed: 0,
      messagesLeft: 0,
      limitReached: true,
    };
  }

  // ── 4. Preparar system prompt ─────────────────────────────────────────────
  const basePrompt = bot.system_prompt?.trim()
    ? bot.system_prompt.substring(0, MAX_SYSTEM_PROMPT_CHARS)
    : `Eres ${bot.name}, un asistente de IA amable y útil. Responde siempre de forma concisa y profesional.`;

  // Contexto de inventario (si el cliente tiene productos)
  const inventoryCtx = await getInventoryContext(userId, supabase);

  // En modo agente, inyectar protocolo de agendamiento al final del system prompt
  const agentInstructions = bot.agent_enabled ? AGENT_SYSTEM_INSTRUCTIONS : "";
  const systemPrompt = basePrompt + inventoryCtx + agentInstructions;

  // ── 5. Preparar historial recortado ──────────────────────────────────────
  const recentHistory: BotMessage[] = history
    .slice(-MAX_HISTORY_MESSAGES)
    .map((m) => ({ role: m.role, content: String(m.content).substring(0, 1000) }));

  const userMessage = message.trim().substring(0, 800);

  // ── 6. Llamar a OpenAI — modo agente o modo simple ────────────────────────
  let reply      = "";
  let tokensUsed = 0;

  const openAIMessages = [
    { role: "system" as const, content: systemPrompt },
    ...recentHistory,
    { role: "user" as const, content: userMessage },
  ];

  try {
    if (bot.agent_enabled) {
      // Modo Agente AI: loop con tool calling (get_inventory, search_appointments, etc.)
      const agentResult = await runAgentLoop(openAIMessages, { supabase, userId, botId });
      reply      = agentResult.reply;
      tokensUsed = agentResult.tokensUsed;
    } else {
      // Modo clásico: una sola llamada a OpenAI (comportamiento original)
      const completion = await callOpenAI({
        model:       AI_MODEL,
        max_tokens:  MAX_OUTPUT_TOKENS,
        temperature: 0.7,
        messages:    openAIMessages,
      });
      reply      = completion.choices[0]?.message?.content ?? "Lo siento, no pude procesar tu mensaje.";
      tokensUsed = completion.usage?.total_tokens ?? 0;
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    console.error("[processBotMessage] OpenAI error:", msg);
    return { reply: "", tokensUsed: 0, messagesLeft: 0, limitReached: false, error: "Error al procesar con IA" };
  }

  // ── 7. Extracción de citas (fire & forget) ────────────────────────────────
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  tryExtractAppointment(recentHistory, userMessage, reply, botId, adminSupabase).catch(() => {});

  // ── 8. Actualizar contadores del bot ─────────────────────────────────────
  const newCount = currentCount + 1;
  await supabase
    .from("bots")
    .update({
      messages_count:     (bot.messages_count ?? 0) + 1,
      messages_this_month: newCount,
      last_reset_at:      resetNeeded ? new Date().toISOString() : bot.last_reset_at,
      updated_at:         new Date().toISOString(),
    })
    .eq("id", botId);

  // ── 9. Alertas de límite (80% y 100%) ────────────────────────────────────
  if (limits.messages !== -1) {
    const prevPct = Math.round((currentCount / limits.messages) * 100);
    const newPct  = Math.round((newCount     / limits.messages) * 100);
    if ((prevPct < 80 && newPct >= 80) || newCount >= limits.messages) {
      const { data: authData } = await supabase.auth.getUser();
      const userEmail = authData?.user?.email;
      if (userEmail) {
        if (newCount >= limits.messages) {
          sendLimitReachedEmail({ to: userEmail, botName: bot.name, planName, messagesLimit: limits.messages }).catch(() => {});
        } else {
          sendLimitAlertEmail({ to: userEmail, botName: bot.name, planName, messagesUsed: newCount, messagesLimit: limits.messages }).catch(() => {});
        }
      }
    }
  }

  const messagesLeft = limits.messages === -1 ? -1 : limits.messages - newCount;

  return { reply, tokensUsed, messagesLeft, limitReached: false };
}
