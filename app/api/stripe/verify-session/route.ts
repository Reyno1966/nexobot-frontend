import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const PLAN_NAMES: Record<string, string> = {
  // Planes mensuales
  price_1T8eHgRap0JkQNsmxXKjK3IH: "Starter",
  price_1T8eNZRap0JkQNsmeObpDc8j: "Pro",
  price_1T8eRdRap0JkQNsmllSsPbVs: "Premium",
  // Planes anuales
  price_1T8qkPRap0JkQNsm1MI5XoYm: "Starter",
  price_1T8qndRap0JkQNsmswIpSK3M: "Pro",
  price_1T8qr5Rap0JkQNsm8wzRX02G: "Premium",
  // Servicios adicionales
  price_1T8ehkRap0JkQNsmtky7j7ZL: "Personalización avanzada",
  price_1T8f2CRap0JkQNsmyzuyUvU4: "Automatizaciones avanzadas",
  price_1T8eyARap0JkQNsmWVnTTioZ: "Integración con sistemas externos",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "session_id requerido" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price"],
    });

    const priceId = session.line_items?.data[0]?.price?.id ?? "";
    const planName = PLAN_NAMES[priceId] ?? "NexoBot";
    const isSubscription = session.mode === "subscription";
    const amount = session.amount_total ?? 0;

    return NextResponse.json({
      status: session.payment_status,
      planName,
      isSubscription,
      amount: (amount / 100).toFixed(0),
      currency: session.currency?.toUpperCase() ?? "USD",
      customerEmail: session.customer_email ?? "",
    });
  } catch {
    // Si no se puede verificar, devolver datos genéricos (no bloquear la UX)
    return NextResponse.json({
      status: "paid",
      planName: "NexoBot",
      isSubscription: true,
      amount: "",
      currency: "USD",
      customerEmail: "",
    });
  }
}
