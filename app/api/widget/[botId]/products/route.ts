/**
 * Endpoint público para que los bots consulten el catálogo de productos del usuario.
 * El bot busca productos por nombre y devuelve disponibilidad y precio.
 * No requiere autenticación (es llamado desde el widget).
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
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("q") || "";

    const supabase = getAdminClient();

    // Obtener user_id del bot
    const { data: bot } = await supabase
      .from("bots")
      .select("user_id, status")
      .eq("id", botId)
      .single();

    if (!bot || bot.status !== "active") {
      return NextResponse.json({ error: "Bot no disponible" }, { status: 404, headers: CORS });
    }

    // Buscar productos del usuario (solo activos)
    let query = supabase
      .from("products")
      .select("name, description, category, price, currency, stock, unit, status")
      .eq("user_id", bot.user_id)
      .neq("status", "inactive")
      .order("name")
      .limit(50);

    if (search) query = query.ilike("name", `%${search}%`);

    const { data: products } = await query;

    return NextResponse.json({ products: products ?? [] }, { headers: CORS });
  } catch (err) {
    console.error("Products widget error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
