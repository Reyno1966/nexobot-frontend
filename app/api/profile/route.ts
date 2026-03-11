import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@/lib/auth";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { userId } = auth;
  const supabase = getAdminClient();

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

  const { userId } = auth;
  const supabase = getAdminClient();
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

  if (error) {
    console.error("Profile upsert error:", error);
    return NextResponse.json({ error: "Error al guardar perfil", detail: error.message }, { status: 500 });
  }

  return NextResponse.json({ profile });
}
