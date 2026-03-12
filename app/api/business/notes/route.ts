import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

const VALID_COLORS = ["yellow", "blue", "green", "red", "purple"] as const;
type NoteColor = (typeof VALID_COLORS)[number];

// ── GET /api/business/notes ───────────────────────────────────────────────────
// Devuelve todas las notas del usuario (pinned primero, luego por fecha).
export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

  const { data, error } = await supabase
    .from("business_notes")
    .select("*")
    .eq("user_id", userId)
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[GET /api/business/notes]", error);
    return NextResponse.json({ error: "Error al obtener notas" }, { status: 500 });
  }

  return NextResponse.json({ notes: data });
}

// ── POST /api/business/notes ──────────────────────────────────────────────────
// Crea una nueva nota.
export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { supabase, userId } = auth;

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

  if (!content || typeof content !== "string" || content.trim().length === 0) {
    return NextResponse.json({ error: "El contenido es obligatorio" }, { status: 400 });
  }
  if (content.trim().length > 2000) {
    return NextResponse.json({ error: "La nota no puede superar 2000 caracteres" }, { status: 400 });
  }

  const colorValue: NoteColor = VALID_COLORS.includes(color as NoteColor)
    ? (color as NoteColor)
    : "yellow";

  const { data, error } = await supabase
    .from("business_notes")
    .insert({
      user_id:   userId,
      content:   content.trim(),
      color:     colorValue,
      is_pinned: is_pinned === true,
    })
    .select()
    .single();

  if (error) {
    console.error("[POST /api/business/notes]", error);
    return NextResponse.json({ error: "Error al crear nota" }, { status: 500 });
  }

  return NextResponse.json({ note: data }, { status: 201 });
}
