/**
 * app/api/whatsapp/webhook/route.ts
 *
 * GET  → Verificación del webhook con Meta (challenge handshake)
 * POST → Recibe mensajes entrantes de WhatsApp y responde con el bot
 *
 * IMPORTANTE: Este endpoint es público — Meta lo llama sin cookies de sesión.
 * NO usar getAuth(). La autenticación se hace via X-Hub-Signature-256.
 */

import { NextResponse } from "next/server";
import { createClient }  from "@supabase/supabase-js";
import { sendWhatsAppMessage, markWhatsAppMessageRead, verifyWebhookSignature } from "@/lib/whatsapp";
import { processBotMessage } from "@/lib/processBotMessage";

// ─── Tipos del payload de Meta ────────────────────────────────────────────────

interface WATextMessage {
  from:      string;   // número del remitente (sin "+")
  id:        string;   // ID del mensaje en Meta
  timestamp: string;
  type:      "text";
  text: { body: string };
}

interface WAEntry {
  id: string;
  changes: Array<{
    value: {
      messaging_product: string;
      metadata: { display_phone_number: string; phone_number_id: string };
      contacts?: Array<{ profile: { name: string }; wa_id: string }>;
      messages?: WATextMessage[];
      statuses?: Array<{ id: string; status: string }>;
    };
    field: string;
  }>;
}

interface WAWebhookPayload {
  object: string;
  entry:  WAEntry[];
}

// ─── GET: verificación del webhook ───────────────────────────────────────────

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const mode      = searchParams.get("hub.mode");
  const token     = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("[WhatsApp Webhook] Verificación exitosa");
    return new Response(challenge ?? "", { status: 200 });
  }

  console.warn("[WhatsApp Webhook] Verificación fallida — token incorrecto o modo inválido");
  return new Response("Forbidden", { status: 403 });
}

// ─── POST: mensajes entrantes ─────────────────────────────────────────────────

export async function POST(req: Request) {
  // ── 1. Leer body como texto (necesario para verificar la firma HMAC) ──────
  const rawBody = await req.text();

  // ── 2. Verificar firma X-Hub-Signature-256 ────────────────────────────────
  const appSecret = process.env.WHATSAPP_APP_SECRET;
  if (appSecret) {
    const signature = req.headers.get("x-hub-signature-256") ?? "";
    const valid     = await verifyWebhookSignature(rawBody, signature, appSecret);
    if (!valid) {
      console.warn("[WhatsApp Webhook] Firma inválida — posible request no autorizado");
      return new Response("Unauthorized", { status: 401 });
    }
  }

  // ── 3. Parsear payload ────────────────────────────────────────────────────
  let payload: WAWebhookPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return new Response("Bad Request", { status: 400 });
  }

  // Meta puede enviar "whatsapp_business_account" o "whatsapp" según el contexto
  if (payload.object !== "whatsapp_business_account" && payload.object !== "whatsapp") {
    return NextResponse.json({ ok: true });
  }

  // ── 4. Procesar cada entry y cada mensaje ─────────────────────────────────
  // Await directo: OpenAI tarda ~2-4s, bien dentro del límite de 15s de Meta.
  // after() no funciona de forma confiable en Vercel Serverless (sin Fluid Compute).
  await processEntries(payload.entry).catch((err) => {
    console.error("[WhatsApp Webhook] Error procesando entries:", err);
  });

  return NextResponse.json({ ok: true });
}

// ─── Reenvío a BolsaAI (fire & forget) ───────────────────────────────────────

async function forwardToBolsaAI(
  entry: WAEntry,
  change: WAEntry["changes"][number]
) {
  const webhookUrl    = process.env.BOLSAAI_WEBHOOK_URL;
  const webhookSecret = process.env.BOLSAAI_WEBHOOK_SECRET;

  if (!webhookUrl || !webhookSecret) {
    console.warn("[BolsaAI forward] BOLSAAI_WEBHOOK_URL o BOLSAAI_WEBHOOK_SECRET no configurados");
    return;
  }

  const payload = {
    object: "whatsapp_business_account",
    entry: [{ ...entry, changes: [change] }],
  };

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-nexobot-webhook-secret": webhookSecret,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`BolsaAI webhook respondió ${res.status}: ${text}`);
  }
}

// ─── Procesamiento interno (async, fuera del ciclo request/response) ──────────

