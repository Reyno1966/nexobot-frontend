import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET() {
  try {
    const products = await stripe.products.list({ limit: 1 });
    return NextResponse.json({
      ok: true,
      count: products.data.length,
      key_preview:
        (process.env.STRIPE_SECRET_KEY?.substring(0, 20) ?? "") +
        "..." +
        (process.env.STRIPE_SECRET_KEY?.slice(-6) ?? ""),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
