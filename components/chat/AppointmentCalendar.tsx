"use client";

/**
 * components/chat/AppointmentCalendar.tsx
 * Calendario visual de agendamiento para el widget de chat.
 * - Paso 1: Calendario mensual con días disponibles (verde) / ocupados (rojo)
 * - Paso 2: Slots de hora — disponibles / ocupados (tachados)
 * - Paso 3: Formulario de datos de contacto
 *
 * La disponibilidad se obtiene de GET /api/widget/[botId]/availability
 */

import { useState, useEffect } from "react";

// ── Constantes ────────────────────────────────────────────────────────────────

export const MONTHS_ES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

export const DAYS_ES = ["Lu", "Ma", "Mi", "Ju", "Vi", "Sá", "Do"];

export const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

// ── Tipos ─────────────────────────────────────────────────────────────────────

type OccupiedMap = Record<string, string[]>; // "2026-03-20" → ["09:00", "14:00"]

export interface AppointmentCalendarProps {
  botId:        string;
  widgetColor:  string;
  prefillName?:  string;
  prefillPhone?: string;
  prefillEmail?: string;
  onConfirm:    (summary: string) => void;
  onClose:      () => void;
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function AppointmentCalendar({
  botId,
  widgetColor,
  prefillName  = "",
  prefillPhone = "",
  prefillEmail = "",
  onConfirm,
  onClose,
}: AppointmentCalendarProps) {
  const today = new Date();

  // Navegación del calendario
  const [viewYear,  setViewYear]  = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  // Selección
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Formulario
  const [name,  setName]  = useState(prefillName);
  const [phone, setPhone] = useState(prefillPhone);
  const [email, setEmail] = useState(prefillEmail);

  // UI
  const [step,          setStep]          = useState<"date" | "time" | "form">("date");
  const [submitting,    setSubmitting]    = useState(false);
  const [error,         setError]         = useState("");
  const [occupied,      setOccupied]      = useState<OccupiedMap>({});
  const [loadingSlots,  setLoadingSlots]  = useState(false);

  // ── Cargar disponibilidad al cambiar de mes ──────────────────────────────
  useEffect(() => {
    let cancelled = false;
    setLoadingSlots(true);

    fetch(`/api/widget/${botId}/availability?year=${viewYear}&month=${viewMonth + 1}`)
      .then((r) => (r.ok ? r.json() : { occupied: {} }))
      .then((data: { occupied: OccupiedMap }) => {
        if (!cancelled) {
          setOccupied(data.occupied ?? {});
          setLoadingSlots(false);
        }
      })
      .catch(() => { if (!cancelled) setLoadingSlots(false); });

    return () => { cancelled = true; };
  }, [botId, viewYear, viewMonth]);

  // ── Navegación de meses ──────────────────────────────────────────────────
  function prevMonth() {
    if (viewMonth === 0) { setViewYear((y) => y - 1); setViewMonth(11); }
    else setViewMonth((m) => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear((y) => y + 1); setViewMonth(0); }
    else setViewMonth((m) => m + 1);
  }

  // ── Helpers del calendario ───────────────────────────────────────────────
  const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startDow  = (new Date(viewYear, viewMonth, 1).getDay() + 6) % 7; // Lu = 0
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
    return `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function formatDateDisplay(dateStr: string): string {
    const [y, m, d] = dateStr.split("-");
    return `${parseInt(d)} de ${MONTHS_ES[parseInt(m) - 1]} ${y}`;
  }

  function getOccupiedSlots(dateStr: string): string[] {
    return occupied[dateStr] ?? [];
  }

  function isFullyBooked(dateStr: string): boolean {
    return getOccupiedSlots(dateStr).length >= TIME_SLOTS.length;
  }

  function isSlotOccupied(dateStr: string, time: string): boolean {
    return getOccupiedSlots(dateStr).includes(time);
  }

  function getAvailableCount(dateStr: string): number {
    return TIME_SLOTS.length - getOccupiedSlots(dateStr).length;
  }

  // ── Envío del formulario ─────────────────────────────────────────────────
  async function handleSubmit() {
    if (!name.trim()) {
      setError("Por favor ingresa tu nombre completo.");
      return;
    }
    if (!phone.trim() && !email.trim()) {
      setError("Necesitamos al menos tu teléfono o email para confirmar la cita.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`/api/widget/${botId}/appointment`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitor_name:     name.trim(),
          visitor_phone:    phone.trim() || null,
          visitor_email:    email.trim() || null,
          appointment_date: selectedDate,
          appointment_time: selectedTime,
        }),
      });

      if (!res.ok) {
        const d = await res.json().catch(() => ({})) as { error?: string };
        throw new Error(d.error ?? `Error ${res.status}`);
      }

      onConfirm(
        `✅ ¡Cita confirmada! Te esperamos el ${formatDateDisplay(selectedDate!)} a las ${selectedTime}. ¡Hasta pronto, ${name.trim()}! 😊`
      );
    } catch (err) {
      setError(
        `No se pudo agendar: ${err instanceof Error ? err.message : "Error desconocido"}. Inténtalo de nuevo.`
      );
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
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

      {/* ── PASO 1: Calendario ───────────────────────────────────────── */}
      {step === "date" && (
        <div className="p-3">

          {/* Navegación de mes */}
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              {MONTHS_ES[viewMonth]} {viewYear}
              {loadingSlots && (
                <span className="text-xs text-gray-400 font-normal animate-pulse">cargando…</span>
              )}
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

          {/* Leyenda */}
          <div className="flex items-center gap-3 mb-2 px-0.5">
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block" />
              <span className="text-xs text-gray-400">Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block" />
              <span className="text-xs text-gray-400">Sin horarios</span>
            </div>
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

              const dateStr     = formatDate(day);
              const past        = isPast(day);
              const fullyBooked = !past && !loadingSlots && isFullyBooked(dateStr);
              const selected    = selectedDate === dateStr;
              const selectable  = !past && !fullyBooked;

              return (
                <button
                  key={i}
                  disabled={!selectable}
                  onClick={() => selectable && setSelectedDate(dateStr)}
                  title={
                    past        ? "Fecha pasada"
                    : fullyBooked ? "Sin horarios disponibles"
                    : `${getAvailableCount(dateStr)} horario(s) disponible(s)`
                  }
                  className={`
                    relative w-8 h-8 mx-auto rounded-full text-xs font-medium transition
                    flex items-center justify-center
                    ${past ? "text-gray-300 cursor-not-allowed" : ""}
                    ${fullyBooked ? "text-red-300 bg-red-50 cursor-not-allowed" : ""}
                    ${selectable && !selected ? "text-gray-700 hover:bg-gray-100 cursor-pointer" : ""}
                    ${selected ? "text-white shadow" : ""}
                  `}
                  style={selected ? { backgroundColor: widgetColor } : undefined}
                >
                  {day}
                  {/* Dot de disponibilidad */}
                  {!past && !selected && (
                    <span
                      className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                        fullyBooked ? "bg-red-400" : loadingSlots ? "bg-gray-300" : "bg-green-400"
                      }`}
                    />
                  )}
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

      {/* ── PASO 2: Horarios ─────────────────────────────────────────── */}
      {step === "time" && (
        <div className="p-3">
          <p className="text-xs text-gray-500 mb-1">
            <strong className="text-gray-700">{formatDateDisplay(selectedDate!)}</strong>
          </p>

          {/* Contador de disponibles */}
          {!loadingSlots && (
            <p className="text-xs mb-3">
              {getAvailableCount(selectedDate!) > 0 ? (
                <span className="text-green-600 font-medium">
                  {getAvailableCount(selectedDate!)} horario{getAvailableCount(selectedDate!) !== 1 ? "s" : ""} disponible{getAvailableCount(selectedDate!) !== 1 ? "s" : ""}
                </span>
              ) : (
                <span className="text-red-500 font-medium">Sin horarios disponibles</span>
              )}
            </p>
          )}

          <div className="grid grid-cols-3 gap-2">
            {TIME_SLOTS.map((t) => {
              const taken = isSlotOccupied(selectedDate!, t);
              const sel   = selectedTime === t;
              return (
                <button
                  key={t}
                  disabled={taken}
                  onClick={() => !taken && setSelectedTime(t)}
                  className={`
                    py-2 rounded-xl text-sm font-medium transition border
                    ${taken
                      ? "bg-gray-100 border-gray-200 text-gray-400 line-through cursor-not-allowed"
                      : sel
                      ? "text-white border-transparent shadow-sm"
                      : "text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50 hover:text-green-800"
                    }
                  `}
                  style={sel ? { backgroundColor: widgetColor, borderColor: widgetColor } : undefined}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 mt-3">
            <button
              onClick={() => { setStep("date"); setSelectedTime(null); }}
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

      {/* ── PASO 3: Datos de contacto ─────────────────────────────────── */}
      {step === "form" && (
        <div className="p-3">

          {/* Resumen de la cita */}
          <div
            className="flex items-center gap-2.5 rounded-xl p-2.5 mb-3 border"
            style={{ backgroundColor: widgetColor + "10", borderColor: widgetColor + "30" }}
          >
            <span className="text-lg flex-shrink-0">📅</span>
            <div>
              <p className="text-xs font-semibold text-gray-800">{formatDateDisplay(selectedDate!)}</p>
              <p className="text-xs text-gray-500">a las {selectedTime}</p>
            </div>
          </div>

          <div className="space-y-2">
            <input
              type="text"
              placeholder="Nombre completo *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
            />
            <input
              type="tel"
              placeholder="Teléfono *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
                !phone.trim() && !email.trim() ? "border-orange-200" : "border-gray-200"
              }`}
              style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
            />
            <input
              type="email"
              placeholder="Email (opcional)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": widgetColor } as React.CSSProperties}
            />
            {!phone.trim() && !email.trim() && (
              <p className="text-xs text-orange-500">
                Se requiere al menos teléfono o email para confirmar la cita.
              </p>
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
              {submitting ? "Agendando…" : "Confirmar cita"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
