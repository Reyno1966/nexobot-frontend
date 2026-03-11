/**
 * GET /api/health
 * Monitoreo de bots del usuario: detecta problemas y devuelve alertas accionables.
 * Chequea: bots desactivados, bots sin actividad +7 días, bots nunca instalados.
 */
import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export type AlertLevel = "error" | "warning" | "info";

export interface HealthAlert {
  id: string;        // único por alerta (para dismiss)
  level: AlertLevel;
  title: string;
  description: string;
  action: string;    // texto del botón CTA
  href: string;      // destino del botón
}

export interface HealthResponse {
  alerts: HealthAlert[];
  overall: "healthy" | "warning" | "error";
  checkedAt: string;
}

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  // 1. Obtener todos los bots del usuario
  const { data: userBots } = await supabase
    .from("bots")
    .select("id, name, status, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (!userBots?.length) {
    return NextResponse.json({
      alerts: [],
      overall: "healthy",
      checkedAt: new Date().toISOString(),
    } satisfies HealthResponse);
  }

  const botIds = userBots.map((b) => b.id);
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const twoDaysAgo   = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

  // 2. Bots con actividad en los últimos 7 días
  const { data: recentConvs } = await supabase
    .from("conversations")
    .select("bot_id")
    .in("bot_id", botIds)
    .gte("created_at", sevenDaysAgo);

  const activeLastWeek = new Set(recentConvs?.map((c) => c.bot_id) ?? []);

  // 3. Bots que tienen ALGUNA conversación (aunque sea antigua)
  const { data: anyConvs } = await supabase
    .from("conversations")
    .select("bot_id")
    .in("bot_id", botIds)
    .limit(500);

  const hasAnyConversation = new Set(anyConvs?.map((c) => c.bot_id) ?? []);

  // 4. Construir alertas
  const alerts: HealthAlert[] = [];

  for (const bot of userBots) {
    const href = `/dashboard/bots/${bot.id}`;

    // ❌ Bot desactivado
    if (bot.status !== "active") {
      alerts.push({
        id: `bot_inactive_${bot.id}`,
        level: "error",
        title: `Bot "${bot.name}" está desactivado`,
        description: "No recibirá ninguna consulta hasta que lo actives desde la configuración.",
        action: "Activar bot →",
        href,
      });
      continue; // si está inactivo, no emitir más alertas para este bot
    }

    // ⚠️ Nunca ha recibido conversaciones y lleva +2 días creado
    if (!hasAnyConversation.has(bot.id) && bot.created_at < twoDaysAgo) {
      alerts.push({
        id: `bot_never_used_${bot.id}`,
        level: "warning",
        title: `"${bot.name}" aún no ha recibido ninguna consulta`,
        description: "Es posible que el widget no esté instalado en tu sitio web. Copia el código embed y agrégalo a tu web.",
        action: "Ver código de instalación →",
        href,
      });
      continue;
    }

    // ⚠️ Sin actividad en +7 días (pero tiene historial)
    if (hasAnyConversation.has(bot.id) && !activeLastWeek.has(bot.id)) {
      alerts.push({
        id: `bot_inactive_7d_${bot.id}`,
        level: "warning",
        title: `"${bot.name}" lleva más de 7 días sin actividad`,
        description: "Sin nuevas conversaciones esta semana. Verifica que el widget siga instalado y funcionando en tu web.",
        action: "Revisar configuración →",
        href,
      });
    }
  }

  // 5. Calcular estado general
  const overall: HealthResponse["overall"] = alerts.some((a) => a.level === "error")
    ? "error"
    : alerts.some((a) => a.level === "warning")
    ? "warning"
    : "healthy";

  return NextResponse.json({
    alerts,
    overall,
    checkedAt: new Date().toISOString(),
  } satisfies HealthResponse);
}
