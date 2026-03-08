"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "¿Qué puede hacer NexoBot por mi negocio?",
  "¿Cuánto cuesta el plan Starter?",
  "¿Cómo instalo el chatbot en mi web?",
  "¿Funciona con WhatsApp?",
];

const MAX_USER_MESSAGES = 5;

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "¡Hola! 👋 Soy NexoBot, tu asistente de IA. Pregúntame lo que quieras sobre cómo puedo automatizar tu negocio.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [userMsgCount, setUserMsgCount] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading || showCTA) return;

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
      const botReply: Message = { role: "assistant", content: data.reply ?? "¡Gracias por tu pregunta!" };
      setMessages([...updated, botReply]);

      // Mostrar CTA después del límite
      if (newCount >= MAX_USER_MESSAGES) {
        setTimeout(() => setShowCTA(true), 800);
      }
    } catch {
      setMessages([...updated, { role: "assistant", content: "¡Ups! Algo falló. Vuelve a intentarlo." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage();
  }

  return (
    <div className="relative">
      {/* Chat container */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl shadow-black/40">

        {/* Header */}
        <div className="flex items-center gap-3 px-5 py-4 bg-white/5 border-b border-white/10">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            N
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">NexoBot — Demo en vivo</p>
            <p className="text-green-400 text-xs flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block animate-pulse" />
              En línea · IA activa
            </p>
          </div>
          {userMsgCount > 0 && !showCTA && (
            <span className="text-white/30 text-xs">
              {MAX_USER_MESSAGES - userMsgCount} msgs restantes
            </span>
          )}
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              {msg.role === "assistant" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                  N
                </div>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-[#2CC5C5] text-white rounded-br-sm"
                    : "bg-white/10 text-white/90 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-2 justify-start">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                N
              </div>
              <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {/* CTA post-demo */}
          {showCTA && (
            <div className="bg-gradient-to-r from-[#2CC5C5]/20 to-[#F5A623]/20 border border-white/20 rounded-2xl p-4 text-center mt-2">
              <p className="text-white font-semibold text-sm mb-1">¿Te convenció NexoBot? 🚀</p>
              <p className="text-white/60 text-xs mb-3">Crea tu cuenta gratis y configura tu propio bot en minutos</p>
              <a
                href="/auth/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-5 py-2 rounded-full text-sm font-bold hover:opacity-90 transition"
              >
                Empezar gratis →
              </a>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Suggestion pills — only before first message */}
        {userMsgCount === 0 && (
          <div className="px-4 pb-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs text-white/60 border border-white/10 hover:border-[#2CC5C5]/50 hover:text-[#2CC5C5] px-3 py-1.5 rounded-full transition-all"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 px-4 py-3 bg-white/5 border-t border-white/10"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={showCTA ? "Demo finalizada · Crea tu cuenta gratis ↑" : "Escribe tu pregunta..."}
            disabled={loading || showCTA}
            className="flex-1 bg-transparent text-white text-sm placeholder-white/30 outline-none disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim() || showCTA}
            className="w-9 h-9 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl flex items-center justify-center hover:opacity-90 transition disabled:opacity-30 flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </form>
      </div>

      {/* Floating badge */}
      <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-green-900/40 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
        IA real · No es un guión
      </div>
    </div>
  );
}
