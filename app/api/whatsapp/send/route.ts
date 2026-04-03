/**
 * app/api/whatsapp/send/route.ts
 *
 * POST → Envía un mensaje WhatsApp desde una aplicación externa.
 *
 * Autenticación: header X-NexoBot-API-Key (comparación timing-safe).
 * NO usa cookies de sesión — diseñado para integraciones server-to-server.
 *
 * Body JSON:
 *   phoneNumber   string  — Número destino sin "+". Ej: "34612345678"
 *   message       string  — Texto a enviar (máx 4096 chars)
 *   phoneNumberId string? — ID del número Meta. Defecto: WHATSAPP_PHONE_NUMBER_ID
 */

import { NextResponse } from "next/server";
import { sendWhatsAppMessage } from "@/lib/whatsapp";

// ─── Comparación timing-safe para API keys ────────────────────────────────────

async function timingSafeEqual(a: string, b: string): Promise<boolean> {
  if (a.length !== b.length) return false;
  const encoder = new TextEncoder();
  const bufA = encoder.encode(a);
  const bufB = encoder.encode(b);
  let mismatch = 0;
  for (let i = 0; i < bufA.length; i++) {
    mismatch |= bufA[i] ^ bufB[i];
  }
  return mismatch === 0;
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  // ── 1. Validar API key ────────────────────────────────────────────────────
  const apiKey    = req.headers.get("x-nexobot-api-key") ?? "";
  const validKey  = process.env.NEXOBOT_API_KEY ?? "";

  if (!validKey) {
    console.error("[WhatsApp send] NEXOBOT_API_KEY no está configurada en el entorno");
    return NextResponse.json(
      { error: "Endpoint no configurado" },
      { status: 503 }
    );
  }

  const authorized = await timingSafeEqual(apiKey, validKey);
  if (!authorized) {
    return NextResponse.json(
      { error: "No autorizado" },
      { status: 401 }
    );
  }

  // ── 2. Parsear y validar body ─────────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  const { phoneNumber, message, phoneNumberId } = body as {
    phoneNumber:   unknown;
    message:       unknown;
    phoneNumberId: unknown;
  };

  if (typeof phoneNumber !== "string" || !/^\d+$/.test(phoneNumber.trim())) {
    return NextResponse.json(
      { error: "phoneNumber es requerido y debe contener solo dígitos (sin +)" },
      { status: 400 }
    );
  }

  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "message es requerido y no puede estar vacío" },
      { status: 400 }
    );
  }

  if (message.length > 4096) {
    return NextResponse.json(
      { error: "message supera el límite de 4096 caracteres de WhatsApp" },
      { status: 400 }
    );
  }

  // ── 3. Resolver phoneNumberId ─────────────────────────────────────────────
  const resolvedPhoneNumberId =
    (typeof phoneNumberId === "string" && phoneNumberId.trim())
      ? phoneNumberId.trim()
      : process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";

  if (!resolvedPhoneNumberId) {
    return NextResponse.json(
      { error: "phoneNumberId no proporcionado y WHATSAPP_PHONE_NUMBER_ID no está configurado" },
      { status: 503 }
    );
  }

  // ── 4. Verificar que haya token WhatsApp disponible ───────────────────────
  if (!process.env.WHATSAPP_TOKEN) {
    return NextResponse.json(
      { error: "WHATSAPP_TOKEN no está configurado en el entorno" },
      { status: 503 }
    );
  }

  // ── 5. Enviar mensaje ─────────────────────────────────────────────────────
  try {
    await sendWhatsAppMessage(
      phoneNumber.trim(),
      message.trim(),
      resolvedPhoneNumberId
      // token omitido → usa WHATSAPP_TOKEN del env (comportamiento por defecto)
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : "Error desconocido";
    console.error("[WhatsApp send] Error al enviar:", errMessage);
    return NextResponse.json(
      { error: "Error al enviar el mensaje via WhatsApp API", detail: errMessage },
      { status: 502 }
    );
  }
}
