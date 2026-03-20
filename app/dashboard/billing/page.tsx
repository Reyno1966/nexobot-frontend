"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PLAN_PRICES } from "@/lib/plans";
import { trackBeginCheckout } from "@/lib/gtag";

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
    monthly:  { price: "$14",  priceId: PLAN_PRICES.Starter.monthly.stripe_price_id },
    annual:   { price: "$134", monthlyEquiv: "$11", priceId: PLAN_PRICES.Starter.annual.stripe_price_id },
    color: "border-blue-200",
    badge: "",
    features: ["3 bots activos", "5.000 mensajes/mes", "Soporte por email", "Analíticas básicas"],
  },
  {
    name: "Pro",
    monthly:  { price: "$29",  priceId: PLAN_PRICES.Pro.monthly.stripe_price_id },
    annual:   { price: "$278", monthlyEquiv: "$23", priceId: PLAN_PRICES.Pro.annual.stripe_price_id },
    color: "border-blue-500",
    badge: "Más popular",
    features: ["10 bots activos", "20.000 mensajes/mes", "Soporte prioritario", "Analíticas avanzadas", "Integraciones"],
  },
  {
    name: "Business",
    monthly:  { price: "$79",  priceId: PLAN_PRICES.Business.monthly.stripe_price_id },
    annual:   { price: "$790", monthlyEquiv: "$66", priceId: PLAN_PRICES.Business.annual.stripe_price_id },
    color: "border-purple-400",
    badge: "",
    features: ["Bots ilimitados", "Mensajes ilimitados", "Todo lo del Pro", "Agente AI dedicado", "Soporte dedicado"],
  },
];

export default function BillingPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState(false);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/dashboard/subscription", { credentials: "include" });
      if (res.ok) setSubscription((await res.json()).subscription ?? null);
      setLoading(false);
    }
    load();
  }, []);

  async function handleCheckout(priceId: string, planName?: string, value?: number) {
    setCheckoutLoading(priceId);
    setCheckoutError(null);
    // Conversión: inicio de checkout
    if (planName && value) trackBeginCheckout(planName, value);
    try {
      const res = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setCheckoutError(data.error || "Error al iniciar el pago");
      }
    } catch {
      setCheckoutError("Error de conexión. Inténtalo de nuevo.");
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

      {/* Checkout error */}
      {checkoutError && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-6 text-sm">
          ⚠️ {checkoutError}
        </div>
      )}

      {/* Plans */}
      <div id="planes">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-base font-semibold text-gray-900">
            {subscription ? "Cambiar plan" : "Elegir un plan"}
          </h2>
          {/* Toggle mensual / anual */}
          <div className="flex items-center gap-3">
            <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>Mensual</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-blue-600" : "bg-gray-200"}`}
            >
              <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
            </button>
            <span className={`text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
              Anual
              <span className="ml-1.5 text-xs font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full">20% dto.</span>
            </span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          {PLANS.map((plan) => {
            const pricing = isAnnual ? plan.annual : plan.monthly;
            const priceId = pricing.priceId;
            const isCurrent = subscription?.plan_name === plan.name;
            const isPro = plan.name === "Pro";
            const annualDisabled = isAnnual && !priceId;
            return (
              <div
                key={plan.name}
                className={`rounded-2xl border-2 p-6 flex flex-col transition-all ${
                  isPro
                    ? "bg-gradient-to-b from-[#050816] to-[#0d1537] border-blue-500 shadow-xl shadow-blue-900/30 -translate-y-2"
                    : isCurrent
                    ? "bg-white border-blue-500 ring-2 ring-blue-100 shadow-sm"
                    : "bg-white border-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1"
                }`}
              >
                {plan.badge && !isCurrent && (
                  <span className="self-start text-xs font-bold bg-gradient-to-r from-blue-500 to-violet-500 text-white px-3 py-1 rounded-full mb-3">
                    ⭐ {plan.badge}
                  </span>
                )}
                {isCurrent && (
                  <span className="self-start text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full mb-3">
                    ✓ Plan actual
                  </span>
                )}
                <p className={`font-bold text-xl ${isPro ? "text-white" : "text-gray-900"}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mt-1 mb-1">
                  {isAnnual ? (
                    <>
                      <span className={`text-3xl font-extrabold ${isPro ? "text-white" : "text-gray-900"}`}>
                        {plan.annual.monthlyEquiv}
                      </span>
                      <span className={`text-sm mb-1 ${isPro ? "text-white/40" : "text-gray-400"}`}>/mes</span>
                    </>
                  ) : (
                    <>
                      <span className={`text-3xl font-extrabold ${isPro ? "text-white" : "text-gray-900"}`}>{plan.monthly.price}</span>
                      <span className={`text-sm mb-1 ${isPro ? "text-white/40" : "text-gray-400"}`}>/mes</span>
                    </>
                  )}
                </div>
                {isAnnual && (
                  <p className={`text-xs mb-4 ${isPro ? "text-white/50" : "text-gray-400"}`}>
                    {plan.annual.price}/año · 2 meses gratis
                  </p>
                )}
                {!isAnnual && <div className="mb-4" />}
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f) => (
                    <li key={f} className={`flex items-center gap-2 text-sm ${isPro ? "text-white/70" : "text-gray-600"}`}>
                      <svg className={`w-4 h-4 flex-shrink-0 ${isPro ? "text-blue-400" : "text-green-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                {annualDisabled ? (
                  <p className={`text-xs text-center ${isPro ? "text-white/40" : "text-gray-400"}`}>
                    Plan anual próximamente
                  </p>
                ) : (
                  <button
                    onClick={() => !isCurrent && handleCheckout(priceId, plan.name, isAnnual ? parseInt(plan.annual.price.replace("$","")) : parseInt(plan.monthly.price.replace("$","")))}
                    disabled={isCurrent || checkoutLoading === priceId}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition disabled:opacity-60 ${
                      isCurrent
                        ? "bg-gray-100 text-gray-400 cursor-default"
                        : isPro
                        ? "bg-gradient-to-r from-blue-500 to-violet-500 text-white hover:opacity-90 shadow-lg shadow-blue-900/30"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {checkoutLoading === priceId ? "Redirigiendo..." : isCurrent ? "Plan actual" : `Suscribirse a ${plan.name}`}
                  </button>
                )}
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
            { name: "Personalización Avanzada", price: "$49", priceId: "price_1T8ehkRap0JkQNsmtky7j7ZL", desc: "Diseño y configuración personalizada de tu bot" },
            { name: "Automatizaciones Avanzadas", price: "$79", priceId: "price_1T8f2CRap0JkQNsmyzuyUvU4", desc: "Flujos complejos y automatizaciones a medida" },
            { name: "Integración Sistemas Externos", price: "$99", priceId: "price_1T8eyARap0JkQNsmWVnTTioZ", desc: "Conecta tu bot con CRM, ERP u otros sistemas" },
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
