import { SupabaseClient } from "@supabase/supabase-js";
import { openai } from "./openai";

interface Message {
  role: string;
  content: string;
}

interface AppointmentData {
  appointment_confirmed: boolean;
  visitor_name?: string | null;
  visitor_email?: string | null;
  visitor_phone?: string | null;
  service?: string | null;
  appointment_date?: string | null;  // YYYY-MM-DD
  appointment_time?: string | null;  // HH:MM
  notes?: string | null;
}

// Palabras clave que sugieren que se confirmó una cita
const APPOINTMENT_KEYWORDS = [
  "confirm", "agend", "reserv", "programad", "anotad", "cita", "appointment",
  "quedamos", "te espero", "nos vemos", "perfecto", "listo", "anotado",
];

function mightHaveAppointment(reply: string): boolean {
  const lower = reply.toLowerCase();
  return APPOINTMENT_KEYWORDS.some((kw) => lower.includes(kw));
}

export async function tryExtractAppointment(
  history: Message[],
  userMessage: string,
  botReply: string,
  botId: string,
  supabase: SupabaseClient
): Promise<void> {
  // Heurística rápida: solo analizar si el reply parece confirmar una cita
  if (!mightHaveAppointment(botReply)) return;

  // Necesitamos al menos 2 turnos de conversación
  if (history.length < 2) return;

  try {
    const conversation = [
      ...history,
      { role: "user", content: userMessage },
      { role: "assistant", content: botReply },
    ];

    const conversationText = conversation
      .map((m) => `${m.role === "user" ? "Visitante" : "Bot"}: ${m.content}`)
      .join("\n");

    const result = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      temperature: 0,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `Eres un extractor de datos de citas. La fecha de hoy es ${new Date().toISOString().split("T")[0]}.

Analiza la conversación y determina si se CONFIRMÓ una cita con fecha Y hora específicas (no solo si el usuario mostró interés).

Si se confirmó una cita completa responde:
{"appointment_confirmed": true, "visitor_name": "nombre completo o null", "visitor_email": "email o null", "visitor_phone": "teléfono o null", "service": "tipo de servicio/especialidad o null", "appointment_date": "YYYY-MM-DD (convierte fechas relativas usando la fecha de hoy)", "appointment_time": "HH:MM en formato 24h o null", "notes": "notas adicionales o null"}

Si NO hay cita confirmada con fecha y hora concretas, responde:
{"appointment_confirmed": false}

Responde SOLO con JSON válido.`,
        },
        {
          role: "user",
          content: conversationText,
        },
      ],
      stream: false,
    });

    const text = result.choices[0]?.message?.content ?? "";
    let data: AppointmentData;

    try {
      data = JSON.parse(text);
    } catch {
      return;
    }

    if (!data.appointment_confirmed) return;
    if (!data.appointment_date || !data.appointment_time) return;

    // Deduplicar: no crear si ya existe una cita igual (mismo bot, fecha y hora)
    const { data: existing } = await supabase
      .from("appointments")
      .select("id")
      .eq("bot_id", botId)
      .eq("appointment_date", data.appointment_date)
      .eq("appointment_time", data.appointment_time)
      .single();

    if (existing) return;

    await supabase.from("appointments").insert({
      bot_id: botId,
      visitor_name: data.visitor_name || "Visitante",
      visitor_email: data.visitor_email || null,
      visitor_phone: data.visitor_phone || null,
      service: data.service || null,
      appointment_date: data.appointment_date,
      appointment_time: data.appointment_time,
      notes: data.notes || null,
      status: "pending",
    });
  } catch {
    // Silencioso — no interrumpir el flujo principal
  }
}
