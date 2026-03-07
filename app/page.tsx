import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
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
            <a href="#features" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Características</a>
            <a href="#pricing" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">Precios</a>
            <a href="#faq" className="text-sm font-medium text-gray-500 hover:text-gray-900 transition">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-4 py-2">
              Iniciar sesión
            </a>
            <a
              href="/auth/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-semibold rounded-full hover:opacity-90 transition shadow-sm"
            >
              Empezar gratis →
            </a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#041414] pt-20">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2CC5C5]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#F5A623]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2CC5C5]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Text */}
          <div>
            {/* Social proof badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/70 text-xs font-medium px-4 py-2 rounded-full mb-8 backdrop-blur-sm">
              <span className="text-yellow-400">★★★★★</span>
              <span>Más de 500 negocios confían en NexoBot</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
              Automatiza tus ventas y atención al cliente con{" "}
              <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">
                NexoBot
              </span>
            </h1>

            <p className="mt-6 text-lg text-white/60 max-w-xl leading-relaxed">
              Tu asistente con IA que responde clientes, genera ventas y trabaja por ti 24/7.
              Ahorra tiempo, aumenta ingresos y escala sin esfuerzo.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/auth/signup"
                className="px-8 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-full font-semibold shadow-lg shadow-[#0A5555]/40 hover:opacity-90 hover:scale-105 transition-all"
              >
                Empezar gratis →
              </a>
              <a
                href="#features"
                className="px-8 py-4 border border-white/10 text-white/80 rounded-full font-medium hover:bg-white/5 transition-all"
              >
                Ver cómo funciona
              </a>
            </div>

            <p className="mt-4 text-sm text-white/30">Sin tarjeta de crédito · Cancela cuando quieras</p>

            {/* Stats */}
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
              <div>
                <p className="text-3xl font-black text-white">500+</p>
                <p className="text-sm text-white/40 mt-1">Negocios activos</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">24/7</p>
                <p className="text-sm text-white/40 mt-1">Disponibilidad</p>
              </div>
              <div>
                <p className="text-3xl font-black text-white">40%</p>
                <p className="text-sm text-white/40 mt-1">+ Ventas promedio</p>
              </div>
            </div>
          </div>

          {/* Right: Chat mockup */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-80">
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-5 shadow-2xl shadow-[#0A5555]/30">
                {/* Chat header */}
                <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">N</div>
                  <div>
                    <p className="text-white text-sm font-semibold">NexoBot</p>
                    <p className="text-green-400 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block"></span>
                      En línea ahora
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="py-4 space-y-3">
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 text-white/80 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[190px] leading-relaxed">
                      ¡Hola! ¿En qué puedo ayudarte hoy? 👋
                    </div>
                  </div>

                  <div className="flex gap-2 items-end justify-end">
                    <div className="bg-[#F5A623] text-white text-xs rounded-2xl rounded-br-sm px-3 py-2.5 max-w-[190px]">
                      Quiero info sobre sus planes
                    </div>
                  </div>

                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 text-white/80 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 max-w-[190px] leading-relaxed">
                      ¡Claro! Tenemos 3 planes desde $29/mes. ¿Cuál se adapta a tu negocio? 🚀
                    </div>
                  </div>

                  {/* Typing indicator */}
                  <div className="flex gap-2 items-end">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">N</div>
                    <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Input bar */}
                <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2.5 border border-white/10">
                  <input disabled placeholder="Escribe un mensaje..." className="flex-1 bg-transparent text-white/40 text-xs outline-none" />
                  <button className="w-7 h-7 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">→</button>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-6 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-900/30">
                ✓ Respondido en 1s
              </div>
              <div className="absolute -bottom-4 -left-6 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                🔥 +40% ventas
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="py-10 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-widest mb-6">Compatible con tus herramientas favoritas</p>
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
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Características</span>
            <h2 className="mt-3 text-4xl font-black">Todo lo que necesitas para automatizar</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto leading-relaxed">
              NexoBot combina IA, automatización y multicanalidad para atender más clientes y vender más sin esfuerzo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "⚡", title: "Responde en segundos", desc: "Tu bot atiende automáticamente 24/7, sin retrasos ni tiempos de espera.", gradient: "from-[#EEF9F9] to-[#D9F5F5]", iconBg: "bg-[#D9F5F5] text-[#2CC5C5]" },
              { icon: "💬", title: "Conecta tus canales", desc: "WhatsApp, web, redes sociales o CRM. NexoBot se integra fácilmente con tu ecosistema.", gradient: "from-[#FEF3DC] to-[#FEE8B8]", iconBg: "bg-[#FEE8B8] text-[#F5A623]" },
              { icon: "🚀", title: "Genera más ventas", desc: "Flujos inteligentes, embudos automatizados y segmentación para convertir más clientes.", gradient: "from-emerald-50 to-teal-50", iconBg: "bg-emerald-100 text-emerald-600" },
            ].map((f) => (
              <div key={f.title} className={`rounded-2xl p-8 bg-gradient-to-br ${f.gradient} border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300`}>
                <div className={`w-12 h-12 rounded-xl ${f.iconBg} flex items-center justify-center text-2xl mb-5`}>{f.icon}</div>
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
          <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Proceso</span>
          <h2 className="mt-3 text-4xl font-black">Listo en 3 pasos</h2>
          <p className="mt-4 text-gray-500">Configura tu asistente inteligente en minutos y empieza a vender.</p>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Configura tu bot", desc: "Personaliza respuestas, define el tono de tu marca y ajusta la lógica del asistente según tus necesidades." },
              { step: "02", title: "Conéctalo a tus canales", desc: "WhatsApp, web, redes sociales o CRM. NexoBot centraliza toda tu comunicación en un solo lugar." },
              { step: "03", title: "Automatiza y escala", desc: "Tu bot atiende clientes, captura leads y genera ventas automáticamente sin que tengas que intervenir." },
            ].map((s) => (
              <div key={s.step} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="text-5xl font-black bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent mb-5">{s.step}</div>
                <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Precios</span>
            <h2 className="mt-3 text-4xl font-black">Planes diseñados para crecer contigo</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">Elige el plan ideal para tu negocio y empieza a automatizar ventas y atención al cliente.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-start">

            {/* Starter */}
            <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold">Starter</h3>
              <p className="text-gray-500 text-sm mt-1">Ideal para emprendedores comenzando</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-black">$29</span>
                <span className="text-gray-400 text-sm mb-2">/mes</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {["Respuestas automáticas con IA", "Chat embebido para tu web", "Plantillas de mensajes", "Atención 24/7 sin esfuerzo", "Captura básica de leads", "Panel de control intuitivo"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-[#2CC5C5] font-bold">✓</span>{f}</li>
                ))}
                {["WhatsApp no incluido", "Sin automatizaciones avanzadas"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-300"><span>✗</span>{f}</li>
                ))}
              </ul>
              <a href="/checkout?priceId=price_1T18BGRap0JkQNsmaUVhyNFr"
                className="mt-8 block text-center px-6 py-3 border-2 border-[#2CC5C5] text-[#2CC5C5] rounded-xl font-semibold hover:bg-[#2CC5C5] hover:text-white transition-all">
                Elegir Starter
              </a>
            </div>

            {/* Pro - Featured */}
            <div className="rounded-2xl p-8 relative bg-gradient-to-b from-[#041414] to-[#062828] text-white shadow-2xl shadow-[#0A5555]/40 -translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-xs font-bold px-5 py-1.5 rounded-full shadow-lg">
                ⭐ MÁS POPULAR
              </div>
              <h3 className="text-xl font-bold text-white">Pro</h3>
              <p className="text-white/50 text-sm mt-1">Para negocios que quieren escalar</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-black text-white">$59</span>
                <span className="text-white/40 text-sm mb-2">/mes</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {["Todo lo del Starter", "Integración con WhatsApp", "Flujos inteligentes de ventas", "Segmentación avanzada de clientes", "Captura avanzada de leads", "Integración con redes sociales", "Respuestas basadas en intención", "Automatizaciones personalizadas"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-white/80"><span className="text-[#2CC5C5] font-bold">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/checkout?priceId=price_1T15gVRap0JkQNsm59vukMuR"
                className="mt-8 block text-center px-6 py-3 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#0A5555]/40">
                Elegir Pro
              </a>
            </div>

            {/* Premium */}
            <div className="rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
              <h3 className="text-xl font-bold">Premium</h3>
              <p className="text-gray-500 text-sm mt-1">Para empresas que necesitan máxima potencia</p>
              <div className="mt-6 flex items-end gap-1">
                <span className="text-5xl font-black">$99</span>
                <span className="text-gray-400 text-sm mb-2">/mes</span>
              </div>
              <ul className="mt-8 space-y-3 text-sm">
                {["Todo lo del Pro", "Mensajes ilimitados", "Embudo de ventas automático", "Integraciones avanzadas", "Soporte prioritario", "Configuración asistida", "Automatizaciones premium"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-[#2CC5C5] font-bold">✓</span>{f}</li>
                ))}
              </ul>
              <a href="/checkout?priceId=price_1T15jDRap0JkQNsmQRvEkpcm"
                className="mt-8 block text-center px-6 py-3 border-2 border-[#2CC5C5] text-[#2CC5C5] rounded-xl font-semibold hover:bg-[#2CC5C5] hover:text-white transition-all">
                Elegir Premium
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── ADDITIONAL SERVICES ── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Servicios adicionales</span>
            <h2 className="mt-3 text-4xl font-black">Lleva tu NexoBot al siguiente nivel</h2>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">Configuraciones profesionales, personalización avanzada e integraciones a medida. Pago único.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Personalización avanzada", desc: "Haz que tu bot hable como tu marca", price: "$99", features: ["Ajustes personalizados", "Respuestas adaptadas a tu negocio", "Optimización del flujo conversacional"], priceId: "price_1T161uRap0JkQNsm3BJZGOEu" },
              { title: "Automatizaciones avanzadas", desc: "Convierte tu bot en una máquina de ventas", price: "$149", features: ["Flujos inteligentes personalizados", "Segmentación avanzada", "Embudos automatizados"], priceId: "price_1T163sRap0JkQNsmOrHBQuJp" },
              { title: "Integración sistemas externos", desc: "Conecta tu bot con tu ecosistema", price: "$199", features: ["Integración con CRM", "Conexión con APIs externas", "Sincronización de datos"], priceId: "price_1T166cRap0JkQNsmuPTOPBBu" },
            ].map(s => (
              <div key={s.title} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 duration-300">
                <div className="inline-block bg-[#EEF9F9] text-[#2CC5C5] text-xs font-bold px-3 py-1 rounded-full mb-5">Pago único</div>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="text-gray-500 text-sm mt-1">{s.desc}</p>
                <p className="mt-5 text-4xl font-black">{s.price}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {s.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-gray-600"><span className="text-[#2CC5C5] font-bold">✓</span>{f}</li>
                  ))}
                </ul>
                <a href={`/checkout?priceId=${s.priceId}`}
                  className="mt-8 block text-center px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all">
                  Comprar ahora
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
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">Testimonios</span>
            <h2 className="mt-3 text-4xl font-black">Lo que dicen nuestros clientes</h2>
            <p className="mt-4 text-gray-500">Negocios reales, resultados reales.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "María López", role: "Tienda online de accesorios", quote: "NexoBot responde a mis clientes incluso cuando estoy durmiendo. En el primer mes mis ventas subieron un 40% sin invertir más tiempo.", initials: "ML", color: "from-pink-500 to-rose-500" },
              { name: "Carlos Fernández", role: "Servicios profesionales", quote: "La integración con WhatsApp fue rapidísima. Ahora tengo un flujo de ventas automatizado que atiende a todos mis prospectos sin que yo esté encima.", initials: "CF", color: "from-[#2CC5C5] to-[#23A5A5]" },
              { name: "Ana Rodríguez", role: "Emprendedora digital", quote: "El soporte es excelente. Me ayudaron a personalizar mi bot y ahora atiende más de 300 consultas al día sin perder calidad.", initials: "AR", color: "from-[#F5A623] to-[#E09018]" },
            ].map(t => (
              <div key={t.name} className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 duration-300">
                <div className="flex gap-0.5 text-yellow-400 text-sm mb-5">★★★★★</div>
                <p className="text-gray-700 italic leading-relaxed text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>{t.initials}</div>
                  <div>
                    <p className="font-semibold text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
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
            <span className="text-sm font-bold text-[#2CC5C5] uppercase tracking-widest">FAQ</span>
            <h2 className="mt-3 text-4xl font-black">Preguntas frecuentes</h2>
            <p className="mt-4 text-gray-500">Resolvemos tus dudas para que empieces con total confianza.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "¿Necesito conocimientos técnicos para usar NexoBot?", a: "No. NexoBot está diseñado para que cualquier persona pueda configurarlo en minutos sin conocimientos técnicos." },
              { q: "¿Puedo usar NexoBot en WhatsApp?", a: "Sí. Los planes Pro y Premium incluyen integración con WhatsApp para automatizar tus conversaciones y ventas." },
              { q: "¿Qué pasa si supero el límite de mensajes?", a: "Te avisaremos antes de llegar al límite. Puedes actualizar tu plan en cualquier momento sin interrupciones." },
              { q: "¿Puedo cancelar cuando quiera?", a: "Sí. Sin contratos ni permanencias. Puedes cancelar tu suscripción cuando quieras desde tu panel de control." },
              { q: "¿Ofrecen soporte?", a: "Todos los planes incluyen soporte. El plan Premium cuenta con soporte prioritario para respuestas más rápidas." },
              { q: "¿Puedo integrar NexoBot con mi sitio web?", a: "Sí. Todos los planes incluyen un widget fácil de instalar para conectar NexoBot con tu sitio web en minutos." },
            ].map(f => (
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
            Automatiza tu negocio hoy<br />
            <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">
              con NexoBot
            </span>
          </h2>
          <p className="mt-6 text-white/50 max-w-xl mx-auto leading-relaxed">
            Responde clientes, genera ventas y escala tu negocio 24/7 con tu asistente inteligente.
          </p>
          <a
            href="/auth/signup"
            className="inline-block mt-10 px-12 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white font-semibold rounded-full shadow-lg shadow-[#0A5555]/40 hover:opacity-90 hover:scale-105 transition-all text-lg"
          >
            Empezar gratis →
          </a>
          <p className="mt-4 text-white/30 text-sm">Sin tarjeta de crédito · Cancela cuando quieras</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#020D0D] py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xl font-black bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent">NexoBot</p>
            <p className="text-sm text-white/20 mt-1">© {new Date().getFullYear()} NexoBot — Todos los derechos reservados.</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/30">
            <a href="#pricing" className="hover:text-white/70 transition">Precios</a>
            <a href="#faq" className="hover:text-white/70 transition">FAQ</a>
            <a href="#features" className="hover:text-white/70 transition">Características</a>
            <a href="/auth/login" className="hover:text-white/70 transition">Iniciar sesión</a>
            <a href="/privacy" className="hover:text-white/70 transition">Privacidad</a>
            <a href="/terms" className="hover:text-white/70 transition">Términos</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
