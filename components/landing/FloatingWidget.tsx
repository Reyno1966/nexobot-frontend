"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME = "¡Hola! 👋 Soy NexoBot. Pregúntame cualquier cosa — estoy aquí para demostrarte lo que puedo hacer por tu negocio.";
const MAX_MSGS = 6;

export default function FloatingWidget() {
  const [open, setOpen]               = useState(false);
  const [messages, setMessages]       = useState<Message[]>([{ role: "assistant", content: WELCOME }]);
  const [input, setInput]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [userCount, setUserCount]     = useState(0);
  const [showCTA, setShowCTA]         = useState(false);
  const [showPulse, setShowPulse]     = useState(true);
  const [unread, setUnread]           = useState(1); // badge de notificación
  const [mounted, setMounted]         = useState(false);
  const endRef   = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Portal: montar en cliente para escapar del overflow-x-hidden del <main>
  useEffect(() => { setMounted(true); }, []);

  // auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // focus al abrir
  useEffect(() => {
    if (open) {
      setUnread(0);
      setShowPulse(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  async function send(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading || showCTA) return;
    setInput("");
    const newCount = userCount + 1;
    setUserCount(newCount);
    const updated: Message[] = [...messages, { role: "user", content: msg }];
    setMessages(updated);
    setLoading(true);
    try {
      const res  = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, history: messages }),
      });
      const data = await res.json();
      setMessages([...updated, { role: "assistant", content: data.reply ?? "¡Gracias!" }]);
      if (newCount >= MAX_MSGS) setTimeout(() => setShowCTA(true), 600);
    } catch {
      setMessages([...updated, { role: "assistant", content: "¡Ups! Algo falló. Intenta de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3">

      {/* ── Panel de chat ── */}
      <div
        className={`transition-all duration-300 origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-90 translate-y-4 pointer-events-none"
        }`}
      >
        <div className="w-80 sm:w-96 bg-white rounded-2xl shadow-2xl shadow-black/20 border border-gray-100 overflow-hidden flex flex-col"
          style={{ height: "480px" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-r from-[#041414] to-[#062828] flex-shrink-0">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] animate-ping opacity-20" />
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white font-black text-sm shadow-lg">
                N
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-sm leading-tight">NexoBot</p>
              <p className="text-[#2CC5C5] text-xs flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 bg-[#2CC5C5] rounded-full animate-pulse inline-block" />
                En línea ahora
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition ml-auto flex-shrink-0"
              aria-label="Cerrar"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 items-end ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    N
                  </div>
                )}
                <div
                  className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[#2CC5C5] text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Typing */}
            {loading && (
              <div className="flex gap-2 items-end justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">N</div>
                <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 bg-[#2CC5C5] rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            {showCTA && (
              <div className="bg-gradient-to-br from-[#EEF9F9] to-[#D9F5F5] border border-[#2CC5C5]/20 rounded-2xl p-4 text-center">
                <p className="font-bold text-gray-900 text-sm mb-1">¿Te convenció NexoBot? 🚀</p>
                <p className="text-gray-500 text-xs mb-3">Crea tu propio bot gratis en minutos</p>
                <a
                  href="/auth/signup"
                  className="inline-block bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition shadow-md shadow-[#0A5555]/20"
                >
                  Empezar gratis →
                </a>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 px-3 py-3 border-t border-gray-100 bg-white flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={showCTA ? "Demo finalizada · Crea tu cuenta ↑" : "Escribe un mensaje..."}
              disabled={loading || showCTA}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#2CC5C5] focus:ring-2 focus:ring-[#2CC5C5]/20 transition disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || showCTA}
              className="w-9 h-9 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition disabled:opacity-30 flex-shrink-0 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

          {/* Branding */}
          <div className="text-center py-1.5 bg-gray-50 border-t border-gray-100 flex-shrink-0">
            <p className="text-[10px] text-gray-300">
              Powered by{" "}
              <span className="bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] bg-clip-text text-transparent font-semibold">
                NexoBot
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Botón flotante ── */}
      <div className="relative">
        {/* Anillo pulsante */}
        {showPulse && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] animate-ping opacity-30 scale-110" />
        )}

        {/* Badge de notificación */}
        {!open && unread > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center z-10 shadow-md">
            {unread}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] text-white shadow-xl shadow-[#0A5555]/40 hover:scale-110 hover:shadow-2xl hover:shadow-[#0A5555]/50 transition-all duration-200 flex items-center justify-center"
          aria-label="Abrir chat"
        >
          {open ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  , document.body);
}
