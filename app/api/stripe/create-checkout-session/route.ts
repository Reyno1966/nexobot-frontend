import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    // 1) Verificar sesión del usuario
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

    // 2) Obtener priceId del body
    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "priceId requerido" }, { status: 400 });
    }

    // Suscripciones mensuales (modo: subscription)
    const SUBSCRIPTION_PRICE_IDS = [
      "price_1T8eHgRap0JkQNsmxXKjK3IH", // Starter $14/mes
      "price_1T8eNZRap0JkQNsmeObpDc8j", // Pro $29/mes
      "price_1T8eRdRap0JkQNsmllSsPbVs", // Premium $49/mes
    ];

    // Pagos únicos (modo: payment)
    const ONE_TIME_PRICE_IDS = [
      "price_1T8ehkRap0JkQNsmtky7j7ZL", // Personalización avanzada $49
      "price_1T8f2CRap0JkQNsmyzuyUvU4", // Automatizaciones avanzadas $79
      "price_1T8eyARap0JkQNsmWVnTTioZ", // Integración sistemas externos $99
    ];

    const isSubscription = SUBSCRIPTION_PRICE_IDS.includes(priceId);
    const isOneTime = ONE_TIME_PRICE_IDS.includes(priceId);

    if (!isSubscription && !isOneTime) {
      return NextResponse.json({ error: "Plan no válido" }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // 3) Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      mode: isSubscription ? "subscription" : "payment",
      payment_method_types: ["card"],
      customer_email: userData.user.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
      metadata: {
        user_id: userData.user.id,
        user_email: userData.user.email ?? "",
        price_id: priceId,
      },
      // Configuración para Europa/Suiza
      locale: "es",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Error desconocido";
    console.error("Error creando sesión de Stripe:", message);
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
