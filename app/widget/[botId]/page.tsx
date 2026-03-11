"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

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

const DAYS_ES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];
const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

// Extrae el nombre del visitante de la conversación
function extractVisitorName(messages: Message[]): string {
  const nameQuestions = ["nombre", "cómo te llamas", "como te llamas", "tu nombre", "llamo", "name"];
  for (let i = 0; i < messages.length - 1; i++) {
    const msg = messages[i];
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

// Extrae email y teléfono de los mensajes del usuario en la conversación
function extractContactData(messages: Message[]): { email: string; phone: string } {
  let email = "";
  let phone = "";
  for (const msg of messages) {
    if (msg.role !== "user") continue;
    if (!email) {
      const m = msg.content.match(/\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/);
      if (m) email = m[0];
    }
    if (!phone) {
      const m = msg.content.match(/(?:\+?\d[\d\s\-\(\)]{5,13}\d)/);
      if (m && m[0].replace(/\D/g, "").length >= 7) phone = m[0].trim();
    }
    if (email && phone) break;
  }
  return { email, phone };
}

interface CalendarPickerProps {
  botId: string;
  widgetColor: string;
  prefillName?: string;
  prefillEmail?: string;
  prefillPhone?: string;
  onConfirm: (summary: string) => void;
  onClose: () => void;
}

function CalendarPicker({ botId, widgetColor, prefillName = "", prefillEmail = "", prefillPhone = "", onConfirm, onClose }: CalendarPickerProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [name, setName] = useState(prefillName);
  const [email, setEmail] = useState(prefillEmail);
  const [phone, setPhone] = useState(prefillPhone);
  const [step, setStep] = useState<"date" | "time" | "form">("date");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1);
  const lastDay = new Date(viewYear, viewMonth + 1, 0);
  const startDow = (firstDay.getDay() + 6) % 7; // Lunes = 0
  const totalDays = lastDay.getDate();
  const cells: (number | null)[] = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function isPast(day: number): boolean {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  }

  function formatDate(day: number): string {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${viewYear}-${mm}-${dd}`;
  }

  function formatDateDisplay(dateStr: string): string {
    const [y, m, d] = dateStr.split("-");
    return `${parseInt(d)} de ${MONTHS_ES[parseInt(m) - 1]} ${y}`;
  }

  async function handleSubmit() {
    if (!name.trim()) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }
    if (!email.trim() && !phone.trim()) {
      setError("Necesitamos al menos tu email o teléfono para confirmar la cita.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/widget/${botId}/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_name: name.trim(),
          visitor_email: email.trim() || null,
          visitor_phone: phone.trim() || null,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Error ${res.status}`);
      }
      onConfirm(
        `✅ ¡Cita confirmada! Te esperamos el ${formatDateDisplay(selectedDate!)} a las ${selectedTime}. ¡Hasta pronto, ${name.trim()}!`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido";
      setError(`No se pudo agendar la cita: ${msg}. Intenta de nuevo.`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden mx-1 my-1">
      {/* Header */}
      <div
        className="px-4 py-2.5 flex items-center justify-between border-b border-gray-100"
        style={{ backgroundColor: widgetColor + "18" }}
      >
        <span className="text-sm font-semibold text-gray-700">
          {step === "date" && "📅 Selecciona una fecha"}
          {step === "time" && "🕐 Selecciona un horario"}
          {step === "form" && "👤 Tus datos de contacto"}
        </span>
        <button
          onClick={onClose}
          className="w-6 h-6 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 text-base leading-none transition"
        >
          ×
        </button>
      </div>

      {/* PASO 1: Calendario */}
      {step === "date" && (
        <div className="p-3">
          {/* Navegación de mes */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-700">
              {MONTHS_ES[viewMonth]} {viewYear}
            </span>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cabecera días */}
          <div className="grid grid-cols-7 mb-1">
            {DAYS_ES.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Grilla de días */}
          <div className="grid grid-cols-7 gap-y-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />;
              const dateStr = formatDate(day);
              const past = isPast(day);
              const selected = selectedDate === dateStr;
              return (
                <button
                  key={i}
                  disabled={past}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`
                    w-8 h-8 mx-auto rounded-full text-xs font-medium transition
                    ${past ? "text-gray-300 cursor-not-allowed" : "cursor-pointer"}
                    ${selected ? "text-white shadow-sm" : past ? "" : "text-gray-700 hover:bg-gray-100"}
                  `}
                  style={selected ? { backgroundColor: widgetColor } : undefined}
                >
                  {day}
                </button>
              );
            })}
          </div>

          <button
            disabled={!selectedDate}
            onClick={() => setStep("time")}
            className="mt-3 w-full py-2 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition hover:opacity-90"
            style={{ backgroundColor: widgetColor }}
          >
            Continuar →
          </button>
        </div>
      )}

      {/* PASO 2: Horarios */}
      {step === "time" && (
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-3">
            Fecha seleccionada:{" "}
            <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong>
          </p>
          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTime(t)}
                className={`py-2 rounded-xl text-sm font-medium transition border ${
                  selectedTime === t
                    ? "text-white border-transparent shadow-sm"
                    : "text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
                style={
                  selectedTime === t
                    ? { backgroundColor: widgetColor, borderColor: widgetColor }
                    : undefined
                }
              >
                {t}
              </button>
            ))}
          </div>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setStep("date")}
              className="flex-1 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            >
              ← Atrás
            </button>
            <button
              disabled={!selectedTime}
              onClick={() => setStep("form")}
              className="flex-1 py-2 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition hover:opacity-90"
              style={{ backgroundColor: widgetColor }}
            >
              Continuar →
            </button>
          </div>
        </div>
      )}

      {/* PASO 3: Datos de contacto */}
      {step === "form" && (
        <div className="p-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500">
              <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong>
              {" · "}
              <strong className="text-gray-700">{selectedTime}</strong>
            </p>
          </div>
          {/* Banner cuando el agente ya detectó los datos */}
          {(prefillName || prefillEmail || prefillPhone) && (
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2 mb-3 text-xs font-medium"
              style={{ backgroundColor: widgetColor + "18", color: widgetColor }}
            >
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Datos detectados de la conversación. Verifica y confirma.
            </div>
          )}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre completo *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
            />
            <div className="relative">
              <input
                type="email"
                placeholder="Email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                  !email.trim() && !phone.trim() ? "border-orange-200" : "border-gray-200"
                }`}
                style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <div className="flex-1 h-px bg-gray-100" />
              <span>o</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <input
              type="tel"
              placeholder="Teléfono *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                !email.trim() && !phone.trim() ? "border-orange-200" : "border-gray-200"
              }`}
              style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
            />
            {!email.trim() && !phone.trim() && (
              <p className="text-xs text-orange-500">Se requiere al menos email o teléfono para confirmar tu cita.</p>
            )}
          </div>
          {error && (
            <div className="mt-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              <p className="text-red-600 text-xs">{error}</p>
            </div>
          )}
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => setStep("time")}
              className="flex-1 py-2 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
            >
              ← Atrás
            </button>
            <button
              disabled={submitting || !name.trim()}
              onClick={handleSubmit}
              className="flex-1 py-2 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition hover:opacity-90"
              style={{ backgroundColor: widgetColor }}
            >
              {submitting ? "Agendando..." : "Confirmar cita"}
            </button>
          </div>
        </div>
      )}
    </div>
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
  const [showCalendar, setShowCalendar]   = useState(false);
  const [visitorName, setVisitorName]     = useState("");
  const [visitorEmail, setVisitorEmail]   = useState("");
  const [visitorPhone, setVisitorPhone]   = useState("");
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
        const name = extractVisitorName(updatedMessages);
        const { email, phone } = extractContactData(updatedMessages);
        if (name)  setVisitorName(name);
        if (email) setVisitorEmail(email);
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
              {msg.content}
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
          <CalendarPicker
            botId={botId}
            widgetColor={widgetColor}
            prefillName={visitorName}
            prefillEmail={visitorEmail}
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
