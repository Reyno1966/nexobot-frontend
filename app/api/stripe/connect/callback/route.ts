import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createHmac, timingSafeEqual } from "crypto";
import { getAuth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

function buildState(userId: string): string {
  const hmac = createHmac("sha256", process.env.STRIPE_WEBHOOK_SECRET ?? "");
  hmac.update(userId);
  return hmac.digest("hex");
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function GET(req: NextRequest) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const { searchParams } = new URL(req.url);

  const code  = searchParams.get("code");
  const state = searchParams.get("state");
  const oauthError = searchParams.get("error");

  // User declined on Stripe
  if (oauthError) {
    return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=cancelled`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=error`);
  }

  const auth = await getAuth();
  if (!auth) {
    return NextResponse.redirect(`${appUrl}/auth/login`);
  }
  const { userId } = auth;

  // Verify CSRF state (timing-safe)
  const expectedState  = buildState(userId);
  const stateBytes     = Buffer.from(state);
  const expectedBytes  = Buffer.from(expectedState);
  const stateValid =
    stateBytes.length === expectedBytes.length &&
    timingSafeEqual(stateBytes, expectedBytes);

  if (!stateValid) {
    return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=error`);
  }

  // Exchange code → stripe_user_id
  let stripeAccountId: string;
  let chargesEnabled: boolean;
  try {
    const token = await stripe.oauth.token({
      grant_type: "authorization_code",
      code,
    });
    stripeAccountId = token.stripe_user_id!;
    const account   = await stripe.accounts.retrieve(stripeAccountId);
    chargesEnabled  = account.charges_enabled ?? false;
  } catch {
    return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=error`);
  }

  // Persist in profiles (service role to bypass RLS)
  const supabase = getAdminClient();
  const { error: dbError } = await supabase
    .from("profiles")
    .update({
      stripe_connect_account_id:      stripeAccountId,
      stripe_connect_charges_enabled: chargesEnabled,
      stripe_connect_connected_at:    new Date().toISOString(),
    })
    .eq("id", userId);

  if (dbError) {
    return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=error`);
  }

  return NextResponse.redirect(`${appUrl}/dashboard/settings?connect=success`);
}
