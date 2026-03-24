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

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { userId } = auth;

  const supabase = getAdminClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_connect_account_id, stripe_connect_charges_enabled, stripe_connect_connected_at")
    .eq("id", userId)
    .single();

  if (!profile?.stripe_connect_account_id) {
    return NextResponse.json({ connected: false });
  }

  // Refresh charges_enabled from Stripe
  let chargesEnabled: boolean = profile.stripe_connect_charges_enabled ?? false;
  try {
    const account = await stripe.accounts.retrieve(profile.stripe_connect_account_id);
    chargesEnabled = account.charges_enabled ?? false;
    if (chargesEnabled !== profile.stripe_connect_charges_enabled) {
      await supabase
        .from("profiles")
        .update({ stripe_connect_charges_enabled: chargesEnabled })
        .eq("id", userId);
    }
  } catch {
    // Use cached value if Stripe is unreachable
  }

  return NextResponse.json({
    connected:       true,
    charges_enabled: chargesEnabled,
    connected_at:    profile.stripe_connect_connected_at,
    // Never expose full acct_id — masked preview only
    account_preview: `acct_···${profile.stripe_connect_account_id.slice(-6)}`,
  });
}
