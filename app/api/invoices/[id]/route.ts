import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  const { data: invoice } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .single();

  if (!invoice) return NextResponse.json({ error: "Factura no encontrada" }, { status: 404 });

  return NextResponse.json({ invoice });
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;
  const body = await req.json();

  const allowed = [
    "client_name", "client_email", "client_phone", "client_address",
    "items", "tax_rate", "currency", "due_date", "notes", "status",
  ];

  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key];
  }

  // Recalcular totales si cambian ítems o impuesto
  if (updates.items || updates.tax_rate !== undefined) {
    const { data: current } = await supabase.from("invoices").select("items, tax_rate").eq("id", id).single();
    const items = (updates.items ?? current?.items) as { quantity: number; unit_price: number }[];
    const taxRate = Number(updates.tax_rate ?? current?.tax_rate ?? 0);
    const subtotal = items.reduce((s, i) => s + i.quantity * i.unit_price, 0);
    const tax_amount = subtotal * (taxRate / 100);
    updates.subtotal = subtotal;
    updates.tax_amount = tax_amount;
    updates.total = subtotal + tax_amount;
    updates.tax_rate = taxRate;
  }

  const { data: invoice, error } = await supabase
    .from("invoices")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al actualizar" }, { status: 500 });

  return NextResponse.json({ invoice });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  await supabase.from("invoices").delete().eq("id", id).eq("user_id", userId);

  return NextResponse.json({ success: true });
}
