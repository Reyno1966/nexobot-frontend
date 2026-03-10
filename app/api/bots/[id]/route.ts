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
  const {
    name, description, channel, status, system_prompt, widget_color, welcome_message,
    notify_email, notify_whatsapp, notify_telegram_token, notify_telegram_chat_id,
  } = await req.json();

  const { data: bot, error } = await supabase
    .from("bots")
    .update({
      name,
      description,
      channel,
      status,
      system_prompt: system_prompt ?? "",
      widget_color: widget_color ?? "#2CC5C5",
      welcome_message: welcome_message ?? "¡Hola! 👋 ¿En qué puedo ayudarte hoy?",
      notify_email: notify_email ?? null,
      notify_whatsapp: notify_whatsapp ?? null,
      notify_telegram_token: notify_telegram_token ?? null,
      notify_telegram_chat_id: notify_telegram_chat_id ?? null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al actualizar bot" }, { status: 500 });

  return NextResponse.json({ bot });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  const { error } = await supabase
    .from("bots")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: "Error al eliminar bot" }, { status: 500 });

  return NextResponse.json({ success: true });
}
