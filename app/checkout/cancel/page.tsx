import Link from "next/link";
import Image from "next/image";

const OBJECTIONS = [
  {
    q: "¿Es realmente necesario para mi negocio?",
    a: "El 67% de los clientes abandona si no recibe respuesta inmediata. Un bot que responde en 2 segundos convierte más que cualquier vendedor humano disponible 24/7.",
  },
  {
    q: "¿Qué pasa si quiero cancelar?",
    a: "Cancelas cuando quieras, sin penalizaciones. Tu cuenta sigue activa hasta el final del período pagado. Sin compromisos.",
  },
  {
    q: "¿Es difícil de configurar?",
    a: "En menos de 10 minutos tienes tu bot activo. No necesitas conocimientos técnicos — elige una plantilla, escribe el prompt y copia el código.",
  },
];

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-[#041414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#2CC5C5]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#F5A623]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 py-16">

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link href="/">
            <Image src="/nexobot-logo.png" alt="NexoBot" width={130} height={40} className="h-10 w-auto object-contain" />
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-7 h-7 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white mb-3">Sin problema, no se hizo ningún cargo</h1>
          <p className="text-white/50 text-lg">
            El pago fue cancelado. Tu cuenta sigue disponible cuando estés listo.
          </p>
        </div>

        {/* Starter plan highlight */}
        <div className="bg-gradient-to-r from-[#2CC5C5]/10 to-[#F5A623]/10 border border-[#2CC5C5]/30 rounded-2xl p-6 mb-10">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-[#2CC5C5] text-xs font-bold uppercase tracking-widest mb-1">Más popular para empezar</p>
              <h2 className="text-white text-xl font-bold">Plan Starter — desde $14/mes</h2>
              <p className="text-white/50 text-sm mt-1">
                Cancela cuando quieras · Sin tarjeta requerida para probar
              </p>
            </div>
            <Link
              href="/checkout?priceId=price_1T8eHgRap0JkQNsmxXKjK3IH"
              className="flex-shrink-0 px-6 py-3 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-bold text-sm hover:opacity-90 transition hover:scale-105"
            >
              Intentar de nuevo →
            </Link>
          </div>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-3 gap-2">
            {[
              "✓ IA 24/7",
              "✓ 5.000 mensajes/mes",
              "✓ 3 bots activos",
              "✓ Chat en tu web",
              "✓ Captura de leads",
              "✓ Panel de analytics",
            ].map((f) => (
              <span key={f} className="text-white/60 text-xs">{f}</span>
            ))}
          </div>
        </div>

        {/* Objections FAQ */}
        <div className="mb-10">
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-5">Respondemos tus dudas</p>
          <div className="space-y-4">
            {OBJECTIONS.map((item) => (
              <div key={item.q} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                <p className="text-white font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-10">
          <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className="text-white/70 text-sm leading-relaxed italic mb-3">
            &ldquo;Al principio dudé, pero en la primera semana el bot ya había respondido 200 consultas. Recuperé la inversión el primer día.&rdquo;
          </p>
          <p className="text-white/40 text-xs">— Carlos M. · Tienda online, México</p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/#pricing"
            className="flex-1 py-3.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-bold text-sm text-center hover:opacity-90 transition"
          >
            Ver todos los planes
          </Link>
          <Link
            href="/dashboard"
            className="flex-1 py-3.5 border border-white/10 text-white/60 rounded-xl font-semibold text-sm text-center hover:bg-white/5 transition"
          >
            Ir a mi dashboard
          </Link>
        </div>

        <p className="text-center text-white/20 text-xs mt-6">
          ¿Tienes dudas? Escríbenos · No se realizó ningún cargo
        </p>
      </div>
    </div>
  );
}
