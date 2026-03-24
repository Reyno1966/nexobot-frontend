import { NextResponse } from "next/server";
import { createHmac } from "crypto";
import { getAuth } from "@/lib/auth";

function buildState(userId: string): string {
  const hmac = createHmac("sha256", process.env.STRIPE_WEBHOOK_SECRET ?? "");
  hmac.update(userId);
  return hmac.digest("hex");
}

export async function GET() {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  const { userId } = auth;

  const clientId = process.env.STRIPE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: "Stripe Connect no configurado" }, { status: 500 });
  }

  const state = buildState(userId);
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/connect/callback`;

  const url = new URL("https://connect.stripe.com/oauth/authorize");
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("scope", "read_write");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("state", state);

  return NextResponse.redirect(url.toString());
}
