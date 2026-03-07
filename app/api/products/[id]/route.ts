import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;
  const body = await req.json();

  const allowed = ["name", "description", "category", "sku", "price", "currency",
                   "stock", "stock_min", "unit", "image_url", "status"];
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  // Auto-actualizar estado si cambia el stock
  if (updates.stock !== undefined) {
    const stockVal = Number(updates.stock);
    if (stockVal === 0) updates.status = "out_of_stock";
    else if (updates.status === "out_of_stock") updates.status = "active";
  }

  updates.updated_at = new Date().toISOString();

  const { data: product, error } = await supabase
    .from("products")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al actualizar producto" }, { status: 500 });

  return NextResponse.json({ product });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  await supabase.from("products").delete().eq("id", id).eq("user_id", userId);

  return NextResponse.json({ success: true });
}
