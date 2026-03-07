import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  // Verificar que la conversación pertenece a un bot del usuario
  const { data: conv } = await supabase
    .from("conversations")
    .select("*, bots!inner(name, user_id)")
    .eq("id", id)
    .single();

  if (!conv) return NextResponse.json({ error: "No encontrado" }, { status: 404 });

  const bot = conv.bots as { name: string; user_id: string };
  if (bot.user_id !== userId) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  // Obtener mensajes de la conversación
  const { data: messages } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json({ conversation: conv, messages: messages ?? [] });
}
