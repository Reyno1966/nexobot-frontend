import Image from "next/image";
import DemoChat from "@/components/landing/DemoChat";
import PricingSection from "@/components/landing/PricingSection";
import type { LandingT } from "@/lib/i18n/landing";

const DEMO_BULLET_ICONS = ["⚡", "🧠", "🎨", "📲"] as const;
const SERVICE_PRICE_IDS = [
  "price_1T8ehkRap0JkQNsmtky7j7ZL",
  "price_1T8f2CRap0JkQNsmyzuyUvU4",
  "price_1T8eyARap0JkQNsmWVnTTioZ",
];
const SERVICE_PRICES = ["$49", "$79", "$99"];
const FEATURE_META = [
  { icon: "⚡", gradient: "from-[#EEF9F9] to-[#D9F5F5]", iconBg: "bg-[#D9F5F5] text-[#2CC5C5]" },
  { icon: "💬", gradient: "from-[#FEF3DC] to-[#FEE8B8]", iconBg: "bg-[#FEE8B8] text-[#F5A623]" },
  { icon: "🚀", gradient: "from-emerald-50 to-teal-50",   iconBg: "bg-emerald-100 text-emerald-600" },
];
const TESTIMONIAL_COLORS = [
  "from-pink-500 to-rose-500",
  "from-[#2CC5C5] to-[#23A5A5]",
  "from-[#F5A623] to-[#E09018]",
];

function initials(name: string) {
  return name.split(" ").slice(0, 2).map(n => n[0]).join("");
}

interface Props {
  t: LandingT;
  locale: string;
}

