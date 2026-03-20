import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * GET /api/widget/[botId]/availability?year=2026&month=3
 * Endpoint público — devuelve los slots ocupados por día para un mes dado.
 * No requiere auth; solo valida que el bot existe y está activo.
 *
 * Response:
 * {
 *   occupied: {
 *     "2026-03-20": ["09:00", "14:00"],
 *     "2026-03-21": ["10:00"]
 *   }
 * }
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  const { botId } = await params;
  const { searchParams } = new URL(req.url);

  const now   = new Date();
  const year  = parseInt(searchParams.get("year")  ?? String(now.getFullYear()), 10);
  const month = parseInt(searchParams.get("month") ?? String(now.getMonth() + 1), 10);

  if (!botId || isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // Verificar que el bot existe y está activo
  const { data: bot } = await supabase
    .from("bots")
    .select("id")
    .eq("id", botId)
    .eq("status", "active")
    .single();

  if (!bot) {
    return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });
  }

  // Rango de fechas del mes solicitado
  const mm      = String(month).padStart(2, "0");
  const lastDay = new Date(year, month, 0).getDate();
  const from    = `${year}-${mm}-01`;
  const to      = `${year}-${mm}-${String(lastDay).padStart(2, "0")}`;

  const { data: appointments } = await supabase
    .from("appointments")
    .select("appointment_date, appointment_time")
    .eq("bot_id", botId)
    .neq("status", "cancelled")
    .gte("appointment_date", from)
    .lte("appointment_date", to);

  // Construir mapa: { "2026-03-20": ["09:00", "14:00"] }
  const occupied: Record<string, string[]> = {};

  for (const appt of appointments ?? []) {
    const d = appt.appointment_date as string | null;
    const t = appt.appointment_time as string | null;
    if (!d || !t) continue;

    // appointment_time puede venir como "09:00:00" (tipo time de Postgres) → normalizar a "09:00"
    const time = t.substring(0, 5);
    if (!occupied[d]) occupied[d] = [];
    occupied[d].push(time);
  }

  return NextResponse.json({ occupied });
}
