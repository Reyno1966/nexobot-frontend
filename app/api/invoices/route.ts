import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  let query = supabase
    .from("invoices")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: invoices, error } = await query;
  if (error) return NextResponse.json({ error: "Error al obtener facturas" }, { status: 500 });

  return NextResponse.json({ invoices: invoices ?? [] });
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const body = await req.json();
  const {
    client_name, client_email, client_phone, client_address,
    items, tax_rate, currency, due_date, notes,
  } = body;

  if (!client_name || !items?.length) {
    return NextResponse.json({ error: "Faltan campos: nombre del cliente e ítems" }, { status: 400 });
  }

  // Calcular totales
  const subtotal = items.reduce(
    (sum: number, item: { quantity: number; unit_price: number }) =>
      sum + item.quantity * item.unit_price,
    0
  );
  const taxRate = Number(tax_rate ?? 0);
  const tax_amount = subtotal * (taxRate / 100);
  const total = subtotal + tax_amount;

  // Número de factura auto-generado
  const year = new Date().getFullYear();
  const { count } = await supabase
    .from("invoices")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId);
  const invoiceNumber = `INV-${year}-${String((count ?? 0) + 1).padStart(4, "0")}`;

  const { data: invoice, error } = await supabase
    .from("invoices")
    .insert({
      user_id: userId,
      invoice_number: invoiceNumber,
      client_name,
      client_email: client_email || null,
      client_phone: client_phone || null,
      client_address: client_address || null,
      items,
      subtotal,
      tax_rate: taxRate,
      tax_amount,
      total,
      currency: currency || "USD",
      due_date: due_date || null,
      notes: notes || null,
      status: "draft",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al crear factura" }, { status: 500 });

  return NextResponse.json({ invoice }, { status: 201 });
}
