import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

const VALID_PAYMENT_METHODS = ["efectivo", "tarjeta", "transferencia", "otro"] as const;
type PaymentMethod = (typeof VALID_PAYMENT_METHODS)[number];

// ── PUT /api/business/sales/[id] ──────────────────────────────────────────────
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

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

  if (description !== undefined) {
    if (typeof description !== "string" || description.trim().length === 0) {
      return NextResponse.json({ error: "Descripción inválida" }, { status: 400 });
    }
  }
  if (amount !== undefined) {
    if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
      return NextResponse.json({ error: "Monto inválido" }, { status: 400 });
    }
  }
  if (date !== undefined && !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: "Fecha inválida (formato YYYY-MM-DD)" }, { status: 400 });
  }

  const updates: Record<string, unknown> = {};
  if (description     !== undefined) updates.description     = description.trim();
  if (amount          !== undefined) updates.amount          = Math.round(amount * 100) / 100;
  if (payment_method  !== undefined) {
    updates.payment_method = VALID_PAYMENT_METHODS.includes(payment_method as PaymentMethod)
      ? payment_method
      : "efectivo";
  }
  if (category !== undefined) updates.category = category.trim() || null;
  if (date     !== undefined) updates.date     = date;
  if (notes    !== undefined) updates.notes    = notes.trim() || null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No hay campos para actualizar" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("business_sales")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("[PUT /api/business/sales/:id]", error);
    return NextResponse.json({ error: "Error al actualizar venta" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Venta no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ sale: data });
}

// ── DELETE /api/business/sales/[id] ──────────────────────────────────────────
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  const { error, count } = await supabase
    .from("business_sales")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("[DELETE /api/business/sales/:id]", error);
    return NextResponse.json({ error: "Error al eliminar venta" }, { status: 500 });
  }
  if (count === 0) {
    return NextResponse.json({ error: "Venta no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
