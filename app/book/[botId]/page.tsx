"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface BotInfo {
  bot: { name: string; widget_color: string; welcome_message: string };
  profile: { company_name: string | null; company_logo_url: string | null } | null;
}

const DAYS_ES   = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];
const MONTHS_ES = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const TIME_SLOTS = ["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00"];

type Step = "date" | "time" | "form" | "success";

export default function BookingPage() {
  const { botId } = useParams<{ botId: string }>();
  const [info, setInfo]           = useState<BotInfo | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [notFound, setNotFound]   = useState(false);

  // Calendar state
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep]           = useState<Step>("date");

  // Form state
  const [name, setName]   = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/widget/${botId}/info`)
      .then((r) => {
        if (!r.ok) { setNotFound(true); return null; }
        return r.json();
      })
      .then((d) => { if (d) setInfo(d); })
      .finally(() => setInfoLoading(false));
  }, [botId]);

  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  const firstDay  = new Date(viewYear, viewMonth, 1);
  const lastDay   = new Date(viewYear, viewMonth + 1, 0);
  const startDow  = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const cells: (number | null)[] = [
    ...Array(startDow).fill(null),
    ...Array.from({ length: totalDays }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  function isPast(day: number) {
    const d = new Date(viewYear, viewMonth, day); d.setHours(0,0,0,0);
    const t = new Date(); t.setHours(0,0,0,0);
    return d < t;
  }
  function formatDate(day: number) {
    return `${viewYear}-${String(viewMonth + 1).padStart(2,"0")}-${String(day).padStart(2,"0")}`;
  }
  function formatDateDisplay(dateStr: string) {
    const [y, m, d] = dateStr.split("-");
    return `${parseInt(d)} de ${MONTHS_ES[parseInt(m) - 1]} ${y}`;
  }

  async function handleSubmit() {
    if (!name.trim()) { setError("Por favor ingresa tu nombre completo."); return; }
    if (!email.trim() && !phone.trim()) { setError("Necesitamos al menos tu email o teléfono."); return; }
    setSubmitting(true); setError("");
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
          notes: notes.trim() || null,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || `Error ${res.status}`);
      }
      setStep("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al agendar. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  }

  const color = info?.bot.widget_color ?? "#2CC5C5";
  const botName = info?.bot.name ?? "Bot";
  const companyName = info?.profile?.company_name ?? botName;
  const logoUrl = info?.profile?.company_logo_url;

  if (infoLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" style={{ borderColor: "#2CC5C5 transparent transparent transparent" }} />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Página no disponible</h1>
          <p className="text-gray-500 text-sm">Este enlace de reserva no está activo.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <div className="w-full max-w-md mb-6 text-center">
        {logoUrl ? (
          <Image src={logoUrl} alt={companyName} width={120} height={40} className="h-10 w-auto object-contain mx-auto mb-3" />
        ) : (
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-3 shadow-lg"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}
          >
            {companyName.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="text-2xl font-black text-gray-900">{companyName}</h1>
        <p className="text-gray-500 text-sm mt-1">Agenda tu cita con <strong>{botName}</strong></p>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Progress bar */}
        {step !== "success" && (
          <div className="h-1.5 bg-gray-100">
            <div
              className="h-full transition-all duration-300 rounded-r-full"
              style={{
                width: step === "date" ? "33%" : step === "time" ? "66%" : "90%",
                background: `linear-gradient(to right, ${color}, ${color}bb)`,
              }}
            />
          </div>
        )}

        {/* Step header */}
        {step !== "success" && (
          <div className="px-6 py-4 border-b border-gray-100" style={{ backgroundColor: color + "12" }}>
            <p className="text-sm font-semibold text-gray-700">
              {step === "date" && "📅 Selecciona una fecha"}
              {step === "time" && "🕐 Selecciona un horario"}
              {step === "form" && "👤 Tus datos de contacto"}
            </p>
          </div>
        )}

        {/* STEP 1: Date picker */}
        {step === "date" && (
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <span className="text-sm font-semibold text-gray-800">{MONTHS_ES[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-100 transition">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="grid grid-cols-7 mb-2">
              {DAYS_ES.map((d) => (
                <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const dateStr = formatDate(day);
                const past = isPast(day);
                const sel = selectedDate === dateStr;
                return (
                  <button
                    key={i}
                    disabled={past}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`w-9 h-9 mx-auto rounded-full text-xs font-medium transition ${past ? "text-gray-300 cursor-not-allowed" : sel ? "text-white shadow-md" : "text-gray-700 hover:bg-gray-100"}`}
                    style={sel ? { backgroundColor: color } : undefined}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <button
              disabled={!selectedDate}
              onClick={() => setStep("time")}
              className="mt-5 w-full py-3 rounded-xl text-white font-semibold disabled:opacity-40 transition hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Continuar →
            </button>
          </div>
        )}

        {/* STEP 2: Time slots */}
        {step === "time" && (
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-4">
              Fecha: <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong>
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTime(t)}
                  className={`py-2.5 rounded-xl text-sm font-medium transition border ${
                    selectedTime === t ? "text-white border-transparent shadow-md" : "text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                  style={selectedTime === t ? { backgroundColor: color, borderColor: color } : undefined}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setStep("date")} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                ← Atrás
              </button>
              <button
                disabled={!selectedTime}
                onClick={() => setStep("form")}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-40 transition hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                Continuar →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Contact form */}
        {step === "form" && (
          <div className="p-5">
            <p className="text-xs text-gray-500 mb-4">
              <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong>
              {" · "}
              <strong className="text-gray-700">{selectedTime}</strong>
            </p>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Nombre completo *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
                style={{ "--tw-ring-color": color } as React.CSSProperties}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition"
              />
              <textarea
                placeholder="Notas adicionales (opcional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition resize-none"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="flex gap-2 mt-4">
              <button onClick={() => setStep("time")} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                ← Atrás
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 py-2.5 rounded-xl text-white text-sm font-semibold disabled:opacity-60 transition hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                {submitting ? "Confirmando..." : "Confirmar cita ✓"}
              </button>
            </div>
          </div>
        )}

        {/* SUCCESS */}
        {step === "success" && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg" style={{ background: `linear-gradient(135deg, ${color}, ${color}bb)` }}>
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-black text-gray-900 mb-2">¡Cita confirmada!</h2>
            <p className="text-gray-500 text-sm mb-1">
              <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong> a las <strong className="text-gray-700">{selectedTime}</strong>
            </p>
            {email && <p className="text-gray-400 text-xs mt-2">Recibirás la confirmación en {email}</p>}
            <button
              onClick={() => { setStep("date"); setSelectedDate(null); setSelectedTime(null); setName(""); setEmail(""); setPhone(""); setNotes(""); }}
              className="mt-6 px-6 py-2.5 rounded-xl text-white text-sm font-semibold transition hover:opacity-90"
              style={{ backgroundColor: color }}
            >
              Agendar otra cita
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-8 text-xs text-gray-400">
        Powered by{" "}
        <Link href="https://nexobot.net" className="text-[#2CC5C5] hover:underline" target="_blank">
          NexoBot
        </Link>
      </p>
    </div>
  );
}
