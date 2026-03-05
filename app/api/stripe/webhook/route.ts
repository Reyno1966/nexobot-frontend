import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";
import { PRICE_TO_PLAN } from "@/lib/plans";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Webhook no configurado" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Firma inválida" }, { status: 400 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  switch (event.type) {

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.user_id;
      const priceId = session.metadata?.price_id;
      const planName = PRICE_TO_PLAN[priceId ?? ""] ?? "unknown";

      if (!userId) break;

      if (session.mode === "subscription" && session.subscription) {
        const sub = await stripe.subscriptions.retrieve(session.subscription as string);
        await supabase.from("subscriptions").upsert(
          {
            user_id: userId,
            stripe_customer_id: session.customer as string,
            stripe_subscription_id: sub.id,
            stripe_price_id: priceId ?? "",
            plan_name: planName,
            status: sub.status,
            cancel_at_period_end: sub.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "stripe_subscription_id" }
        );
      } else if (session.mode === "payment") {
        await supabase.from("subscriptions").insert({
          user_id: userId,
          stripe_customer_id: session.customer as string,
          stripe_subscription_id: `onetime_${session.id}`,
          stripe_price_id: priceId ?? "",
          plan_name: planName,
          status: "active",
          updated_at: new Date().toISOString(),
        });
      }
      break;
    }

    case "customer.subscription.updated": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({
          status: subscription.status,
          cancel_at_period_end: subscription.cancel_at_period_end,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      await supabase
        .from("subscriptions")
        .update({ status: "canceled", updated_at: new Date().toISOString() })
        .eq("stripe_subscription_id", subscription.id);
      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      // Usar customer ID para encontrar la suscripción
      if (invoice.customer) {
        await supabase
          .from("subscriptions")
          .update({ status: "past_due", updated_at: new Date().toISOString() })
          .eq("stripe_customer_id", invoice.customer as string);
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
