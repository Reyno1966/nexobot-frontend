"use client";

import React, { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import AppointmentCalendar from "@/components/chat/AppointmentCalendar";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function getSessionId(): string {
  if (typeof window === "undefined") return `ssr-${Date.now()}`;
  const key = "nexobot_session_id";
  let sid = localStorage.getItem(key);
  if (!sid) {
    sid = `visitor-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem(key, sid);
  }
  return sid;
}

const APPOINTMENT_TRIGGERS = [
  "agenda", "agendar", "cita", "appointment", "reserv", "program",
  "fecha", "horario", "calendario", "selecciona", "elige",
  "¿qué día", "que dia", "disponib", "te espero", "quedamos",
];

function hasAppointmentTrigger(text: string): boolean {
  const lower = text.toLowerCase();
  return APPOINTMENT_TRIGGERS.some((kw) => lower.includes(kw));
}

// Extrae el nombre del visitante de la conversación
function extractVisitorName(messages: Message[]): string {
  const nameQuestions = ["nombre", "cómo te llamas", "como te llamas", "tu nombre", "llamo", "name"];
  for (let i = 0; i < messages.length - 1; i++) {
    const msg  = messages[i];
    const next = messages[i + 1];
    if (
      msg.role === "assistant" &&
      nameQuestions.some((q) => msg.content.toLowerCase().includes(q)) &&
      next.role === "user" &&
      next.content.trim().length < 60 &&
      !next.content.includes("@") &&
      !/^\d/.test(next.content.trim())
    ) {
      const candidate = next.content.trim();
      const words = candidate.split(/\s+/);
      if (words.length >= 1 && words.length <= 4 && words.every((w) => w.length >= 2)) {
        return candidate;
      }
    }
  }
  return "";
}

// Extrae el teléfono del visitante de los mensajes del usuario
function extractVisitorPhone(messages: Message[]): string {
  const phoneRegex = /\b(\+?[\d][\d\s\-().]{5,13}[\d])\b/;
  for (let i = messages.length - 1; i >= 0; i--) {
    if (messages[i].role === "user") {
      const match = messages[i].content.match(phoneRegex);
      if (match) return match[1].replace(/\s+/g, "");
    }
  }
  return "";
}

// Renderiza el contenido del mensaje, detectando URLs de imágenes e insertando <img>
function renderMessageContent(content: string): React.ReactNode {
  const imageRegex = /(https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp)(?:\?[^\s]*)?)/gi;
  const parts = content.split(imageRegex);
  if (parts.length === 1) return content;

  return (
    <>
      {parts.map((part, idx) =>
        /^https?:\/\/[^\s]+\.(?:jpg|jpeg|png|gif|webp)/i.test(part) ? (
          <img
            key={idx}
            src={part}
            alt="Producto"
            className="mt-2 rounded-lg max-w-full max-h-48 object-contain block"
          />
        ) : part ? (
          <span key={idx}>{part}</span>
        ) : null
      )}
    </>
  );
}

export default function WidgetPage() {
  const { botId } = useParams<{ botId: string }>();
  const [messages, setMessages]         = useState<Message[]>([]);
  const [input, setInput]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [botName, setBotName]           = useState("NexoBot");
  const [companyLogo, setCompanyLogo]   = useState<string>("");
  const [sessionId, setSessionId]       = useState<string>("");
  const [logoError, setLogoError]       = useState(false);
  const [widgetColor, setWidgetColor]   = useState("#2CC5C5");
  const [showCalendar, setShowCalendar] = useState(false);
  const [visitorName,  setVisitorName]  = useState("");
  const [visitorPhone, setVisitorPhone] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSessionId(getSessionId());
    fetch(`/api/widget/${botId}/info`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.bot?.name)                  setBotName(d.bot.name);
        if (d?.bot?.widget_color)          setWidgetColor(d.bot.widget_color);
        if (d?.profile?.company_logo_url)  setCompanyLogo(d.profile.company_logo_url);
        const welcome = d?.bot?.welcome_message || "¡Hola! 👋 ¿En qué puedo ayudarte hoy?";
        setMessages([{ role: "assistant", content: welcome }]);
      })
      .catch(() => {
        setMessages([{ role: "assistant", content: "¡Hola! 👋 ¿En qué puedo ayudarte hoy?" }]);
      });
  }, [botId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading, showCalendar]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setShowCalendar(false);
    const newMessages = [...messages, { role: "user" as const, content: userMsg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch(`/api/widget/${botId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages.slice(-6), sessionId }),
      });
      const data = await res.json();
      const reply = data.reply || "Lo siento, no pude responder en este momento.";
      const updatedMessages: Message[] = [...newMessages, { role: "assistant" as const, content: reply }];
      setMessages(updatedMessages);
      if (hasAppointmentTrigger(reply)) {
        const name  = extractVisitorName(updatedMessages);
        const phone = extractVisitorPhone(updatedMessages);
        if (name)  setVisitorName(name);
        if (phone) setVisitorPhone(phone);
        setShowCalendar(true);
      }
    } catch {
      setMessages([...newMessages, { role: "assistant", content: "Error de conexión. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }

  function handleCalendarConfirm(summary: string) {
    setShowCalendar(false);
    setMessages((prev) => [...prev, { role: "assistant", content: summary }]);
  }

  const initials = botName.charAt(0).toUpperCase();
  const showLogo = companyLogo && !logoError;

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#041414] to-[#062828] flex-shrink-0">
        <div
          className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: showLogo ? undefined : widgetColor }}
        >
          {showLogo ? (
            <Image
              src={companyLogo}
              alt={botName}
              width={36}
              height={36}
              className="w-full h-full object-cover"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span>{initials}</span>
          )}
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">{botName}</p>
          <p className="text-green-400 text-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
            En línea
          </p>
        </div>
        {/* Botón agendar en header */}
        <button
          onClick={() => setShowCalendar((v) => !v)}
          title="Agendar cita"
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition hover:opacity-90 flex-shrink-0"
          style={{ backgroundColor: widgetColor + "30", color: widgetColor }}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Agendar
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "assistant" && (
              <div
                className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: showLogo ? undefined : widgetColor }}
              >
                {showLogo ? (
                  <Image
                    src={companyLogo}
                    alt={botName}
                    width={28}
                    height={28}
                    className="w-full h-full object-cover"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
            )}
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "text-white rounded-br-sm"
                  : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
              }`}
              style={msg.role === "user" ? { backgroundColor: widgetColor } : undefined}
            >
              {renderMessageContent(msg.content)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2">
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: showLogo ? undefined : widgetColor }}
            >
              {showLogo ? (
                <Image
                  src={companyLogo}
                  alt={botName}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span>{initials}</span>
              )}
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

        {/* Calendario inline */}
        {showCalendar && !loading && (
          <AppointmentCalendar
            botId={botId}
            widgetColor={widgetColor}
            prefillName={visitorName}
            prefillPhone={visitorPhone}
            onConfirm={handleCalendarConfirm}
            onClose={() => setShowCalendar(false)}
          />
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={sendMessage}
        className="flex items-center gap-2 px-3 py-3 bg-white border-t border-gray-100 flex-shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe tu mensaje..."
          disabled={loading}
          className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:opacity-50"
          style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="w-9 h-9 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition disabled:opacity-40 flex-shrink-0"
          style={{ backgroundColor: widgetColor }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </form>

      {/* Powered by */}
      <div className="text-center py-2 bg-white border-t border-gray-50">
        <a
          href="https://nexobot.net"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-gray-300 hover:text-gray-400 transition"
        >
          Powered by NexoBot
        </a>
      </div>
    </div>
  );
}
