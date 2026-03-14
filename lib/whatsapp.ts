/**
 * lib/whatsapp.ts
 * Helper para enviar mensajes via WhatsApp Cloud API (Meta Graph API v19).
 * No requiere autenticación de usuario — usa tokens de la env o por conexión.
 */

const WA_API_VERSION = "v19.0";
const WA_API_BASE    = `https://graph.facebook.com/${WA_API_VERSION}`;

/**
 * Envía un mensaje de texto a un número de WhatsApp.
 *
 * @param to            - Número destino en formato internacional sin "+" (ej: "5491112345678")
 * @param text          - Texto a enviar (max 4096 chars según Meta)
 * @param phoneNumberId - ID del número de teléfono de Meta (ej: "875188135685843")
 * @param token         - Token de acceso; si es null/undefined usa WHATSAPP_TOKEN de env
 */
export async function sendWhatsAppMessage(
  to: string,
  text: string,
  phoneNumberId: string,
  token?: string | null
): Promise<void> {
  const accessToken = token ?? process.env.WHATSAPP_TOKEN;

  if (!accessToken) {
    console.error("[WhatsApp] No hay token configurado (WHATSAPP_TOKEN en env o wa_token en DB)");
    return;
  }

  const url = `${WA_API_BASE}/${phoneNumberId}/messages`;

  const body = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to,
    type: "text",
    text: {
      preview_url: false,
      body: text.substring(0, 4096),
    },
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    console.error(`[WhatsApp] Error al enviar mensaje (${res.status}):`, errText);
    throw new Error(`WhatsApp API error ${res.status}`);
  }
}

/**
 * Marca un mensaje de WhatsApp como leído.
 * Mejora la UX: el usuario ve los dos ticks azules.
 * Fire & forget — no lanzar si falla.
 */
export async function markWhatsAppMessageRead(
  messageId: string,
  phoneNumberId: string,
  token?: string | null
): Promise<void> {
  const accessToken = token ?? process.env.WHATSAPP_TOKEN;
  if (!accessToken) return;

  const url = `${WA_API_BASE}/${phoneNumberId}/messages`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      status: "read",
      message_id: messageId,
    }),
  }).catch(() => {});
}

/**
 * Verifica la firma HMAC-SHA256 del webhook de Meta.
 * Meta envía el header X-Hub-Signature-256: sha256=<hex>
 * Comparación segura con timingSafeEqual para evitar timing attacks.
 */
export async function verifyWebhookSignature(
  rawBody: string,
  signature: string,
  appSecret: string
): Promise<boolean> {
  try {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(appSecret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const sigBuffer = await crypto.subtle.sign("HMAC", key, encoder.encode(rawBody));
    const computed  = "sha256=" + Array.from(new Uint8Array(sigBuffer))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Comparación de longitud constante (timing-safe)
    if (computed.length !== signature.length) return false;
    let mismatch = 0;
    for (let i = 0; i < computed.length; i++) {
      mismatch |= computed.charCodeAt(i) ^ signature.charCodeAt(i);
    }
    return mismatch === 0;
  } catch {
    return false;
  }
}
