import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

// ── PUT /api/business/expenses/[id] ──────────────────────────────────────────
// Actualiza un gasto existente (solo del usuario autenticado).
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

  const { description, amount, category, supplier, date, notes, receipt_url } = body;

  // Validaciones de los campos enviados
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

  // Construir el objeto de actualización solo con los campos presentes
  const updates: Record<string, unknown> = {};
  if (description !== undefined) updates.description = description.trim();
  if (amount      !== undefined) updates.amount      = Math.round(amount * 100) / 100;
  if (category    !== undefined) updates.category    = category.trim();
  if (supplier    !== undefined) updates.supplier    = supplier.trim() || null;
  if (date        !== undefined) updates.date        = date;
  if (notes       !== undefined) updates.notes       = notes.trim() || null;
  if (receipt_url !== undefined) updates.receipt_url = receipt_url.trim() || null;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No hay campos para actualizar" }, { status: 400 });
  }

  // RLS garantiza que solo el propietario puede actualizar
  const { data, error } = await supabase
    .from("business_expenses")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("[PUT /api/business/expenses/:id]", error);
    return NextResponse.json({ error: "Error al actualizar gasto" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Gasto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ expense: data });
}

// ── DELETE /api/business/expenses/[id] ───────────────────────────────────────
// Elimina un gasto existente (solo del usuario autenticado).
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { id } = await params;
  if (!id) return NextResponse.json({ error: "ID requerido" }, { status: 400 });

  // RLS garantiza que solo el propietario puede eliminar
  const { error, count } = await supabase
    .from("business_expenses")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("[DELETE /api/business/expenses/:id]", error);
    return NextResponse.json({ error: "Error al eliminar gasto" }, { status: 500 });
  }
  if (count === 0) {
    return NextResponse.json({ error: "Gasto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
