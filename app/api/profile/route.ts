import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  return NextResponse.json({ profile: profile ?? null });
}

export async function PUT(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const body = await req.json();

  const allowed = [
    "company_name", "company_logo_url", "company_address",
    "company_phone", "company_email", "company_website",
  ];

  const updates: Record<string, unknown> = { id: userId, updated_at: new Date().toISOString() };
  for (const key of allowed) {
    if (body[key] !== undefined) updates[key] = body[key] || null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .upsert(updates, { onConflict: "id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al guardar perfil" }, { status: 500 });

  return NextResponse.json({ profile });
}
