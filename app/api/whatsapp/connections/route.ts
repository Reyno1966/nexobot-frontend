/**
 * app/api/whatsapp/connections/route.ts
 * GET    → Obtiene la conexión WhatsApp activa del bot dado
 *          Devuelve has_token: boolean en lugar del token real
 * POST   → Crea o actualiza la conexión WhatsApp para un bot
 *          Acepta waToken para guardarlo en wa_token
 * DELETE → Desactiva la conexión (no elimina el historial)
 */

import { NextResponse } from "next/server";
import { getAuth }      from "@/lib/auth";

// ─── GET ──────────────────────────────────────────────────────────────────────

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { searchParams } = new URL(req.url);
  const botId = searchParams.get("botId");
  if (!botId) return NextResponse.json({ error: "Falta botId" }, { status: 400 });

  // Verificar que el bot pertenece al usuario
  const { data: bot } = await supabase
    .from("bots")
    .select("id")
    .eq("id", botId)
    .eq("user_id", userId)
    .single();

  if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

  const { data: connection } = await supabase
    .from("whatsapp_connections")
    .select("id, phone_number_id, display_phone, active, created_at, wa_token")
    .eq("bot_id", botId)
    .eq("user_id", userId)
    .single();

  if (!connection) return NextResponse.json({ connection: null });

  // Nunca devolver el token real — solo indicar si está configurado
  const { wa_token, ...rest } = connection;
  return NextResponse.json({
    connection: {
      ...rest,
      has_token: Boolean(wa_token),
    },
  });
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const body = await req.json();
  const { botId, phoneNumberId, displayPhone, waToken } = body as {
    botId:          string;
    phoneNumberId:  string;
    displayPhone?:  string;
    waToken?:       string;
  };

  if (!botId || !phoneNumberId?.trim()) {
    return NextResponse.json(
      { error: "Faltan parámetros: botId y phoneNumberId son requeridos" },
      { status: 400 }
    );
  }

  // Verificar ownership del bot
  const { data: bot } = await supabase
    .from("bots")
    .select("id, status")
    .eq("id", botId)
    .eq("user_id", userId)
    .single();

  if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

  // Construir el payload — solo incluir wa_token si se proporcionó uno nuevo
  // Un string vacío significa "borrar el token" (volver a usar el env global)
  const upsertPayload: Record<string, unknown> = {
    user_id:         userId,
    bot_id:          botId,
    phone_number_id: phoneNumberId.trim(),
    display_phone:   displayPhone?.trim() || null,
    active:          true,
    updated_at:      new Date().toISOString(),
  };

  if (waToken !== undefined) {
    upsertPayload.wa_token = waToken.trim() || null;
  }

  const { data: connection, error } = await supabase
    .from("whatsapp_connections")
    .upsert(upsertPayload, { onConflict: "phone_number_id" })
    .select("id, phone_number_id, display_phone, active, created_at, wa_token")
    .single();

  if (error) {
    console.error("[WhatsApp connections] Error al guardar:", error);
    return NextResponse.json({ error: "Error al guardar la conexión" }, { status: 500 });
  }

  const { wa_token: savedToken, ...rest } = connection;
  return NextResponse.json({
    connection: {
      ...rest,
      has_token: Boolean(savedToken),
    },
  });
}

// ─── DELETE ───────────────────────────────────────────────────────────────────

export async function DELETE(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { searchParams } = new URL(req.url);
  const botId = searchParams.get("botId");
  if (!botId) return NextResponse.json({ error: "Falta botId" }, { status: 400 });

  // Desactivar (no eliminar) para preservar historial de conversaciones
  const { error } = await supabase
    .from("whatsapp_connections")
    .update({ active: false, updated_at: new Date().toISOString() })
    .eq("bot_id", botId)
    .eq("user_id", userId);

  if (error) {
    return NextResponse.json({ error: "Error al desactivar la conexión" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
