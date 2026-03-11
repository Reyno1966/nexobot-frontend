"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "¿Qué puede hacer por mi tienda?",
  "¿Cuánto cuesta?",
  "¿Cómo lo instalo?",
  "¿Funciona con WhatsApp?",
];

// Mensajes de demostración que aparecen solos al cargar
const INTRO_MESSAGES: Message[] = [
  { role: "assistant", content: "¡Hola! 👋 Soy NexoBot, tu asistente con IA. Respondo clientes, genero ventas y trabajo 24/7 por tu negocio." },
  { role: "user",      content: "¿Puedes atender a mis clientes mientras duermo?" },
  { role: "assistant", content: "¡Exactamente! Mientras tú descansas, yo respondo consultas, capturo leads y proceso pedidos sin parar. Tu negocio nunca cierra. 🚀" },
];

const MAX_USER_MESSAGES = 5;
const INTRO_DELAY_MS    = 700; // ms entre cada mensaje de intro

export default function DemoChat() {
  const [messages, setMessages]       = useState<Message[]>([]);
  const [introsDone, setIntrosDone]   = useState(false);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showCTA, setShowCTA]         = useState(false);
  const [visibleCount, setVisibleCount] = useState(0); // controla cuántos mensajes intro son visibles
  const endRef  = useRef<HTMLDivElement>(null);

  // Auto-scroll suave
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, visibleCount]);

  // Reproduce los mensajes de intro uno por uno
  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setVisibleCount(i);
      if (i < INTRO_MESSAGES.length) {
        setTimeout(tick, INTRO_DELAY_MS + (INTRO_MESSAGES[i - 1].role === "assistant" ? 300 : 0));
      } else {
        setTimeout(() => {
          setMessages(INTRO_MESSAGES);
          setIntrosDone(true);
        }, 400);
      }
    };
    const t = setTimeout(tick, 600);
    return () => clearTimeout(t);
  }, []);

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading || showCTA || !introsDone) return;

    setInput("");
    const newCount = userMsgCount + 1;
    setUserMsgCount(newCount);

    const updated: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setLoading(true);

    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply ?? "¡Gracias por tu pregunta!" }]);
      if (newCount >= MAX_USER_MESSAGES) setTimeout(() => setShowCTA(true), 800);
    } catch {
      setMessages([...updated, { role: "assistant", content: "¡Ups! Algo falló. Vuelve a intentarlo." }]);
    } finally {
      setLoading(false);
    }
  }

  // Mensajes visibles durante intro (animados) o mensajes reales
  const displayMessages = introsDone
    ? messages
    : INTRO_MESSAGES.slice(0, visibleCount);

  return (
    <div className="relative max-w-md mx-auto lg:max-w-none">

      {/* Glow de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2CC5C5]/20 to-[#F5A623]/10 rounded-3xl blur-2xl scale-110 pointer-events-none" />

      {/* Contenedor principal */}
      <div className="relative bg-white/[0.06] border border-white/[0.12] backdrop-blur-2xl rounded-3xl overflow-hidden shadow-2xl shadow-black/50">

        {/* ── Header ── */}
        <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-white/[0.08] to-white/[0.04] border-b border-white/[0.08]">
          {/* Avatar con anillo animado */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] animate-ping opacity-25" />
            <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-[#2CC5C5]/30">
              N
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm leading-none">NexoBot</p>
            <p className="text-[#2CC5C5] text-xs mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#2CC5C5] rounded-full inline-block animate-pulse" />
              En línea · IA activa
            </p>
          </div>
          {introsDone && userMsgCount > 0 && !showCTA && (
            <span className="text-white/30 text-xs bg-white/5 px-2 py-1 rounded-full border border-white/10">
              {MAX_USER_MESSAGES - userMsgCount} restantes
            </span>
          )}
        </div>

        {/* ── Mensajes ── */}
        <div className="h-72 overflow-y-auto px-4 py-4 space-y-3 scroll-smooth">
          {displayMessages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 items-end animate-fade-in ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              style={{ animationDelay: `${i * 60}ms`, animationFillMode: "both" }}
            >
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md shadow-[#2CC5C5]/20">
                  N
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-gradient-to-br from-[#2CC5C5] to-[#25AAAA] text-white rounded-2xl rounded-br-sm shadow-[#2CC5C5]/20"
                    : "bg-white/[0.10] text-white/90 rounded-2xl rounded-bl-sm border border-white/[0.08]"
                }`}
              >
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#F5A623] to-[#E09018] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 shadow-md">
                  Tú
                </div>
              )}
            </div>
          ))}

          {/* Indicador de escritura */}
          {(loading || (!introsDone && visibleCount > 0 && visibleCount < INTRO_MESSAGES.length && INTRO_MESSAGES[visibleCount - 1]?.role === "user")) && (
            <div className="flex gap-2 items-end justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                N
              </div>
              <div className="bg-white/10 border border-white/[0.08] rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* CTA post-demo */}
          {showCTA && (
            <div className="bg-gradient-to-br from-[#2CC5C5]/15 to-[#F5A623]/15 border border-[#2CC5C5]/30 rounded-2xl p-4 text-center mt-2">
              <p className="text-2xl mb-1">🚀</p>
              <p className="text-white font-bold text-sm mb-1">¿Te convenció NexoBot?</p>
              <p className="text-white/50 text-xs mb-3">Crea tu bot en minutos, gratis, sin tarjeta</p>
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-6 py-2 rounded-full text-sm font-bold hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#0A5555]/40"
              >
                Empezar gratis →
              </a>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* ── Sugerencias (solo antes del primer mensaje del usuario) ── */}
        {introsDone && userMsgCount === 0 && !showCTA && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs text-[#2CC5C5] border border-[#2CC5C5]/30 hover:border-[#2CC5C5] hover:bg-[#2CC5C5]/10 px-3 py-1.5 rounded-full transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* ── Input ── */}
        <form
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
          className="flex items-center gap-2 px-4 py-3 bg-white/[0.04] border-t border-white/[0.08]"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              !introsDone
                ? "NexoBot está escribiendo..."
                : showCTA
                ? "Demo finalizada · Crea tu cuenta ↑"
                : "Escribe tu pregunta..."
            }
            disabled={loading || showCTA || !introsDone}
            className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || showCTA || !introsDone}
            className="w-9 h-9 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl flex items-center justify-center hover:opacity-90 hover:scale-105 transition-all disabled:opacity-30 disabled:scale-100 flex-shrink-0 shadow-md shadow-[#2CC5C5]/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* ── Badges flotantes ── */}
      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-900/40 flex items-center gap-1.5 z-10">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        IA real · no un guión
      </div>
      <div className="absolute -bottom-3 -left-3 bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 z-10">
        ⚡ Responde en &lt;2s
      </div>

      {/* Keyframes de animación */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
