import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const status   = searchParams.get("status");
  const search   = searchParams.get("search");

  let query = supabase
    .from("products")
    .select("id, name, description, price, cost_price, currency, stock, unit, category, sku, status, image_url, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(500);

  if (category && category !== "all") query = query.eq("category", category);
  if (status   && status   !== "all") query = query.eq("status", status);
  if (search)                         query = query.ilike("name", `%${search}%`);

  const { data: products, error } = await query;
  if (error) return NextResponse.json({ error: "Error al obtener productos" }, { status: 500 });

  return NextResponse.json({ products: products ?? [] });
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const body = await req.json();
  const { name, description, category, sku, price, currency, stock, stock_min, unit, image_url } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "El nombre del producto es obligatorio" }, { status: 400 });
  }

  // Auto-estado según stock
  const stockVal  = Number(stock ?? 0);
  const stockMin  = Number(stock_min ?? 0);
  const autoStatus = stockVal === 0 ? "out_of_stock" : "active";

  const { data: product, error } = await supabase
    .from("products")
    .insert({
      user_id:     userId,
      name:        name.trim(),
      description: description || null,
      category:    category || "General",
      sku:         sku || null,
      price:       Number(price ?? 0),
      currency:    currency || "USD",
      stock:       stockVal,
      stock_min:   stockMin,
      unit:        unit || "unidades",
      image_url:   image_url || null,
      status:      autoStatus,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al crear producto" }, { status: 500 });

  return NextResponse.json({ product }, { status: 201 });
}
