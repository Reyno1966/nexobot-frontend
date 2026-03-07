import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

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
  const { name, description, channel, system_prompt } = body;

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
      system_prompt: system_prompt?.trim() ?? "",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al crear bot: " + error.message }, { status: 500 });

  return NextResponse.json({ bot }, { status: 201 });
}
