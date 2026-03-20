/**
 * lib/agentLoop.ts
 * Motor del Agente AI con soporte de herramientas (tool calling).
 * Reemplaza la llamada única a OpenAI por un loop que puede ejecutar
 * herramientas (inventario, citas, clientes) antes de responder.
 *
 * Solo se usa cuando bot.agent_enabled = true.
 * Máx. 5 iteraciones para respetar el timeout de 15s de Meta WhatsApp.
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

// ── Instrucciones del agente (se inyectan al system prompt cuando agent_enabled) ──

export const AGENT_SYSTEM_INSTRUCTIONS = `

---
## PROTOCOLO DEL AGENTE DE AGENDAMIENTO

Cuando el usuario quiera agendar una cita, sigue este protocolo:

1. **Recopila los datos obligatorios de forma conversacional, uno a uno:**
   - Nombre completo
   - Teléfono de contacto
   - Email (opcional — dilo como "para enviarte la confirmación")
   - Servicio o motivo de la cita
   - Fecha preferida (si duda, sugiere opciones esta semana)
   - Hora preferida

2. **Verifica disponibilidad** con search_appointments antes de confirmar.
   Si el horario está ocupado, propón horarios alternativos cercanos.

3. **Muestra un resumen** con todos los datos y pide confirmación explícita.

4. **Solo cuando el cliente confirme**, ejecuta en orden:
   a. upsert_customer (registra o actualiza el cliente)
   b. create_appointment (crea la cita usando el customer_id devuelto)

5. **Confirma con resumen final:**
   "✅ ¡Cita agendada! [nombre] — [servicio] — [fecha] a las [hora]"

**Reglas de tono:**
- Amable, conciso y profesional
- Máximo 2-3 líneas por respuesta
- No hagas múltiples preguntas a la vez
- Usa emojis con moderación para calidez (📅 ✅ 📞)`;

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
        "Consulta citas agendadas. Úsala para verificar disponibilidad en una fecha/hora " +
        "antes de crear una nueva cita.",
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
      name: "upsert_customer",
      description:
        "Registra un nuevo cliente o actualiza uno existente por teléfono. " +
        "SIEMPRE llama a esta herramienta antes de create_appointment. " +
        "Devuelve el customer_id necesario para vincular la cita.",
      parameters: {
        type: "object",
        properties: {
          name:  { type: "string", description: "Nombre completo del cliente" },
          phone: { type: "string", description: "Teléfono de contacto del cliente" },
          email: { type: "string", description: "Email del cliente (opcional)" },
          notes: { type: "string", description: "Notas adicionales del cliente (opcional)" },
        },
        required: ["name", "phone"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "create_appointment",
      description:
        "Crea una nueva cita. SOLO llama a esta herramienta cuando el cliente haya confirmado " +
        "explícitamente todos los datos y ya tengas el customer_id de upsert_customer.",
      parameters: {
        type: "object",
        properties: {
          customer_id:      { type: "string", description: "ID del cliente devuelto por upsert_customer" },
          visitor_name:     { type: "string", description: "Nombre completo del cliente" },
          visitor_phone:    { type: "string", description: "Teléfono de contacto del cliente" },
          visitor_email:    { type: "string", description: "Email del cliente (opcional)" },
          service:          { type: "string", description: "Tipo de servicio o motivo de la cita" },
          appointment_date: { type: "string", description: "Fecha en formato YYYY-MM-DD" },
          appointment_time: { type: "string", description: "Hora en formato HH:MM (24h)" },
          notes:            { type: "string", description: "Notas adicionales (opcional)" },
        },
        required: ["visitor_name", "visitor_phone", "appointment_date", "appointment_time", "service"],
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
        return { available: true, message: "No hay citas registradas para esos criterios. El horario está disponible." };
      }
      return { appointments: data };
    }

    case "upsert_customer": {
      const name  = typeof args.name  === "string" ? args.name.trim()  : null;
      const phone = typeof args.phone === "string" ? args.phone.trim() : null;
      const email = typeof args.email === "string" ? args.email.trim() : null;
      const notes = typeof args.notes === "string" ? args.notes.trim() : null;

      if (!name || !phone) {
        return { error: "Se requieren nombre y teléfono para registrar el cliente." };
      }

      // Buscar cliente existente por teléfono
      const { data: existing } = await supabase
        .from("customers")
        .select("id, name, phone, email")
        .eq("user_id", userId)
        .eq("phone", phone)
        .single();

      if (existing) {
        // Actualizar nombre/email si cambiaron
        await supabase
          .from("customers")
          .update({ name, ...(email ? { email } : {}), updated_at: new Date().toISOString() })
          .eq("id", existing.id);

        return { customer_id: existing.id, is_new: false };
      }

      // Crear nuevo cliente
      const { data: created, error } = await supabase
        .from("customers")
        .insert({ user_id: userId, name, phone, email, notes })
        .select("id")
        .single();

      if (error) return { error: "No se pudo registrar el cliente. Por favor inténtalo de nuevo." };

      return { customer_id: created.id, is_new: true };
    }

    case "create_appointment": {
      const visitorName     = typeof args.visitor_name     === "string" ? args.visitor_name     : null;
      const visitorPhone    = typeof args.visitor_phone    === "string" ? args.visitor_phone    : null;
      const appointmentDate = typeof args.appointment_date === "string" ? args.appointment_date : null;
      const appointmentTime = typeof args.appointment_time === "string" ? args.appointment_time : null;
      const service         = typeof args.service          === "string" ? args.service          : null;

      // Validar campos obligatorios
      if (!visitorName || !visitorPhone) {
        return { error: "Se requieren nombre completo y teléfono para crear la cita." };
      }
      if (!appointmentDate || !appointmentTime) {
        return { error: "Se requieren fecha y hora para crear la cita." };
      }
      if (!service) {
        return { error: "Se requiere el servicio o motivo de la cita." };
      }

      // Verificar duplicado en ese horario
      const { data: existing } = await supabase
        .from("appointments")
        .select("id")
        .eq("bot_id", botId)
        .eq("appointment_date", appointmentDate)
        .eq("appointment_time", appointmentTime)
        .maybeSingle();

      if (existing) {
        return { error: "Ya existe una cita en ese horario. Por favor elige otra hora." };
      }

      const { data, error } = await supabase
        .from("appointments")
        .insert({
          bot_id:           botId,
          customer_id:      typeof args.customer_id   === "string" ? args.customer_id   : null,
          visitor_name:     visitorName,
          visitor_phone:    visitorPhone,
          visitor_email:    typeof args.visitor_email === "string" ? args.visitor_email : null,
          service,
          appointment_date: appointmentDate,
          appointment_time: appointmentTime,
          notes:            typeof args.notes         === "string" ? args.notes         : null,
          status:           "pending",
        })
        .select("id")
        .single();

      if (error) return { error: "Error al crear la cita. Por favor inténtalo de nuevo." };

      return {
        success: true,
        appointment_id: data?.id,
        summary: {
          name:    visitorName,
          phone:   visitorPhone,
          service,
          date:    appointmentDate,
          time:    appointmentTime,
        },
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
 * Máx. 5 iteraciones para cumplir con el timeout de 15s de Meta WhatsApp.
 */
export async function runAgentLoop(
  messages: ChatCompletionMessageParam[],
  ctx: AgentContext,
  maxIterations = 5
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
