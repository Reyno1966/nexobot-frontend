import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function DELETE() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { userId } = auth;

  const supabase = getAdminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_connect_account_id")
    .eq("id", userId)
    .single();

  if (!profile?.stripe_connect_account_id) {
    return NextResponse.json({ error: "No hay cuenta Stripe conectada" }, { status: 400 });
  }

  // Revoke access at Stripe (best-effort — if already revoked, continue)
  try {
    await stripe.oauth.deauthorize({
      client_id:       process.env.STRIPE_CLIENT_ID ?? "",
      stripe_user_id:  profile.stripe_connect_account_id,
    });
  } catch {
    // Already deauthorized or token expired — proceed to clean DB
  }

  // Clear from profiles
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      stripe_connect_account_id:      null,
      stripe_connect_charges_enabled: false,
      stripe_connect_connected_at:    null,
    })
    .eq("id", userId);

  if (dbError) {
    return NextResponse.json({ error: "Error al desconectar" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
