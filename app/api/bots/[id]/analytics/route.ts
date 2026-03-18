import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: botId } = await params;
    const auth = await getAuth();
    if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const { supabase, userId } = auth;

    // Verificar que el bot pertenece al usuario
    const { data: bot } = await supabase
      .from("bots")
      .select("id, messages_count, messages_this_month")
      .eq("id", botId)
      .eq("user_id", userId)
      .single();

    if (!bot) return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });

    const since7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const todayStart = new Date(); todayStart.setHours(0, 0, 0, 0);
    const since14d = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();

    // Paralelizar las 5 queries independientes
    const [
      { count: totalConversations },
      { count: convsThisWeek },
      { count: convsToday },
      { data: dailyMsgs },
      { data: lastConv },
    ] = await Promise.all([
      // Total conversaciones
      supabase
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("bot_id", botId),

      // Conversaciones de los últimos 7 días
      supabase
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("bot_id", botId)
        .gte("created_at", since7d),

      // Conversaciones hoy
      supabase
        .from("conversations")
        .select("id", { count: "exact", head: true })
        .eq("bot_id", botId)
        .gte("created_at", todayStart.toISOString()),

      // Mensajes por día (últimos 14 días)
      supabase
        .from("messages")
        .select("created_at")
        .eq("bot_id", botId)
        .gte("created_at", since14d)
        .eq("role", "user"),

      // Última conversación
      supabase
        .from("conversations")
        .select("created_at")
        .eq("bot_id", botId)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle(),
    ]);

    // Agrupar mensajes por día
    const dailyMap: Record<string, number> = {};
    (dailyMsgs ?? []).forEach((m) => {
      const day = (m.created_at as string).split("T")[0];
      dailyMap[day] = (dailyMap[day] ?? 0) + 1;
    });

    // Generar array de 14 días
    const dailyData = Array.from({ length: 14 }, (_, i) => {
      const d = new Date(Date.now() - (13 - i) * 24 * 60 * 60 * 1000);
      const key = d.toISOString().split("T")[0];
      return { date: key, count: dailyMap[key] ?? 0 };
    });

    return NextResponse.json({
      totalMessages: bot.messages_count ?? 0,
      messagesThisMonth: bot.messages_this_month ?? 0,
      totalConversations: totalConversations ?? 0,
      convsThisWeek: convsThisWeek ?? 0,
      convsToday: convsToday ?? 0,
      lastActivity: lastConv?.created_at ?? null,
      dailyData,
    });
  } catch (err) {
    console.error("Bot analytics error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
