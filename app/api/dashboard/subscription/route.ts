import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { supabase, userId } = auth;

  // Solo planes de suscripción real, nunca servicios adicionales de pago único
  const SUBSCRIPTION_PLANS = ["Starter", "Pro", "Premium"];

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", userId)
    .in("status", ["active", "trialing"])
    .in("plan_name", SUBSCRIPTION_PLANS)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ subscription: subscription ?? null });
}
