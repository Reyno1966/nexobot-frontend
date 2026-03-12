import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

// ── GET /api/business/expenses?year=YYYY&month=MM ─────────────────────────────
// Devuelve los gastos del usuario para el mes/año indicado.
// Si no se pasa year/month usa el mes actual.
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

  // Rango del mes: primer día al último día
  const from = `${year}-${String(month).padStart(2, "0")}-01`;
  const toDate = new Date(year, month, 0); // último día del mes
  const to = `${year}-${String(month).padStart(2, "0")}-${String(toDate.getDate()).padStart(2, "0")}`;

  const { data, error } = await supabase
    .from("business_expenses")
    .select("*")
    .eq("user_id", userId)
    .gte("date", from)
    .lte("date", to)
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/business/expenses]", error);
    return NextResponse.json({ error: "Error al obtener gastos" }, { status: 500 });
  }

  return NextResponse.json({ expenses: data });
}

// ── POST /api/business/expenses ───────────────────────────────────────────────
// Crea un nuevo gasto.
export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  let body: {
    description?: string;
    amount?: number;
    category?: string;
    supplier?: string;
    date?: string;
    notes?: string;
    receipt_url?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  // Validaciones
  const { description, amount, category, supplier, date, notes, receipt_url } = body;

  if (!description || typeof description !== "string" || description.trim().length === 0) {
    return NextResponse.json({ error: "La descripción es obligatoria" }, { status: 400 });
  }
  if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
    return NextResponse.json({ error: "El monto debe ser un número positivo" }, { status: 400 });
  }
  if (!category || typeof category !== "string" || category.trim().length === 0) {
    return NextResponse.json({ error: "La categoría es obligatoria" }, { status: 400 });
  }

  // Validar fecha ISO YYYY-MM-DD
  const dateValue = date ?? new Date().toISOString().slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    return NextResponse.json({ error: "Fecha inválida (formato YYYY-MM-DD)" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("business_expenses")
    .insert({
      user_id:     userId,
      description: description.trim(),
      amount:      Math.round(amount * 100) / 100, // 2 decimales
      category:    category.trim(),
      supplier:    supplier?.trim() || null,
      date:        dateValue,
      notes:       notes?.trim() || null,
      receipt_url: receipt_url?.trim() || null,
    })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/business/expenses]", error);
    return NextResponse.json({ error: "Error al crear gasto" }, { status: 500 });
  }

  return NextResponse.json({ expense: data }, { status: 201 });
}
