/**
 * Endpoint para notificaciones de nuevas conversaciones.
 * GET /api/notifications?since=<ISO_TIMESTAMP>
 * Devuelve el número de conversaciones nuevas desde esa fecha para los bots del usuario.
 */
import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { searchParams } = new URL(req.url);
  const since = searchParams.get("since"); // ISO timestamp

  // Obtener bots del usuario
  const { data: userBots } = await supabase
    .from("bots")
    .select("id, name")
    .eq("user_id", userId);

  if (!userBots?.length) {
    return NextResponse.json({ newConversations: 0, latest: [] });
  }

  const botIds = userBots.map((b) => b.id);

  // Buscar conversaciones nuevas desde `since`
  let query = supabase
    .from("conversations")
    .select("id, bot_id, created_at, bots(name)")
    .in("bot_id", botIds)
    .order("created_at", { ascending: false })
    .limit(5);

  if (since) {
    query = query.gt("created_at", since);
  }

  const { data: conversations, error } = await query;

  if (error) {
    return NextResponse.json({ newConversations: 0, latest: [] });
  }

  const latest = (conversations ?? []).map((c) => {
    const botsRaw = c.bots as unknown;
    const botName = Array.isArray(botsRaw)
      ? ((botsRaw[0] as { name?: string })?.name ?? "Bot")
      : ((botsRaw as { name?: string } | null)?.name ?? "Bot");
    return {
      id: c.id,
      bot_name: botName,
      created_at: c.created_at,
    };
  });

  return NextResponse.json({
    newConversations: latest.length,
    latest,
  });
}
