import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;
  const body = await req.json();

  // Verificar que la cita pertenece al usuario
  const { data: appt } = await supabase
    .from("appointments")
    .select("*, bots!inner(user_id)")
    .eq("id", id)
    .single();

  if (!appt) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
  const bot = appt.bots as { user_id: string };
  if (bot.user_id !== userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const allowed = ["visitor_name", "visitor_email", "visitor_phone", "service", "appointment_date", "appointment_time", "notes", "status"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  const { data: updated, error } = await supabase
    .from("appointments")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });

  return NextResponse.json({ appointment: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  const { data: appt } = await supabase
    .from("appointments")
    .select("*, bots!inner(user_id)")
    .eq("id", id)
    .single();

  if (!appt) return NextResponse.json({ error: "Cita no encontrada" }, { status: 404 });
  const bot = appt.bots as { user_id: string };
  if (bot.user_id !== userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  await supabase.from("appointments").delete().eq("id", id);

  return NextResponse.json({ success: true });
}
