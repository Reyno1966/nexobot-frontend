"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Pequeña pausa para mostrar animación
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Confirmando tu pago...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        {/* Ícono de éxito */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          ¡Pago exitoso!
        </h1>

        <p className="text-gray-500 mb-2">
          Tu suscripción a NexoBot está activa.
        </p>

        <p className="text-sm text-gray-400 mb-8">
          Recibirás un email de confirmación en los próximos minutos.
        </p>

        {/* Pasos siguientes */}
        <div className="bg-blue-50 rounded-xl p-5 mb-8 text-left">
          <p className="text-sm font-semibold text-blue-800 mb-3">¿Qué sigue?</p>
          <ul className="space-y-2 text-sm text-blue-700">
            <li className="flex items-center gap-2">
              <span className="text-blue-500">①</span> Accede a tu dashboard
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">②</span> Configura tu primer bot
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-500">③</span> Conéctalo a tus canales
            </li>
          </ul>
        </div>

        <Link
          href="/dashboard"
          className="block w-full py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-semibold hover:opacity-90 transition"
        >
          Ir a mi dashboard →
        </Link>

        <Link href="/" className="block mt-4 text-sm text-gray-400 hover:text-gray-600 transition">
          Volver al inicio
        </Link>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
