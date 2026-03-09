"use client";

import { useState } from "react";
import { PLAN_PRICES } from "@/lib/plans";

const PLANS = [
  {
    name: "Starter",
    desc: "Ideal para emprendedores comenzando",
    monthly:  { price: "$14",  priceId: PLAN_PRICES.Starter.monthly.stripe_price_id },
    annual:   { price: "$134", monthlyEquiv: "$11", priceId: PLAN_PRICES.Starter.annual.stripe_price_id },
    features: ["Respuestas automáticas con IA", "Chat embebido para tu web", "Plantillas de mensajes", "Atención 24/7 sin esfuerzo", "Captura básica de leads", "Panel de control intuitivo"],
    excluded: ["WhatsApp no incluido", "Sin automatizaciones avanzadas"],
    cta: "Elegir Starter",
    featured: false,
  },
  {
    name: "Pro",
    desc: "Para negocios que quieren escalar",
    monthly:  { price: "$29",  priceId: PLAN_PRICES.Pro.monthly.stripe_price_id },
    annual:   { price: "$278", monthlyEquiv: "$23", priceId: PLAN_PRICES.Pro.annual.stripe_price_id },
    features: ["Todo lo del Starter", "Integración con WhatsApp", "Flujos inteligentes de ventas", "Segmentación avanzada de clientes", "Captura avanzada de leads", "Integración con redes sociales", "Respuestas basadas en intención", "Automatizaciones personalizadas"],
    excluded: [],
    cta: "Elegir Pro",
    featured: true,
  },
  {
    name: "Premium",
    desc: "Para empresas que necesitan máxima potencia",
    monthly:  { price: "$49",  priceId: PLAN_PRICES.Premium.monthly.stripe_price_id },
    annual:   { price: "$470", monthlyEquiv: "$39", priceId: PLAN_PRICES.Premium.annual.stripe_price_id },
    features: ["Todo lo del Pro", "Mensajes ilimitados", "Embudo de ventas automático", "Integraciones avanzadas", "Soporte prioritario", "Configuración asistida", "Automatizaciones premium"],
    excluded: [],
    cta: "Elegir Premium",
    featured: false,
  },
];

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Precios</span>
          <h2 className="mt-3 text-4xl font-black">Planes diseñados para crecer contigo</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">Elige el plan ideal para tu negocio y empieza a automatizar ventas y atención al cliente.</p>
        </div>

        {/* Toggle mensual / anual */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>Mensual</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-[#2CC5C5]" : "bg-gray-200"}`}
            aria-label="Cambiar entre facturación mensual y anual"
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
            Anual
            <span className="ml-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">2 meses gratis</span>
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-start">
          {PLANS.map((plan) => {
            const pricing = isAnnual ? plan.annual : plan.monthly;
            const priceId = pricing.priceId;
            const annualDisabled = isAnnual && !priceId;
            const href = annualDisabled ? "#pricing" : `/checkout?priceId=${priceId}`;

            if (plan.featured) {
              return (
                <div key={plan.name} className="rounded-2xl p-8 relative bg-gradient-to-b from-[#041414] to-[#062828] text-white shadow-2xl shadow-[#0A5555]/40 -translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                    ⭐ MÁS POPULAR
                  </div>
                  <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                  <p className="text-white/50 text-sm mt-1">{plan.desc}</p>
                  <div className="mt-6">
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-black text-white">
                        {isAnnual ? plan.annual.monthlyEquiv : plan.monthly.price}
                      </span>
                      <span className="text-white/40 text-sm mb-2">/mes</span>
                    </div>
                    {isAnnual && (
                      <p className="text-white/40 text-xs mt-1">{plan.annual.price}/año · 2 meses gratis</p>
                    )}
                  </div>
                  <ul className="mt-8 space-y-3 text-sm">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-white/80">
                        <span className="text-[#2CC5C5] font-bold">✓</span>{f}
                      </li>
                    ))}
                  </ul>
                  {annualDisabled ? (
                    <p className="mt-8 text-center text-white/40 text-sm">Plan anual próximamente</p>
                  ) : (
                    <a href={href}
                      className="mt-8 block text-center px-6 py-3 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#0A5555]/40">
                      {plan.cta}
                    </a>
                  )}
                </div>
              );
            }

            return (
              <div key={plan.name} className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                <div className="mt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">
                      {isAnnual ? plan.annual.monthlyEquiv : plan.monthly.price}
                    </span>
                    <span className="text-gray-400 text-sm mb-2">/mes</span>
                  </div>
                  {isAnnual && (
                    <p className="text-gray-400 text-xs mt-1">{plan.annual.price}/año · 2 meses gratis</p>
                  )}
                </div>
                <ul className="mt-8 space-y-3 text-sm">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-600">
                      <span className="text-[#2CC5C5] font-bold">✓</span>{f}
                    </li>
                  ))}
                  {plan.excluded.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-300">
                      <span>✗</span>{f}
                    </li>
                  ))}
                </ul>
                {annualDisabled ? (
                  <p className="mt-8 text-center text-gray-400 text-sm">Plan anual próximamente</p>
                ) : (
                  <a href={href}
                    className="mt-8 block text-center px-6 py-3 border-2 border-[#2CC5C5] text-[#2CC5C5] rounded-xl font-semibold hover:bg-[#2CC5C5] hover:text-white transition-all">
                    {plan.cta}
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
