import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

const VALID_COLORS = ["yellow", "blue", "green", "red", "purple"] as const;
type NoteColor = (typeof VALID_COLORS)[number];

// ── PUT /api/business/notes/[id] ──────────────────────────────────────────────
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
    content?: string;
    color?: string;
    is_pinned?: boolean;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body inválido" }, { status: 400 });
  }

  const { content, color, is_pinned } = body;

  if (content !== undefined) {
    if (typeof content !== "string" || content.trim().length === 0) {
      return NextResponse.json({ error: "Contenido inválido" }, { status: 400 });
    }
    if (content.trim().length > 2000) {
      return NextResponse.json({ error: "La nota no puede superar 2000 caracteres" }, { status: 400 });
    }
  }

  const updates: Record<string, unknown> = {};
  if (content   !== undefined) updates.content   = content.trim();
  if (color     !== undefined) updates.color     = VALID_COLORS.includes(color as NoteColor) ? color : "yellow";
  if (is_pinned !== undefined) updates.is_pinned = is_pinned === true;

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: "No hay campos para actualizar" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("business_notes")
    .update(updates)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) {
    console.error("[PUT /api/business/notes/:id]", error);
    return NextResponse.json({ error: "Error al actualizar nota" }, { status: 500 });
  }
  if (!data) {
    return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ note: data });
}

// ── DELETE /api/business/notes/[id] ──────────────────────────────────────────
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
    .from("business_notes")
    .delete({ count: "exact" })
    .eq("id", id)
    .eq("user_id", userId);

  if (error) {
    console.error("[DELETE /api/business/notes/:id]", error);
    return NextResponse.json({ error: "Error al eliminar nota" }, { status: 500 });
  }
  if (count === 0) {
    return NextResponse.json({ error: "Nota no encontrada" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
