/**
 * app/api/whatsapp/verify/route.ts
 * POST → Verifica un token de Meta + phoneNumberId contra la Graph API
 *        Devuelve { ok, displayName, phoneNumber } o { ok: false, error }
 *
 * Seguridad: requiere auth + ownership del bot, nunca loggea el token completo.
 */

import { NextResponse } from "next/server";
import { getAuth }      from "@/lib/auth";

interface MetaPhoneResponse {
  display_phone_number: string;
  verified_name:        string;
  id:                   string;
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const body = await req.json();
  const { botId, phoneNumberId, waToken } = body as {
    botId:         string;
    phoneNumberId: string;
    waToken:       string;
  };

  if (!botId || !phoneNumberId?.trim() || !waToken?.trim()) {
    return NextResponse.json(
      { error: "Faltan parámetros: botId, phoneNumberId y waToken son requeridos" },
      { status: 400 }
    );
  }

  // Verificar ownership del bot
  const { data: bot } = await supabase
    .from("bots")
    .select("id")
    .eq("id", botId)
    .eq("user_id", userId)
    .single();

  if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

  // Llamar a Meta Graph API para verificar las credenciales
  try {
    const metaUrl = `https://graph.facebook.com/v19.0/${phoneNumberId.trim()}`;
    const res = await fetch(metaUrl, {
      headers: {
        Authorization: `Bearer ${waToken.trim()}`,
        "Content-Type": "application/json",
      },
      // Timeout de 8 segundos
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({})) as {
        error?: { message?: string; code?: number };
      };
      const metaMsg = errData?.error?.message ?? `Error ${res.status} de Meta`;
      console.warn(`[WhatsApp verify] Meta error ${res.status} para phone ${phoneNumberId}`);
      return NextResponse.json({ ok: false, error: metaMsg }, { status: 400 });
    }

    const data = await res.json() as MetaPhoneResponse;

    return NextResponse.json({
      ok:          true,
      displayName: data.verified_name   ?? null,
      phoneNumber: data.display_phone_number ?? null,
    });
  } catch (err) {
    const isTimeout = err instanceof Error && err.name === "TimeoutError";
    console.error("[WhatsApp verify] Error al llamar a Meta:", isTimeout ? "timeout" : err);
    return NextResponse.json(
      { ok: false, error: isTimeout ? "Tiempo de espera agotado al conectar con Meta" : "Error al contactar con Meta" },
      { status: 502 }
    );
  }
}
