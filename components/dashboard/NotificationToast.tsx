"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Props {
  botName: string;
  count: number;
  onClose: () => void;
}

export default function NotificationToast({ botName, count, onClose }: Props) {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    // Slide-in con pequeño delay para que la transición se vea
    const showTimer = setTimeout(() => setVisible(true), 50);

    // Countdown de 5 segundos con barra de progreso
    const duration = 5000;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
        handleClose();
      }
    }, 50);

    return () => {
      clearTimeout(showTimer);
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleClose() {
    setVisible(false);
    setTimeout(onClose, 300); // esperar slide-out antes de desmontar
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      {/* Barra de progreso superior */}
      <div
        className="h-1 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] transition-all duration-100 ease-linear"
        style={{ width: `${progress}%` }}
      />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Ícono */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#2CC5C5]/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>

          {/* Contenido */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900">
              {count === 1 ? "💬 Nueva conversación" : `💬 ${count} nuevas conversaciones`}
            </p>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {botName}
            </p>
          </div>

          {/* Cerrar */}
          <button
            onClick={handleClose}
            className="text-gray-300 hover:text-gray-500 transition flex-shrink-0 mt-0.5"
            aria-label="Cerrar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* CTA */}
        <Link
          href="/dashboard/conversations"
          onClick={handleClose}
          className="mt-3 w-full flex items-center justify-center gap-2 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-xs font-bold rounded-xl hover:opacity-90 transition"
        >
          Ver conversaciones →
        </Link>
      </div>
    </div>
  );
}
