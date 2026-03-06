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
      "price_1T18BGRap0JkQNsmaUVhyNFr", // Starter $29/mes
      "price_1T15gVRap0JkQNsm59vukMuR", // Pro $59/mes
      "price_1T15jDRap0JkQNsmQRvEkpcm", // Premium $99/mes
    ];

    // Pagos únicos (modo: payment)
    const ONE_TIME_PRICE_IDS = [
      "price_1T161uRap0JkQNsm3BJZGOEu", // Personalización avanzada $99
      "price_1T163sRap0JkQNsmOrHBQuJp", // Automatizaciones avanzadas $149
      "price_1T166cRap0JkQNsmuPTOPBBu", // Integración sistemas externos $199
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
    console.error("Error creando sesión de Stripe:", err);
    return NextResponse.json(
      { error: "Error al iniciar el proceso de pago" },
      { status: 500 }
    );
  }
}
