/**
 * lib/agentLoop.ts
 * Motor del Agente AI con soporte de herramientas (tool calling).
 * Reemplaza la llamada única a OpenAI por un loop que puede ejecutar
 * herramientas (inventario, citas, productos) antes de responder.
 *
 * Solo se usa cuando bot.agent_enabled = true.
 * Máx. 4 iteraciones para respetar el timeout de 15s de Meta WhatsApp.
 */

import { SupabaseClient } from "@supabase/supabase-js";
import { openai, AI_MODEL, MAX_OUTPUT_TOKENS } from "@/lib/openai";
import type {
  ChatCompletionMessageParam,
  ChatCompletionTool,
  ChatCompletionAssistantMessageParam,
} from "openai/resources/chat/completions";

// ── Contexto compartido por todas las herramientas ────────────────────────────

export interface AgentContext {
  supabase: SupabaseClient;
  userId:   string;
  botId:    string;
}

// ── Definición de herramientas para OpenAI ────────────────────────────────────

export const BOT_TOOLS: ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_inventory",
      description:
        "Obtiene el inventario actual: productos disponibles con nombre, precio y stock. " +
        "Úsala cuando el usuario pregunte por productos, precios o disponibilidad.",
      parameters: { type: "object", properties: {}, required: [] },
    },
  },
  {
    type: "function",
    function: {
      name: "get_products",
      description:
        "Busca productos por nombre o categoría. Más precisa que get_inventory cuando el usuario " +
        "menciona un producto concreto.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Término de búsqueda (nombre o categoría del producto)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_appointments",
      description:
        "Consulta citas agendadas. Úsala para verificar disponibilidad o buscar citas existentes " +
        "antes de crear una nueva.",
      parameters: {
        type: "object",
        properties: {
          date: {
            type: "string",
            description: "Fecha a consultar en formato YYYY-MM-DD (opcional)",
          },
          visitor_name: {
            type: "string",
            description: "Nombre del visitante para filtrar (opcional)",
          },
        },
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_appointment",
      description:
        "Crea una nueva cita SOLO cuando el usuario ha confirmado explícitamente todos los datos " +
        "requeridos: nombre completo, fecha, hora y tipo de servicio.",
      parameters: {
        type: "object",
        properties: {
          visitor_name:     { type: "string", description: "Nombre completo del visitante" },
          visitor_email:    { type: "string", description: "Email del visitante (opcional)" },
          visitor_phone:    { type: "string", description: "Teléfono del visitante (opcional)" },
          service:          { type: "string", description: "Tipo de servicio o especialidad" },
          appointment_date: { type: "string", description: "Fecha en formato YYYY-MM-DD" },
          appointment_time: { type: "string", description: "Hora en formato HH:MM (24h)" },
          notes:            { type: "string", description: "Notas adicionales (opcional)" },
        },
        required: ["visitor_name", "appointment_date", "appointment_time", "service"],
      },
    },
  },
];

// ── Ejecución de herramientas ──────────────────────────────────────────────────

