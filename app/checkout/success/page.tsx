"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { trackPurchase } from "@/lib/gtag";

interface SessionData {
  planName: string;
  isSubscription: boolean;
  amount: string;
  currency: string;
  customerEmail: string;
}

const ONBOARDING_STEPS = [
  {
    number: "01",
    icon: "🤖",
    title: "Crea tu primer bot",
    desc: "Elige una plantilla y define la personalidad de tu asistente en segundos.",
    href: "/dashboard/bots",
    cta: "Crear bot →",
    color: "from-[#2CC5C5] to-[#1FA8A8]",
  },
  {
    number: "02",
    icon: "🎨",
    title: "Personaliza la apariencia",
    desc: "Cambia el color, mensaje de bienvenida y el avatar para que combine con tu marca.",
    href: "/dashboard/bots",
    cta: "Personalizar →",
    color: "from-[#F5A623] to-[#E09015]",
  },
  {
    number: "03",
    icon: "🔗",
    title: "Instala en tu sitio web",
    desc: "Copia 2 líneas de código y tu bot estará activo en tu web en menos de 5 minutos.",
    href: "/dashboard/bots",
    cta: "Instalar →",
    color: "from-[#8B5CF6] to-[#7C3AED]",
  },
];

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<SessionData | null>(null);
  const [checkVisible, setCheckVisible] = useState(false);

  useEffect(() => {
    async function verify() {
      if (sessionId) {
        try {
          const res = await fetch(`/api/stripe/verify-session?session_id=${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            setSession(data);
            // Conversión: pago completado
            if (data.status === "paid") {
              trackPurchase({
                transactionId: sessionId,
                value: parseFloat(data.amount) || 0,
                currency: data.currency || "USD",
                planName: data.planName || "NexoBot",
              });
            }
          }
        } catch {
          // fallback — mostrar página genérica
        }
      }
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => setCheckVisible(true), 100);
      }, 1200);
    }
    verify();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#041414]">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin mx-auto mb-5" />
          <p className="text-white/50 text-sm">Confirmando tu pago con Stripe...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#041414] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#2CC5C5]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F5A623]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16">

        {/* Logo */}
        <div className="flex justify-center mb-12">
          <Link href="/">
            <Image src="/nexobot-logo.png" alt="NexoBot" width={140} height={44} className="h-11 w-auto object-contain" />
          </Link>
        </div>

        {/* Celebration card */}
        <div className="text-center mb-14">

          {/* Animated check */}
          <div className={`relative w-24 h-24 mx-auto mb-8 transition-all duration-700 ${checkVisible ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
            {/* Outer ring animation */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] animate-pulse opacity-20" />
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] opacity-10" />
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center shadow-2xl shadow-[#2CC5C5]/30">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${checkVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <p className="text-[#2CC5C5] text-sm font-bold uppercase tracking-widest mb-3">Pago confirmado</p>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              ¡Bienvenido a NexoBot{session?.planName ? ` ${session.planName}` : ""}! 🚀
            </h1>
            <p className="text-white/60 text-lg max-w-xl mx-auto leading-relaxed">
              Tu cuenta está lista. En pocos minutos tu bot puede estar atendiendo clientes 24/7.
            </p>
            {session?.customerEmail && (
              <p className="text-white/30 text-sm mt-3">
                Recibirás la confirmación en <span className="text-white/50">{session.customerEmail}</span>
              </p>
            )}
          </div>
        </div>

        {/* Onboarding steps */}
        <div className={`transition-all duration-700 delay-500 ${checkVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <p className="text-white/40 text-xs font-bold uppercase tracking-widest text-center mb-6">
            Empieza en 3 pasos — menos de 10 minutos
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {ONBOARDING_STEPS.map((step) => (
              <Link
                key={step.number}
                href={step.href}
                className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className={`text-xs font-black bg-gradient-to-r ${step.color} bg-clip-text text-transparent`}>
                    {step.number}
                  </span>
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">{step.desc}</p>
                <span className={`text-sm font-semibold bg-gradient-to-r ${step.color} bg-clip-text text-transparent group-hover:opacity-80 transition`}>
                  {step.cta}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main CTA */}
        <div className={`text-center transition-all duration-700 delay-700 ${checkVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
          <Link
            href="/dashboard/bots"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-full font-bold text-lg hover:opacity-90 hover:scale-105 transition-all shadow-2xl shadow-[#2CC5C5]/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Crear mi primer bot ahora
          </Link>

          <div className="mt-6 flex flex-wrap justify-center gap-6 text-white/30 text-sm">
            <Link href="/dashboard" className="hover:text-white/60 transition">Ir al dashboard</Link>
            <span>·</span>
            <Link href="/dashboard/billing" className="hover:text-white/60 transition">Ver mi suscripción</Link>
            <span>·</span>
            <Link href="/" className="hover:text-white/60 transition">Inicio</Link>
          </div>
        </div>

        {/* Trust footer */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center">
          <p className="text-white/20 text-xs">
            NexoBot · Soporte disponible en dashboard · Cancela cuando quieras
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#041414]">
        <div className="w-12 h-12 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