async function processEntries(entries: WAEntry[]) {
  // Cliente Supabase con service role (sin cookies de usuario)
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  for (const entry of entries) {
    for (const change of entry.changes) {
      if (change.field !== "messages") continue;

      const { metadata, messages, statuses } = change.value;

      // Ignorar eventos de status (delivered, read, sent) — no son mensajes
      if (statuses && statuses.length > 0 && (!messages || messages.length === 0)) continue;
      if (!messages || messages.length === 0) continue;

      const phoneNumberId = metadata.phone_number_id;

      // ── 4a. Buscar conexión activa para este phone_number_id ──────────────
      const { data: connection } = await supabase
        .from("whatsapp_connections")
        .select("user_id, bot_id, wa_token")
        .eq("phone_number_id", phoneNumberId)
        .eq("active", true)
        .single();

      if (!connection) {
        console.warn(`[WhatsApp] No hay conexión activa para phone_number_id: ${phoneNumberId}`);
        continue;
      }

      const { user_id: userId, bot_id: botId, wa_token: waToken } = connection;

      for (const msg of messages) {
        // Solo procesar mensajes de texto por ahora
        if (msg.type !== "text") continue;

        const senderPhone = msg.from;
        const messageText = msg.text.body;
        const messageId   = msg.id;

        // Marcar como leído (fire & forget)
        markWhatsAppMessageRead(messageId, phoneNumberId, waToken).catch(() => {});

        // ── 4b. Reenviar a BolsaAI si el mensaje es un comando de stops ─────
        const upperText = messageText.trim().toUpperCase();
        if (["CONFIRMAR", "CANCELAR", "VERIFICAR"].includes(upperText)) {
          forwardToBolsaAI(entry, change).catch((err) => {
            console.error("[WhatsApp] Error reenviando a BolsaAI:", err);
          });
        }

        // ── 4d. Cargar o crear conversación para este número de WhatsApp ────
        const sessionId = `whatsapp-${senderPhone}`;
        let conversationId: string | null = null;

        const { data: existingConv } = await supabase
          .from("conversations")
          .select("id, message_count")
          .eq("bot_id", botId)
          .eq("session_id", sessionId)
          .single();

        if (existingConv) {
          conversationId = existingConv.id;
        } else {
          const { data: newConv } = await supabase
            .from("conversations")
            .insert({
              bot_id:       botId,
              session_id:   sessionId,
              visitor_name: `WhatsApp +${senderPhone}`,
              message_count: 0,
            })
            .select("id")
            .single();
          conversationId = newConv?.id ?? null;
        }

        // ── 4e. Cargar historial de la conversación (últimos mensajes) ────
        interface DBMessage { role: string; content: string }
        let history: Array<{ role: "user" | "assistant"; content: string }> = [];
        if (conversationId) {
          const { data: prevMessages } = await supabase
            .from("messages")
            .select("role, content")
            .eq("conversation_id", conversationId)
            .order("created_at", { ascending: false })
            .limit(12);

          if (prevMessages) {
            history = (prevMessages as DBMessage[])
              .reverse()
              .filter((m): m is { role: "user" | "assistant"; content: string } =>
                m.role === "user" || m.role === "assistant"
              );
          }
        }

        // ── 4f. Procesar con el motor del bot ──────────────────────────────
        const result = await processBotMessage({
          userId,
          botId,
          message: messageText,
          history,
          supabase,
          source: "whatsapp",
        });

        if (result.error) {
          console.error(`[WhatsApp] Error en processBotMessage:`, result.error);
          continue;
        }

        // ── 4g. Enviar respuesta por WhatsApp ──────────────────────────────
        if (!result.limitReached) {
          await sendWhatsAppMessage(senderPhone, result.reply, phoneNumberId, waToken);
        } else {
          // Si el plan está limitado, notificar al usuario en WhatsApp
          await sendWhatsAppMessage(
            senderPhone,
            "Lo siento, este bot ha alcanzado su límite mensual de mensajes. Inténtalo más tarde.",
            phoneNumberId,
            waToken
          ).catch(() => {});
        }

        // ── 4h. Guardar intercambio en la BD ──────────────────────────────
        if (conversationId) {
          const msgCount = (existingConv?.message_count ?? 0) + 2;
          await supabase
            .from("conversations")
            .update({ last_message_at: new Date().toISOString(), message_count: msgCount })
            .eq("id", conversationId);

          await supabase.from("messages").insert([
            {
              conversation_id: conversationId,
              bot_id:          botId,
              role:            "user",
              content:         messageText,
              tokens_used:     0,
            },
            {
              conversation_id: conversationId,
              bot_id:          botId,
              role:            "assistant",
              content:         result.reply,
              tokens_used:     result.tokensUsed,
            },
          ]);
        }
      }
    }
  }
}
