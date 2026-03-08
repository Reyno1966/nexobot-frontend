"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

// Mapa de productos según el priceId de Stripe
const PLANS: Record<string, { name: string; price: string; description: string; features: string[]; type: "subscription" | "one-time" }> = {
  // ── Suscripciones mensuales ──
  price_1T8eHgRap0JkQNsmxXKjK3IH: {
    name: "Starter",
    price: "$14/mes",
    description: "Ideal para emprendedores que están comenzando",
    type: "subscription",
    features: [
      "Respuestas automáticas con IA",
      "Chat embebido para tu web",
      "Plantillas de mensajes",
      "Atención 24/7 sin esfuerzo",
      "Captura básica de leads",
      "Panel de control intuitivo",
    ],
  },
  price_1T8eNZRap0JkQNsmeObpDc8j: {
    name: "Pro",
    price: "$29/mes",
    description: "Perfecto para negocios que quieren escalar",
    type: "subscription",
    features: [
      "Todo lo del Starter",
      "Integración con WhatsApp",
      "Flujos inteligentes de ventas",
      "Segmentación avanzada de clientes",
      "Automatizaciones personalizadas",
      "Integración con redes sociales",
    ],
  },
  price_1T8eRdRap0JkQNsmllSsPbVs: {
    name: "Premium",
    price: "$49/mes",
    description: "Para empresas que necesitan máxima potencia",
    type: "subscription",
    features: [
      "Todo lo del Pro",
      "Mensajes ilimitados",
      "Embudo de ventas automático",
      "Integraciones avanzadas",
      "Soporte prioritario",
      "Configuración asistida",
    ],
  },
  // ── Servicios adicionales (pago único) ──
  price_1T8ehkRap0JkQNsmtky7j7ZL: {
    name: "Personalización avanzada",
    price: "$49",
    description: "Haz que tu bot hable como tu marca",
    type: "one-time",
    features: [
      "Ajustes personalizados",
      "Respuestas adaptadas a tu negocio",
      "Optimización del flujo conversacional",
    ],
  },
  price_1T8f2CRap0JkQNsmyzuyUvU4: {
    name: "Automatizaciones avanzadas",
    price: "$79",
    description: "Convierte tu bot en una máquina de ventas",
    type: "one-time",
    features: [
      "Flujos inteligentes personalizados",
      "Segmentación avanzada",
      "Embudos automatizados",
    ],
  },
  price_1T8eyARap0JkQNsmWVnTTioZ: {
    name: "Integración con sistemas externos",
    price: "$99",
    description: "Conecta tu bot con tu ecosistema",
    type: "one-time",
    features: [
      "Integración con CRM",
      "Conexión con APIs externas",
      "Sincronización de datos",
    ],
  },
};

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const priceId = searchParams.get("priceId");

  const [user, setUser] = useState<{ email: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const plan = priceId ? PLANS[priceId] : null;

  useEffect(() => {
    // Verificar si el usuario está autenticado
    fetch("/api/auth/me", { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!plan || !priceId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plan no encontrado</h1>
          <p className="text-gray-500 mb-6">
            El plan que buscas no existe. Por favor selecciona un plan desde nuestra página de precios.
          </p>
          <Link
            href="/#pricing"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Ver planes
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!user) {
      // Guardar destino para redirigir tras login
      router.push(`/auth/login?redirect=/checkout?priceId=${priceId}`);
      return;
    }

    setProcessing(true);

    try {
      // En FASE 3 esto llamará al API de Stripe
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
        credentials: "include",
      });

      if (res.ok) {
        const { url } = await res.json();
        window.location.href = url;
      } else {
        // Si Stripe aún no está configurado, mostrar mensaje amigable
        alert("El sistema de pagos estará disponible muy pronto. ¡Gracias por tu interés!");
      }
    } catch {
      alert("Ocurrió un error. Por favor intenta de nuevo.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex justify-center">
            <Image src="/nexobot-logo.png" alt="NexoBot" width={140} height={44} className="h-10 w-auto object-contain" priority />
          </Link>
          <p className="text-gray-500 mt-2 text-sm">Proceso de pago seguro</p>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Banner del plan */}
          <div className="bg-blue-600 text-white px-8 py-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-sm font-medium uppercase tracking-wide">
                  {plan.type === "subscription" ? "Suscripción mensual" : "Pago único"}
                </p>
                <h1 className="text-3xl font-extrabold mt-1">{plan.name}</h1>
                <p className="text-blue-100 mt-1 text-sm">{plan.description}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-extrabold">{plan.price}</p>
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div className="px-8 py-6">

            {/* Incluye */}
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
              Incluye
            </h2>
            <ul className="space-y-2 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700">
                  <span className="text-green-500 font-bold">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Usuario actual o acceso invitado */}
            {user ? (
              <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <div>
                  <p className="text-sm font-medium text-green-800">Sesión activa</p>
                  <p className="text-xs text-green-600">{user.email}</p>
                </div>
              </div>
            ) : (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3 mb-6 flex items-center gap-3">
                <span className="text-yellow-600 text-xl">⚠️</span>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Necesitas iniciar sesión</p>
                  <p className="text-xs text-yellow-600">
                    Te redirigiremos al login y luego volverás aquí.
                  </p>
                </div>
              </div>
            )}

            {/* Botón de pago */}
            <button
              onClick={handleCheckout}
              disabled={processing}
              className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Procesando...
                </span>
              ) : user ? (
                `Pagar ${plan.price}`
              ) : (
                "Iniciar sesión para pagar"
              )}
            </button>

            {/* Garantías */}
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
              <span>🔒 Pago seguro</span>
              <span>💳 SSL encriptado</span>
              <span>↩️ Cancelación libre</span>
            </div>
          </div>
        </div>

        {/* Volver */}
        <div className="text-center mt-6">
          <Link href="/#pricing" className="text-sm text-gray-500 hover:text-blue-600 transition">
            ← Volver a planes
          </Link>
        </div>

      </div>
    </div>
  );
}

// Suspense boundary requerido por Next.js 15 para useSearchParams()
export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
