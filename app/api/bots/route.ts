import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

async function getAuth(): Promise<{ supabase: SupabaseClient; userId: string } | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  if (!accessToken) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) return null;

  return { supabase, userId: data.user.id };
}

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  const { data: bots, error } = await supabase
    .from("bots")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: "Error al obtener bots" }, { status: 500 });

  return NextResponse.json({ bots: bots ?? [] });
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  const body = await req.json();
  const { name, description, channel } = body;

  if (!name?.trim()) {
    return NextResponse.json({ error: "El nombre es requerido" }, { status: 400 });
  }

  const { data: bot, error } = await supabase
    .from("bots")
    .insert({
      user_id: userId,
      name: name.trim(),
      description: description?.trim() ?? "",
      channel: channel ?? "web",
      status: "active",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al crear bot" }, { status: 500 });

  return NextResponse.json({ bot }, { status: 201 });
}
