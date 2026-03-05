"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Subscription {
  plan_name: string;
  status: string;
  current_period_end?: string;
  cancel_at_period_end?: boolean;
  stripe_price_id?: string;
}

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/mes",
    priceId: "price_1T18BGRap0JkQNsmaUVhyNFr",
    color: "border-blue-200",
    badge: "",
    features: ["3 bots activos", "5.000 mensajes/mes", "Soporte por email", "Analíticas básicas"],
  },
  {
    name: "Pro",
    price: "$59",
    period: "/mes",
    priceId: "price_1T15gVRap0JkQNsm59vukMuR",
    color: "border-blue-500",
    badge: "Más popular",
    features: ["10 bots activos", "20.000 mensajes/mes", "Soporte prioritario", "Analíticas avanzadas", "Integraciones"],
  },
  {
    name: "Premium",
    price: "$99",
    period: "/mes",
    priceId: "price_1T15jDRap0JkQNsmQRvEkpcm",
    color: "border-purple-400",
    badge: "",
    features: ["Bots ilimitados", "Mensajes ilimitados", "Soporte 24/7", "Panel personalizado", "API acceso completo"],
  },
];

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard/subscription", { credentials: "include" });
      if (res.ok) setSubscription((await res.json()).subscription ?? null);
      setLoading(false);
    }
    load();
  }, []);

  async function handleCheckout(priceId: string) {
    setCheckoutLoading(priceId);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setCheckoutLoading(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const renewsOn = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("es-ES", {
        day: "numeric", month: "long", year: "numeric",
      })
    : null;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Facturación</h1>
        <p className="text-gray-500 mt-1">Gestiona tu suscripción y plan</p>
      </div>

      {/* Current plan */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Plan actual</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${subscription ? "bg-blue-600" : "bg-gray-200"}`}>
              <svg className={`w-6 h-6 ${subscription ? "text-white" : "text-gray-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-lg">
                {subscription?.plan_name ?? "Gratis"}
              </p>
              {subscription ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    subscription.status === "active" ? "bg-green-100 text-green-700"
                    : subscription.status === "past_due" ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-500"
                  }`}>
                    {subscription.status === "active" ? "Activo"
                     : subscription.status === "past_due" ? "Pago pendiente"
                     : subscription.status}
                  </span>
                  {renewsOn && !subscription.cancel_at_period_end && (
                    <span className="text-xs text-gray-400">Renueva el {renewsOn}</span>
                  )}
                  {subscription.cancel_at_period_end && (
                    <span className="text-xs text-yellow-600">⚠️ Cancela el {renewsOn}</span>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mt-0.5">1 bot · 100 mensajes/mes</p>
              )}
            </div>
          </div>
          {!subscription && (
            <Link
              href="#planes"
              className="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
            >
              Mejorar plan
            </Link>
          )}
        </div>
      </div>

      {/* Plans */}
      <div id="planes">
        <h2 className="text-base font-semibold text-gray-900 mb-4">
          {subscription ? "Cambiar plan" : "Elegir un plan"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PLANS.map((plan) => {
            const isCurrent = subscription?.plan_name === plan.name;
            return (
              <div
                key={plan.name}
                className={`bg-white rounded-2xl border-2 shadow-sm p-6 flex flex-col ${isCurrent ? "border-blue-500 ring-2 ring-blue-100" : plan.color}`}
              >
                {plan.badge && (
                  <span className="self-start text-xs font-semibold bg-blue-600 text-white px-2.5 py-1 rounded-full mb-3">
                    {plan.badge}
                  </span>
                )}
                {isCurrent && (
                  <span className="self-start text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full mb-3">
                    Plan actual
                  </span>
                )}
                <p className="font-bold text-xl text-gray-900">{plan.name}</p>
                <div className="flex items-end gap-1 mt-1 mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                </div>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => !isCurrent && handleCheckout(plan.priceId)}
                  disabled={isCurrent || checkoutLoading === plan.priceId}
                  className={`w-full py-2.5 rounded-xl text-sm font-semibold transition ${
                    isCurrent
                      ? "bg-gray-100 text-gray-400 cursor-default"
                      : "bg-blue-600 text-white hover:bg-blue-700"
                  } disabled:opacity-60`}
                >
                  {checkoutLoading === plan.priceId
                    ? "Redirigiendo..."
                    : isCurrent
                    ? "Plan actual"
                    : `Suscribirse a ${plan.name}`}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* One-time addons */}
      <div className="mt-10">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Servicios adicionales (pago único)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: "Personalización Avanzada", price: "$99", priceId: "price_1T161uRap0JkQNsm3BJZGOEu", desc: "Diseño y configuración personalizada de tu bot" },
            { name: "Automatizaciones Avanzadas", price: "$149", priceId: "price_1T163sRap0JkQNsmOrHBQuJp", desc: "Flujos complejos y automatizaciones a medida" },
            { name: "Integración Sistemas Externos", price: "$199", priceId: "price_1T166cRap0JkQNsmuPTOPBBu", desc: "Conecta tu bot con CRM, ERP u otros sistemas" },
          ].map((addon) => (
            <div key={addon.name} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex flex-col gap-3">
              <div>
                <p className="font-semibold text-gray-900">{addon.name}</p>
                <p className="text-sm text-gray-500 mt-1">{addon.desc}</p>
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-50">
                <span className="text-xl font-bold text-gray-900">{addon.price}</span>
                <button
                  onClick={() => handleCheckout(addon.priceId)}
                  disabled={checkoutLoading === addon.priceId}
                  className="bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-800 transition disabled:opacity-60"
                >
                  {checkoutLoading === addon.priceId ? "..." : "Contratar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
