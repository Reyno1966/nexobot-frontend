import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  try {
    // 1) Verificar sesión del usuario (con auto-refresh)
    const auth = await getAuth();
    if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const { supabase } = auth;
    const { data: userData } = await supabase.auth.getUser();
    if (!userData?.user) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    // 2) Obtener priceId del body
    const { priceId } = await req.json();
    if (!priceId) {
      return NextResponse.json({ error: "priceId requerido" }, { status: 400 });
    }

    // Suscripciones (modo: subscription) — mensuales y anuales
    const SUBSCRIPTION_PRICE_IDS = [
      // v3 (activos)
      "price_1TCyOpRap0JkQNsmITpDzS3K", // Starter $19/mes
      "price_1TCyZtRap0JkQNsmgI7TTCsN", // Pro $39/mes
      "price_1TCyjDRap0JkQNsmsD2sNoh7", // Premium $79/mes
      "price_1TCyWDRap0JkQNsmF2TqoFIh", // Starter $182/año
      "price_1TCyd3Rap0JkQNsmkNvp1VvQ", // Pro $374/año
      "price_1TCylLRap0JkQNsm2rjF94Ny", // Premium $778/año
      // v2 (legacy)
      "price_1T8eHgRap0JkQNsmxXKjK3IH", // Starter $14/mes
      "price_1T8eNZRap0JkQNsmeObpDc8j", // Pro $29/mes
      "price_1T8eRdRap0JkQNsmllSsPbVs", // Premium $49/mes
      "price_1T8qkPRap0JkQNsm1MI5XoYm", // Starter $134/año
      "price_1T8qndRap0JkQNsmswIpSK3M", // Pro $278/año
      "price_1T8qr5Rap0JkQNsm8wzRX02G", // Premium $470/año
    ];

    // Pagos únicos (modo: payment)
    const ONE_TIME_PRICE_IDS = [
      // v3 (activos)
      "price_1TCzXvRap0JkQNsmZu8qpWIX", // Personalización Avanzada $69
      "price_1TCzaERap0JkQNsmDF5hgJ75", // Automatizaciones Avanzadas $99
      "price_1TCzdPRap0JkQNsmkZRPlJPC", // Integración Sistemas Externos $149
      // v2 (legacy)
      "price_1T8ehkRap0JkQNsmtky7j7ZL", // Personalización avanzada
      "price_1T8f2CRap0JkQNsmyzuyUvU4", // Automatizaciones avanzadas
      "price_1T8eyARap0JkQNsmWVnTTioZ", // Integración sistemas externos
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
