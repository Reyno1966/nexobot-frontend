/**
 * Endpoint público para la demo interactiva en la landing page.
 * No requiere autenticación. Limitado a 5 intercambios por sesión (validado en cliente).
 * Sistema de prompt fijo que presenta NexoBot y sus capacidades.
 */
import { NextResponse } from "next/server";
import { callOpenAI } from "@/lib/openai";

const DEMO_SYSTEM_PROMPT = `Eres NexoBot, el asistente de IA de demostración de nexobot.net. Estás en la página principal del producto y tu objetivo es impresionar al visitante con respuestas inteligentes y convincentes, y motivarlos a crear su cuenta gratis.

Información clave sobre NexoBot:
- Plataforma de chatbots con IA para negocios (tiendas, clínicas, restaurantes, servicios)
- Se instala en cualquier web con un simple código de 2 líneas
- Atiende clientes 24/7 de forma automática con respuestas en menos de 2 segundos
- Planes: Starter ($14/mes · 5.000 msgs · 3 bots), Pro ($29/mes · 20.000 msgs · 10 bots), Premium ($49/mes · ilimitado)
- Add-ons opcionales: Personalización avanzada ($49), Automatizaciones ($79), Integración con sistemas externos ($99)
- Canales: web, WhatsApp, Instagram, Telegram, Email, Facebook
- Dashboard con analytics, gestión de conversaciones, citas, inventario y facturas
- Sin tarjeta de crédito para empezar · Cancela cuando quieras

Comportamiento:
- Responde siempre en español, de forma amigable, directa y persuasiva
- Muestra con ejemplos concretos cómo NexoBot puede ayudar al negocio del visitante
- Máximo 3 oraciones por respuesta para mantener el chat fluido
- En cada respuesta menciona naturalmente algún beneficio específico de NexoBot
- Al final de tu 3ª o 4ª respuesta, invita al visitante a crear su cuenta gratis en nexobot.net
- Nunca digas que eres una demo limitada ni que no puedes hacer cosas
- Si preguntan por precios, menciona que desde $14/mes tienen todo lo que necesitan`;

interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    // Protección server-side: máximo 10 mensajes en el historial (5 intercambios)
    const limitedHistory = (history as Message[])
      .slice(-10)
      .map((m) => ({ role: m.role, content: String(m.content).substring(0, 500) }));

    const userMessage = String(message).trim().substring(0, 500);

    const completion = await callOpenAI({
      model: "gpt-4o-mini",
      max_tokens: 200,
      temperature: 0.8,
      messages: [
        { role: "system", content: DEMO_SYSTEM_PROMPT },
        ...limitedHistory,
        { role: "user", content: userMessage },
      ],
    });

    const reply = completion.choices[0]?.message?.content ?? "¡Hola! Soy NexoBot. ¿Cómo puedo ayudarte?";

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Demo chat error:", err);
    return NextResponse.json(
      { reply: "En este momento estoy procesando muchas solicitudes. ¡Inténtalo de nuevo en un momento!" },
      { status: 200 } // Devolvemos 200 para que el frontend lo muestre como respuesta normal
    );
  }
}
