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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;
  const { name, description, channel, status } = await req.json();

  const { data: bot, error } = await supabase
    .from("bots")
    .update({
      name,
      description,
      channel,
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: "Error al actualizar bot" }, { status: 500 });

  return NextResponse.json({ bot });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;
  const { id } = await params;

  const { error } = await supabase
    .from("bots")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);

  if (error) return NextResponse.json({ error: "Error al eliminar bot" }, { status: 500 });

  return NextResponse.json({ success: true });
}
