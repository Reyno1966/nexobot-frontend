/**
 * app/api/whatsapp/connections/route.ts
 * GET  → Obtiene la conexión WhatsApp activa del bot dado
 * POST → Crea o actualiza la conexión WhatsApp para un bot
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
    .select("id, phone_number_id, display_phone, active, created_at")
    .eq("bot_id", botId)
    .eq("user_id", userId)
    .single();

  // Retornar null si no hay conexión (no es un error)
  return NextResponse.json({ connection: connection ?? null });
}

// ─── POST ─────────────────────────────────────────────────────────────────────

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const body = await req.json();
  const { botId, phoneNumberId, displayPhone } = body as {
    botId:         string;
    phoneNumberId: string;
    displayPhone?: string;
  };

  if (!botId || !phoneNumberId?.trim()) {
    return NextResponse.json({ error: "Faltan parámetros: botId y phoneNumberId son requeridos" }, { status: 400 });
  }

  // Verificar ownership del bot
  const { data: bot } = await supabase
    .from("bots")
    .select("id, status")
    .eq("id", botId)
    .eq("user_id", userId)
    .single();

  if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

  // Upsert: si ya existe una conexión para este phone_number_id la actualiza
  const { data: connection, error } = await supabase
    .from("whatsapp_connections")
    .upsert(
      {
        user_id:         userId,
        bot_id:          botId,
        phone_number_id: phoneNumberId.trim(),
        display_phone:   displayPhone?.trim() ?? null,
        active:          true,
        updated_at:      new Date().toISOString(),
      },
      { onConflict: "phone_number_id" }
    )
    .select("id, phone_number_id, display_phone, active, created_at")
    .single();

  if (error) {
    console.error("[WhatsApp connections] Error al guardar:", error);
    return NextResponse.json({ error: "Error al guardar la conexión" }, { status: 500 });
  }

  return NextResponse.json({ connection });
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
