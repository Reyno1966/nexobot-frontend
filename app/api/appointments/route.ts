import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { searchParams } = new URL(req.url);
  const botId = searchParams.get("botId");
  const status = searchParams.get("status");

  // Obtener bots del usuario
  const { data: userBots } = await supabase
    .from("bots")
    .select("id, name")
    .eq("user_id", userId);

  if (!userBots?.length) return NextResponse.json({ appointments: [] });

  const botIds = botId ? [botId] : userBots.map((b) => b.id);

  let query = supabase
    .from("appointments")
    .select("*, bots(name)")
    .in("bot_id", botIds)
    .order("appointment_date", { ascending: true })
    .order("appointment_time", { ascending: true });

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: appointments, error } = await query.limit(200);

  if (error) return NextResponse.json({ error: "Error al obtener citas" }, { status: 500 });

  return NextResponse.json({ appointments: appointments ?? [] });
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const body = await req.json();
  const { bot_id, visitor_name, visitor_email, visitor_phone, service, appointment_date, appointment_time, notes } = body;

  if (!bot_id || !visitor_name || !appointment_date || !appointment_time) {
    return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
  }

  // Verificar que el bot pertenece al usuario
  const { data: bot } = await supabase.from("bots").select("id").eq("id", bot_id).eq("user_id", userId).single();
  if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

  const { data: appointment, error } = await supabase
    .from("appointments")
    .insert({
      bot_id,
      visitor_name,
      visitor_email: visitor_email || null,
      visitor_phone: visitor_phone || null,
      service: service || null,
      appointment_date,
      appointment_time,
      notes: notes || null,
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al crear cita" }, { status: 500 });

  return NextResponse.json({ appointment }, { status: 201 });
}
