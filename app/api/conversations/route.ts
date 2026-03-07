import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { searchParams } = new URL(req.url);
  const botId = searchParams.get("botId");

  // Obtener IDs de los bots del usuario
  const { data: userBots } = await supabase
    .from("bots")
    .select("id, name")
    .eq("user_id", userId);

  if (!userBots?.length) return NextResponse.json({ conversations: [] });

  const botIds = botId
    ? [botId]
    : userBots.map((b) => b.id);

  // Obtener conversaciones de esos bots
  const { data: conversations, error } = await supabase
    .from("conversations")
    .select("*, bots(name)")
    .in("bot_id", botIds)
    .order("last_message_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: "Error al obtener conversaciones" }, { status: 500 });

  return NextResponse.json({ conversations: conversations ?? [] });
}
