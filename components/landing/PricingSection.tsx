"use client";

import { useState } from "react";
import { PLAN_PRICES } from "@/lib/plans";
import type { LandingT } from "@/lib/i18n/landing";

type PricingT = LandingT["pricingSection"];

interface Props {
  t: PricingT;
}

// índice 0 = Free (sin Stripe), 1 = Starter, 2 = Pro (featured), 3 = Business
const PLAN_STRIPE = [
  null, // Free — sin checkout
  {
    monthly: { priceId: PLAN_PRICES.Starter.monthly.stripe_price_id },
    annual:  { priceId: PLAN_PRICES.Starter.annual.stripe_price_id },
  },
  {
    monthly: { priceId: PLAN_PRICES.Pro.monthly.stripe_price_id },
    annual:  { priceId: PLAN_PRICES.Pro.annual.stripe_price_id },
  },
  {
    monthly: { priceId: PLAN_PRICES.Premium.monthly.stripe_price_id },
    annual:  { priceId: PLAN_PRICES.Premium.annual.stripe_price_id },
  },
];

const PLAN_PRICES_DISPLAY = [
  null,                                                              // Free
  { monthly: "$19", annual: "$182", monthlyEquiv: "$15" },          // Starter
  { monthly: "$39", annual: "$374", monthlyEquiv: "$31" },          // Pro
  { monthly: "$79", annual: "$778", monthlyEquiv: "$65" },          // Premium
];

const PLAN_NAMES = ["Free", "Starter", "Pro", "Premium"];

// índice del plan destacado (Pro)
const FEATURED_INDEX = 2;

export default function PricingSection({ t }: Props) {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.label}</span>
          <h2 className="mt-3 text-4xl font-black">{t.title}</h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Toggle mensual / anual */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={`text-sm font-medium ${!isAnnual ? "text-gray-900" : "text-gray-400"}`}>{t.monthly}</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className={`relative w-12 h-6 rounded-full transition-colors ${isAnnual ? "bg-[#2CC5C5]" : "bg-gray-200"}`}
            aria-label={`${t.monthly} / ${t.annual}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
          </button>
          <span className={`text-sm font-medium ${isAnnual ? "text-gray-900" : "text-gray-400"}`}>
            {t.annual}
            <span className="ml-2 text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{t.saveBadge}</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 items-start">
          {t.plans.map((plan, i) => {
            const stripe  = PLAN_STRIPE[i];
            const prices  = PLAN_PRICES_DISPLAY[i];
            const isFree  = stripe === null;
            const isFeatured = i === FEATURED_INDEX;

            const priceId = !isFree
              ? (isAnnual ? stripe!.annual.priceId : stripe!.monthly.priceId)
              : null;
            const annualDisabled = isAnnual && priceId === "";

            // ── Plan Free ──────────────────────────────────────────────────
            if (isFree) {
              return (
                <div key={PLAN_NAMES[i]} className="rounded-2xl border border-gray-200 p-7 hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold text-gray-900">{PLAN_NAMES[i]}</h3>
                  <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                  <div className="mt-6 flex items-end gap-1">
                    <span className="text-5xl font-black text-gray-900">$0</span>
                    <span className="text-gray-400 text-sm mb-2">{t.perMonth}</span>
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
                  <a
                    href="/auth/signup"
                    className="mt-8 block text-center px-6 py-3 border-2 border-gray-200 text-gray-600 rounded-xl font-semibold hover:border-[#2CC5C5] hover:text-[#2CC5C5] transition-all"
                  >
                    {plan.cta}
                  </a>
                </div>
              );
            }

            // ── Plan destacado (Pro) ────────────────────────────────────────
            if (isFeatured) {
              return (
                <div key={PLAN_NAMES[i]} className="rounded-2xl p-7 relative bg-gradient-to-b from-[#041414] to-[#062828] text-white shadow-2xl shadow-[#0A5555]/40 -translate-y-4">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                    {t.mostPopular}
                  </div>
                  <h3 className="text-xl font-bold text-white">{PLAN_NAMES[i]}</h3>
                  <p className="text-white/50 text-sm mt-1">{plan.desc}</p>
                  <div className="mt-6">
                    <div className="flex items-end gap-1">
                      <span className="text-5xl font-black text-white">
                        {isAnnual ? prices!.monthlyEquiv : prices!.monthly}
                      </span>
                      <span className="text-white/40 text-sm mb-2">{t.perMonth}</span>
                    </div>
                    {isAnnual && (
                      <p className="text-white/40 text-xs mt-1">{prices!.annual}{t.perYear}</p>
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
                    <p className="mt-8 text-center text-white/40 text-sm">{t.comingSoon}</p>
                  ) : (
                    <a
                      href={`/checkout?priceId=${priceId}`}
                      className="mt-8 block text-center px-6 py-3 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#0A5555]/40"
                    >
                      {plan.cta}
                    </a>
                  )}
                </div>
              );
            }

            // ── Planes estándar (Starter y Business) ──────────────────────
            return (
              <div key={PLAN_NAMES[i]} className="rounded-2xl border border-gray-200 p-7 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <h3 className="text-xl font-bold">{PLAN_NAMES[i]}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.desc}</p>
                <div className="mt-6">
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black">
                      {isAnnual ? prices!.monthlyEquiv : prices!.monthly}
                    </span>
                    <span className="text-gray-400 text-sm mb-2">{t.perMonth}</span>
                  </div>
                  {isAnnual && (
                    <p className="text-gray-400 text-xs mt-1">{prices!.annual}{t.perYear}</p>
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
                  <p className="mt-8 text-center text-gray-400 text-sm">{t.comingSoon}</p>
                ) : (
                  <a
                    href={`/checkout?priceId=${priceId}`}
                    className="mt-8 block text-center px-6 py-3 border-2 border-[#2CC5C5] text-[#2CC5C5] rounded-xl font-semibold hover:bg-[#2CC5C5] hover:text-white transition-all"
                  >
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
