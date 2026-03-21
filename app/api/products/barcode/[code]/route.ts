import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

/**
 * GET /api/products/barcode/[code]
 * Busca un producto por su código de barras.
 * Retorna 200 + { product } si existe, 404 si no.
 * El frontend usa 404 para abrir el formulario de creación con el código pre-relleno.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ code: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { code } = await params;

  if (!code?.trim()) {
    return NextResponse.json({ error: "Código requerido" }, { status: 400 });
  }

  const { data: product, error } = await supabase
    .from("products")
    .select("id, name, description, category, sku, barcode, price, currency, stock, stock_min, unit, image_url, status, cost_price, created_at, updated_at")
    .eq("user_id", userId)
    .eq("barcode", code.trim())
    .single();

  if (error || !product) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ product });
}
