import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;

  if (!accessToken) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  // Solo planes de suscripción real, nunca servicios adicionales de pago único
  const SUBSCRIPTION_PLANS = ["Starter", "Pro", "Premium"];

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userData.user.id)
    .in("status", ["active", "trialing"])
    .in("plan_name", SUBSCRIPTION_PLANS)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ subscription: subscription ?? null });
}