export default function LandingPage({ t, locale }: Props) {
  const logoHref = locale === "es" ? "/" : `/${locale}`;
  const year = new Date().getFullYear();
  const copyright = t.footer.copyright.replace("{year}", String(year));

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href={logoHref} className="flex items-center">
            <Image src="/nexobot-logo.png" alt="NexoBot" width={130} height={40} className="h-10 w-auto object-contain" priority />
          </a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">{t.nav.features}</a>
            <a href="#pricing"  className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">{t.nav.pricing}</a>
            <a href="#faq"      className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">{t.nav.faq}</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/auth/login"  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-4 py-2">{t.nav.login}</a>
            <a href="/auth/signup" className="px-5 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-semibold rounded-full hover:opacity-90 transition shadow-sm">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#041414] pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2CC5C5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2CC5C5]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-yellow-400">★★★★★</span>
              <span>{t.hero.badge}</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              {t.hero.h1.replace(" NexoBot", "").trimEnd()}{" "}
              <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">NexoBot</span>
            </h1>
            <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">{t.hero.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="/auth/signup" className="px-8 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-full font-semibold shadow-lg shadow-[#0A5555]/40 hover:opacity-90 hover:scale-105 transition-all">
                {t.hero.cta1}
              </a>
              <a href="#features" className="px-8 py-4 border border-white/10 text-white/80 rounded-full font-medium hover:bg-white/5 transition-all">
                {t.hero.cta2}
              </a>
            </div>
            <p className="mt-4 text-sm text-white/30">{t.hero.noCard}</p>
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
              {t.hero.stats.map(s => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-white">{s.value}</p>
                  <p className="text-sm text-white/40 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat mockup */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-80">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-[#0A5555]/30">
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">N</div>
                  <div>
                    <p className="text-white text-sm font-semibold">NexoBot</p>
                    <p className="text-green-400 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
                      {t.hero.chatOnline}
                    </p>
                  </div>
                </div>
                <div className="py-4 space-y-3">
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 text-white/80 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[190px] leading-relaxed">{t.hero.chatMsg1}</div>
                  </div>
                  <div className="flex gap-2 items-end justify-end">
                    <div className="bg-[#F5A623] text-white text-xs rounded-2xl rounded-br-sm px-3 py-2.5 max-w-[190px]">{t.hero.chatMsg2}</div>
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 text-white/80 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[190px] leading-relaxed">{t.hero.chatMsg3}</div>
                  </div>
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2.5 border border-white/10">
                  <input disabled placeholder={t.hero.chatPlaceholder} className="flex-1 bg-transparent text-white/40 text-xs outline-none" />
                  <button className="w-7 h-7 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">→</button>
                </div>
              </div>
              <div className="absolute -top-4 -right-6 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-900/30">{t.hero.chatBadge1}</div>
              <div className="absolute -bottom-4 -left-6 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">{t.hero.chatBadge2}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">{t.trust}</p>
          <div className="flex flex-wrap justify-center gap-10 items-center opacity-30 grayscale">
            <span className="text-xl font-black text-gray-800">WhatsApp</span>
            <span className="text-xl font-black text-gray-800">Instagram</span>
            <span className="text-xl font-black text-gray-800">Shopify</span>
            <span className="text-xl font-black text-gray-800">HubSpot</span>
            <span className="text-xl font-black text-gray-800">WooCommerce</span>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.features.label}</span>
            <h2 className="mt-3 text-4xl font-black">{t.features.title}</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">{t.features.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.features.items.map((f, i) => (
              <div key={f.title} className={`rounded-2xl p-8 bg-gradient-to-br ${FEATURE_META[i].gradient} border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300`}>
                <div className={`w-12 h-12 rounded-xl ${FEATURE_META[i].iconBg} flex items-center justify-center text-2xl mb-5`}>{FEATURE_META[i].icon}</div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.howItWorks.label}</span>
          <h2 className="mt-3 text-4xl font-black">{t.howItWorks.title}</h2>
          <p className="mt-4 text-gray-500">{t.howItWorks.subtitle}</p>
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {t.howItWorks.steps.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="text-5xl font-black bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent mb-5">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DEMO EN VIVO ── */}
      <section id="demo" className="py-24 bg-[#041414] relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-[#2CC5C5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.demo.label}</span>
              <h2 className="mt-3 text-4xl font-black text-white leading-tight">
                {t.demo.title}{" "}
                <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">{t.demo.titleHighlight}</span>
              </h2>
              <p className="mt-5 text-white/60 text-lg leading-relaxed">{t.demo.subtitle}</p>
              <ul className="mt-8 space-y-4">
                {t.demo.bullets.map((b, i) => (
                  <li key={b} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-base flex-shrink-0">
                      {DEMO_BULLET_ICONS[i]}
                    </span>
                    <span className="text-white/70 text-sm">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-4">
                <a href="/auth/signup" className="px-7 py-3.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-full font-semibold hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#0A5555]/40 text-sm">
                  {t.demo.cta1}
                </a>
                <a href="#pricing" className="px-7 py-3.5 border border-white/10 text-white/70 rounded-full font-medium hover:bg-white/5 transition-all text-sm">
                  {t.demo.cta2}
                </a>
              </div>
              <p className="mt-3 text-xs text-white/30">{t.demo.noCard}</p>
            </div>
            <div><DemoChat /></div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <PricingSection />

      {/* ── SERVICES ── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.services.label}</span>
            <h2 className="mt-3 text-4xl font-black">{t.services.title}</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">{t.services.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.services.items.map((s, i) => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="inline-block bg-[#EEF9F9] text-[#2CC5C5] text-xs font-bold px-3 py-1 rounded-full mb-5">{t.services.badge}</div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
                <p className="mt-5 text-4xl font-black">{SERVICE_PRICES[i]}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-600">
                      <span className="text-[#2CC5C5] font-bold">✓</span>{f}
                    </li>
                  ))}
                </ul>
                <a href={`/checkout?priceId=${SERVICE_PRICE_IDS[i]}`}
                  className="mt-8 block text-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all">
                  {t.services.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.testimonials.label}</span>
            <h2 className="mt-3 text-4xl font-black">{t.testimonials.title}</h2>
            <p className="mt-4 text-gray-500">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {t.testimonials.items.map((t2, i) => (
              <div key={t2.name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <div className="flex gap-0.5 text-yellow-400 text-sm mb-5">★★★★★</div>
                <p className="text-gray-700 italic leading-relaxed text-sm">&ldquo;{t2.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${TESTIMONIAL_COLORS[i]} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
                    {initials(t2.name)}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t2.name}</p>
                    <p className="text-gray-400 text-xs">{t2.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">{t.faq.label}</span>
            <h2 className="mt-3 text-4xl font-black">{t.faq.title}</h2>
            <p className="mt-4 text-gray-500">{t.faq.subtitle}</p>
          </div>
          <div className="space-y-4">
            {t.faq.items.map(f => (
              <div key={f.q} className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#D9F5F5] hover:shadow-sm transition-all">
                <h3 className="font-semibold text-gray-900">{f.q}</h3>
                <p className="mt-2 text-gray-500 text-sm leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-32 relative overflow-hidden bg-[#041414]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2CC5C5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white leading-tight">
            {t.cta.title}<br />
            <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">{t.cta.titleHighlight}</span>
          </h2>
          <p className="mt-6 text-white/50 max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>
          <a href="/auth/signup"
            className="inline-block mt-10 px-12 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white font-semibold rounded-full shadow-lg shadow-[#0A5555]/40 hover:opacity-90 hover:scale-105 transition-all text-lg">
            {t.cta.button}
          </a>
          <p className="mt-4 text-white/30 text-sm">{t.cta.noCard}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#020D0D] py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-black bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">NexoBot</p>
            <p className="text-sm text-white/20 mt-1">{copyright}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/30">
            <a href="#pricing"    className="hover:text-white/70 transition">{t.footer.pricing}</a>
            <a href="#faq"        className="hover:text-white/70 transition">{t.footer.faq}</a>
            <a href="#features"   className="hover:text-white/70 transition">{t.footer.features}</a>
            <a href="/auth/login" className="hover:text-white/70 transition">{t.footer.login}</a>
            <a href="/privacy"    className="hover:text-white/70 transition">{t.footer.privacy}</a>
            <a href="/terms"      className="hover:text-white/70 transition">{t.footer.terms}</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
