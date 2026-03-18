import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

const VALID_PAYMENT_METHODS = ["efectivo", "tarjeta", "transferencia", "otro"] as const;
type PaymentMethod = (typeof VALID_PAYMENT_METHODS)[number];

// ── GET /api/business/sales?year=YYYY&month=MM ────────────────────────────────
// Devuelve las ventas del usuario para el mes/año indicado.
export async function GET(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { searchParams } = new URL(req.url);
  const now = new Date();
  const year  = parseInt(searchParams.get("year")  ?? String(now.getFullYear()), 10);
  const month = parseInt(searchParams.get("month") ?? String(now.getMonth() + 1), 10);

  if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
    return NextResponse.json({ error: "Parámetros year/month inválidos" }, { status: 400 });
  }

  const from = `${year}-${String(month).padStart(2, "0")}-01`;
  const toDate = new Date(year, month, 0);
  const to = `${year}-${String(month).padStart(2, "0")}-${String(toDate.getDate()).padStart(2, "0")}`;

  const { data, error } = await supabase
    .from("business_sales")
    .select("id, description, amount, payment_method, category, date, notes, created_at")
    .eq("user_id", userId)
    .gte("date", from)
    .lte("date", to)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) {
    console.error("[GET /api/business/sales]", error);
    return NextResponse.json({ error: "Error al obtener ventas" }, { status: 500 });
  }

  return NextResponse.json({ sales: data });
}

// ── POST /api/business/sales ──────────────────────────────────────────────────
// Registra una nueva venta.
export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  let body: {
    description?: string;
    amount?: number;
    payment_method?: string;
    category?: string;
    date?: string;
    notes?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const { description, amount, payment_method, category, date, notes } = body;

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    return NextResponse.json({ error: "La descripción es obligatoria" }, { status: 400 });
  }
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return NextResponse.json({ error: "El monto debe ser un número positivo" }, { status: 400 });
  }

  const pmValue: PaymentMethod = VALID_PAYMENT_METHODS.includes(payment_method as PaymentMethod)
    ? (payment_method as PaymentMethod)
    : "efectivo";

  const dateValue = date ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return NextResponse.json({ error: "Fecha inválida (formato YYYY-MM-DD)" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("business_sales")
    .insert({
      user_id:        userId,
      description:    description.trim(),
      amount:         Math.round(amount * 100) / 100,
      payment_method: pmValue,
      category:       category?.trim() || null,
      date:           dateValue,
      notes:          notes?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/business/sales]", error);
    return NextResponse.json({ error: "Error al registrar venta" }, { status: 500 });
  }

  return NextResponse.json({ sale: data }, { status: 201 });
}