export async function executeTool(
  name: string,
  args: Record<string, unknown>,
  ctx: AgentContext
): Promise<unknown> {
  const { supabase, userId, botId } = ctx;

  switch (name) {
    case "get_inventory": {
      const { data } = await supabase
        .from("products")
        .select("name, price, currency, stock, unit")
        .eq("user_id", userId)
        .neq("status", "inactive")
        .gt("stock", 0)
        .order("name")
        .limit(30);

      if (!data || data.length === 0) {
        return { message: "No hay productos disponibles en este momento." };
      }
      return { products: data };
    }

    case "get_products": {
      const query = typeof args.query === "string" ? args.query : "";
      let q = supabase
        .from("products")
        .select("name, description, price, currency, stock, unit")
        .eq("user_id", userId)
        .neq("status", "inactive")
        .gt("stock", 0)
        .order("name")
        .limit(20);
      if (query) q = q.ilike("name", `%${query}%`);
      const { data } = await q;
      if (!data || data.length === 0) {
        return { message: "No se encontraron productos con esa búsqueda." };
      }
      return { products: data };
    }

    case "search_appointments": {
      const date        = typeof args.date === "string"         ? args.date         : null;
      const visitorName = typeof args.visitor_name === "string" ? args.visitor_name : null;

      let q = supabase
        .from("appointments")
        .select("visitor_name, service, appointment_date, appointment_time, status")
        .eq("bot_id", botId)
        .order("appointment_date")
        .order("appointment_time")
        .limit(10);

      if (date)        q = q.eq("appointment_date", date);
      if (visitorName) q = q.ilike("visitor_name", `%${visitorName}%`);

      const { data } = await q;
      if (!data || data.length === 0) {
        return { message: "No se encontraron citas para los criterios indicados." };
      }
      return { appointments: data };
    }

    case "create_appointment": {
      const visitorName     = typeof args.visitor_name     === "string" ? args.visitor_name     : "Visitante";
      const appointmentDate = typeof args.appointment_date === "string" ? args.appointment_date : null;
      const appointmentTime = typeof args.appointment_time === "string" ? args.appointment_time : null;
      const service         = typeof args.service          === "string" ? args.service          : null;

      if (!appointmentDate || !appointmentTime) {
        return { error: "Se necesitan fecha y hora para crear la cita." };
      }

      // Verificar duplicado
      const { data: existing } = await supabase
        .from("appointments")
        .select("id")
        .eq("bot_id", botId)
        .eq("appointment_date", appointmentDate)
        .eq("appointment_time", appointmentTime)
        .single();

      if (existing) {
        return { error: "Ya existe una cita en esa fecha y hora. Por favor elige otro horario." };
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          bot_id:           botId,
          visitor_name:     visitorName,
          visitor_email:    typeof args.visitor_email === "string" ? args.visitor_email : null,
          visitor_phone:    typeof args.visitor_phone === "string" ? args.visitor_phone : null,
          service,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          notes:            typeof args.notes === "string" ? args.notes : null,
          status:           "pending",
        })
        .select("id")
        .single();

      if (error) return { error: "Error al crear la cita. Por favor inténtalo de nuevo." };

      return {
        success: true,
        message: `Cita creada para ${visitorName} el ${appointmentDate} a las ${appointmentTime}.`,
        id: data?.id,
      };
    }

    default:
      return { error: `Herramienta desconocida: ${name}` };
  }
}

// ── Loop principal del agente ─────────────────────────────────────────────────

export interface AgentLoopResult {
  reply:      string;
  tokensUsed: number;
}

/**
 * Ejecuta el loop del agente AI con tool calling.
 * Máx. 4 iteraciones para cumplir con el timeout de 15s de Meta WhatsApp.
 */
export async function runAgentLoop(
  messages: ChatCompletionMessageParam[],
  ctx: AgentContext,
  maxIterations = 4
): Promise<AgentLoopResult> {
  let totalTokens = 0;
  const loopMessages: ChatCompletionMessageParam[] = [...messages];

  for (let i = 0; i < maxIterations; i++) {
    const response = await openai.chat.completions.create({
      model:       AI_MODEL,
      max_tokens:  MAX_OUTPUT_TOKENS,
      temperature: 0.7,
      messages:    loopMessages,
      tools:       BOT_TOOLS,
      tool_choice: "auto",
      stream:      false,
    });

    totalTokens += response.usage?.total_tokens ?? 0;
    const choice = response.choices[0];

    // ── Respuesta de texto final ───────────────────────────────────────────
    if (choice.finish_reason === "stop" || !choice.message.tool_calls?.length) {
      return {
        reply:      choice.message.content ?? "Lo siento, no pude procesar tu consulta.",
        tokensUsed: totalTokens,
      };
    }

    // ── El modelo quiere llamar herramientas ───────────────────────────────
    loopMessages.push(choice.message as ChatCompletionAssistantMessageParam);

    for (const toolCall of choice.message.tool_calls) {
      if (toolCall.type !== "function") continue;

      let args: Record<string, unknown> = {};
      try {
        args = JSON.parse(toolCall.function.arguments) as Record<string, unknown>;
      } catch { /* args queda vacío */ }

      const result = await executeTool(toolCall.function.name, args, ctx);

      loopMessages.push({
        role:         "tool",
        tool_call_id: toolCall.id,
        content:      JSON.stringify(result),
      });
    }
  }

  // Fallback si se agotaron las iteraciones sin respuesta final
  return {
    reply:      "Lo siento, no pude completar tu consulta en este momento. ¿Puedo ayudarte con algo más?",
    tokensUsed: totalTokens,
  };
}
