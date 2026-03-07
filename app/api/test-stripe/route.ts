import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.STRIPE_SECRET_KEY ?? "";

  // Show key info without exposing full key
  const keyInfo = {
    set: !!key,
    length: key.length,
    starts: key.substring(0, 15),
    ends: key.slice(-6),
  };

  if (!key) {
    return NextResponse.json({ ok: false, error: "STRIPE_SECRET_KEY not set", keyInfo });
  }

  // Test with direct fetch instead of SDK
  try {
    const res = await fetch("https://api.stripe.com/v1/products?limit=1", {
      headers: {
        Authorization: `Bearer ${key}`,
        "Stripe-Version": "2026-02-25",
      },
    });
    const data = await res.json();
    return NextResponse.json({
      ok: res.ok,
      status: res.status,
      keyInfo,
      stripeResponse: res.ok ? { count: data.data?.length } : data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown";
    return NextResponse.json({ ok: false, error: message, keyInfo }, { status: 500 });
  }
}
