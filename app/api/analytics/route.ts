import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  // Obtener bots del usuario
  const { data: userBots } = await supabase
    .from("bots")
    .select("id")
    .eq("user_id", userId);

  if (!userBots?.length) {
    return NextResponse.json({
      dailyMessages: buildEmptyDays(),
      totalConversations: 0,
      conversationsToday: 0,
      messagesThisWeek: 0,
    });
  }

  const botIds = userBots.map((b) => b.id);

  // Rango: últimos 30 días
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
  thirtyDaysAgo.setHours(0, 0, 0, 0);

  // Mensajes de usuario (solo role='user' para no doblar conteo)
  const { data: messages } = await supabase
    .from("messages")
    .select("created_at")
    .in("bot_id", botIds)
    .eq("role", "user")
    .gte("created_at", thirtyDaysAgo.toISOString());

  // Agrupar por fecha
  const byDate: Record<string, number> = {};
  messages?.forEach((m) => {
    const day = (m.created_at as string).substring(0, 10);
    byDate[day] = (byDate[day] ?? 0) + 1;
  });

  // Rellenar los 30 días con 0s donde no hay datos
  const dailyMessages = buildEmptyDays().map((d) => ({
    ...d,
    count: byDate[d.date] ?? 0,
  }));

  // Total de conversaciones
  const { count: totalConversations } = await supabase
    .from("conversations")
    .select("*", { count: "exact", head: true })
    .in("bot_id", botIds);

  // Conversaciones de hoy
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const { count: conversationsToday } = await supabase
    .from("conversations")
    .select("*", { count: "exact", head: true })
    .in("bot_id", botIds)
    .gte("created_at", todayStart.toISOString());

  // Mensajes de esta semana
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  weekAgo.setHours(0, 0, 0, 0);
  const messagesThisWeek = dailyMessages
    .slice(-7)
    .reduce((acc, d) => acc + d.count, 0);

  return NextResponse.json({
    dailyMessages,
    totalConversations: totalConversations ?? 0,
    conversationsToday: conversationsToday ?? 0,
    messagesThisWeek,
  });
}

function buildEmptyDays() {
  const days = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push({
      date: d.toISOString().substring(0, 10),
      count: 0,
    });
  }
  return days;
}
