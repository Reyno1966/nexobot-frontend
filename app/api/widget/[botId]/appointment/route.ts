import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const body = await req.json();
    const { visitor_name, visitor_email, visitor_phone, service, appointment_date, appointment_time, notes } = body;

    if (!visitor_name || !appointment_date || !appointment_time) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400, headers: CORS });
    }

    const supabase = getAdminClient();

    // Verificar que el bot existe y está activo
    const { data: bot } = await supabase.from("bots").select("id, status").eq("id", botId).single();
    if (!bot || bot.status !== "active") {
      return NextResponse.json({ error: "Bot no disponible" }, { status: 404, headers: CORS });
    }

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        bot_id: botId,
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

    if (error) {
      return NextResponse.json({ error: "Error al guardar cita" }, { status: 500, headers: CORS });
    }

    return NextResponse.json({ success: true, appointment }, { headers: CORS });
  } catch (err) {
    console.error("Appointment widget error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
