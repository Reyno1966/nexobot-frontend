import Link from "next/link";
import Image from "next/image";

export default function HomeEN() {
  return (
    <main className="min-h-screen bg-[#041414] text-white overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#041414]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/en" className="flex items-center">
            <Image
              src="/nexobot-logo.png"
              alt="NexoBot"
              width={130}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-white/50 hover:text-white transition">Features</a>
            <a href="#pricing" className="text-sm font-medium text-white/50 hover:text-white transition">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-white/50 hover:text-white transition">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/login" className="text-sm font-medium text-white/60 hover:text-white transition px-4 py-2">
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-semibold rounded-full hover:opacity-90 transition shadow-sm"
            >
              Get started free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2CC5C5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2CC5C5]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
            <span className="text-yellow-400">★★★★★</span>
            <span>500+ businesses trust NexoBot</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-6">
            Automate your sales and customer support with{" "}
            <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">
              NexoBot
            </span>
          </h1>

          <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            Your intelligent assistant that replies to customers, generates sales, and works for you 24/7.
            Save time, increase revenue, and scale your business effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="px-10 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-full font-bold text-base hover:opacity-90 hover:scale-105 transition-all shadow-xl shadow-[#2CC5C5]/20"
            >
              Get started free →
            </Link>
            <a
              href="#features"
              className="px-10 py-4 border border-white/10 text-white/70 rounded-full font-semibold text-base hover:bg-white/5 transition-all"
            >
              See how it works
            </a>
          </div>
          <p className="mt-5 text-sm text-white/30">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 bg-[#041414]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Everything you need to automate your business</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-16">
            NexoBot combines AI, automation, and multichannel communication so you can serve more customers and close more sales — effortlessly.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Instant responses", desc: "Your bot replies automatically 24/7 with no delays or waiting times." },
              { icon: "💬", title: "All your channels", desc: "Website, WhatsApp, or social media. NexoBot integrates seamlessly with your ecosystem." },
              { icon: "🚀", title: "Boost your sales", desc: "Smart flows, automated funnels, and segmentation to convert more customers." },
            ].map((f) => (
              <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">How NexoBot Works</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-16">Set up your intelligent assistant in minutes and let it automate sales, support, and lead generation 24/7.</p>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { num: "①", title: "Set up your bot", desc: "Customize responses, define your brand tone, and configure your assistant in minutes." },
              { num: "②", title: "Connect your channels", desc: "Website, WhatsApp, or CRM — NexoBot centralizes all your communication." },
              { num: "③", title: "Automate & scale", desc: "Your bot handles customers, captures leads, and generates sales automatically." },
            ].map((s) => (
              <div key={s.title} className="text-center">
                <div className="w-14 h-14 bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl font-black text-white">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-[#041414]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">Plans designed to grow with you</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-16">
            Choose the ideal plan for your business and start automating sales, support, and lead generation.
          </p>
          <div className="grid md:grid-cols-3 gap-8">

            {/* Starter */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition">
              <h3 className="text-xl font-bold text-white mb-1">Starter</h3>
              <p className="text-white/40 text-sm mb-6">Perfect for entrepreneurs just starting out</p>
              <p className="text-4xl font-black text-white mb-8">$14<span className="text-lg text-white/40 font-normal">/mo</span></p>
              <ul className="space-y-3 text-white/60 text-sm text-left mb-8">
                <li>✓ AI automated responses</li>
                <li>✓ Website chat widget</li>
                <li>✓ 5,000 messages/month</li>
                <li>✓ 24/7 customer handling</li>
                <li>✓ Basic lead capture</li>
                <li>✓ Analytics dashboard</li>
              </ul>
              <a href="/checkout?priceId=price_1T8eHgRap0JkQNsmxXKjK3IH"
                className="block w-full py-3 border border-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/5 transition">
                Choose Starter
              </a>
            </div>

            {/* Pro — highlighted */}
            <div className="bg-gradient-to-b from-[#2CC5C5]/15 to-[#F5A623]/10 border-2 border-[#2CC5C5]/50 rounded-2xl p-8 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-xs font-black px-4 py-1 rounded-full">
                MOST POPULAR
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Pro</h3>
              <p className="text-white/40 text-sm mb-6">Ideal for growing businesses</p>
              <p className="text-4xl font-black text-white mb-8">$29<span className="text-lg text-white/40 font-normal">/mo</span></p>
              <ul className="space-y-3 text-white/60 text-sm text-left mb-8">
                <li>✓ Everything in Starter</li>
                <li>✓ WhatsApp integration</li>
                <li>✓ 20,000 messages/month</li>
                <li>✓ Smart sales flows</li>
                <li>✓ Advanced segmentation</li>
                <li>✓ Custom automations</li>
              </ul>
              <a href="/checkout?priceId=price_1T8eNZRap0JkQNsmeObpDc8j"
                className="block w-full py-3 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-bold text-sm hover:opacity-90 transition">
                Choose Pro
              </a>
            </div>

            {/* Premium */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/8 transition">
              <h3 className="text-xl font-bold text-white mb-1">Premium</h3>
              <p className="text-white/40 text-sm mb-6">For businesses that need maximum power</p>
              <p className="text-4xl font-black text-white mb-8">$49<span className="text-lg text-white/40 font-normal">/mo</span></p>
              <ul className="space-y-3 text-white/60 text-sm text-left mb-8">
                <li>✓ Everything in Pro</li>
                <li>✓ Unlimited messages</li>
                <li>✓ Automated sales funnel</li>
                <li>✓ Advanced integrations</li>
                <li>✓ Priority support</li>
                <li>✓ Assisted setup</li>
              </ul>
              <a href="/checkout?priceId=price_1T8eRdRap0JkQNsmllSsPbVs"
                className="block w-full py-3 border border-white/20 text-white rounded-xl font-semibold text-sm hover:bg-white/5 transition">
                Choose Premium
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section id="testimonials" className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-black text-white mb-4">What our customers say</h2>
          <p className="text-white/50 max-w-2xl mx-auto mb-16">Real businesses using NexoBot to automate sales, save time, and serve customers 24/7.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { quote: "NexoBot replies to my customers even while I sleep. My sales increased 40% in the first month.", name: "Maria Lopez", role: "Online accessories store" },
              { quote: "WhatsApp integration was super fast. Now I have a fully automated sales flow handling all my prospects.", name: "Carlos Fernandez", role: "Professional services" },
              { quote: "The support is excellent. They helped me customize my bot, and now it handles over 300 daily inquiries flawlessly.", name: "Ana Rodriguez", role: "Digital entrepreneur" },
            ].map((t) => (
              <div key={t.name} className="bg-white/5 border border-white/10 rounded-2xl p-7 text-left">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-[#F5A623] text-sm">★</span>)}
                </div>
                <p className="text-white/70 text-sm leading-relaxed italic mb-5">&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-24 bg-[#041414]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl font-black text-white text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-white/50 text-center mb-16">Everything you need to start with full clarity and confidence.</p>
          <div className="space-y-6">
            {[
              { q: "Do I need technical skills to use NexoBot?", a: "No. NexoBot is designed so anyone can set it up in minutes. If you prefer, we also offer setup services." },
              { q: "Can I use NexoBot on WhatsApp?", a: "Yes. WhatsApp integration is included in the Pro and Premium plans." },
              { q: "What happens if I exceed my message limit?", a: "We'll notify you before you reach the limit, and you can upgrade your plan anytime without interruption." },
              { q: "Can I cancel anytime?", a: "Yes. No contracts or commitments. Cancel your subscription anytime from your dashboard." },
              { q: "Do you offer support?", a: "Yes. All plans include support, and the Premium plan includes priority support for faster responses." },
              { q: "Can I integrate NexoBot with my website?", a: "Yes. All plans include a simple widget you can install on any website in minutes." },
            ].map((item) => (
              <div key={item.q} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-white font-semibold mb-2">{item.q}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2CC5C5]/20 to-[#F5A623]/20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#2CC5C5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl font-black text-white leading-tight mb-6">
            Automate your business today with NexoBot
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
            Serve customers, generate sales, and scale your business 24/7 with your intelligent assistant.
          </p>
          <Link
            href="/auth/signup"
            className="inline-block px-12 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white font-bold rounded-full text-lg hover:opacity-90 hover:scale-105 transition-all shadow-2xl shadow-[#2CC5C5]/30"
          >
            Get started free →
          </Link>
          <p className="mt-4 text-white/30 text-sm">No credit card required · Cancel anytime</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <Image src="/nexobot-logo.png" alt="NexoBot" width={110} height={34} className="h-8 w-auto object-contain mb-1" />
            <p className="text-white/30 text-xs">© {new Date().getFullYear()} NexoBot — All rights reserved.</p>
          </div>
          <div className="flex gap-6 text-sm text-white/40">
            <a href="#pricing" className="hover:text-white transition">Pricing</a>
            <a href="#faq" className="hover:text-white transition">FAQ</a>
            <a href="#features" className="hover:text-white transition">Features</a>
            <Link href="/auth/login" className="hover:text-white transition">Sign in</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
