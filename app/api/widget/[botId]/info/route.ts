/**
 * Endpoint público para obtener info del bot (nombre) y logo de la empresa.
 * Usado por el widget para mostrar branding personalizado.
 */
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
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const supabase  = getAdminClient();

    const { data: bot } = await supabase
      .from("bots")
      .select("name, user_id, status")
      .eq("id", botId)
      .single();

    if (!bot || bot.status !== "active") {
      return NextResponse.json({ error: "Bot no disponible" }, { status: 404, headers: CORS });
    }

    // Obtener perfil de empresa del dueño del bot
    const { data: profile } = await supabase
      .from("profiles")
      .select("company_name, company_logo_url")
      .eq("id", bot.user_id)
      .single();

    return NextResponse.json({
      bot:     { name: bot.name },
      profile: profile ?? null,
    }, { headers: CORS });

  } catch (err) {
    console.error("Widget info error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
