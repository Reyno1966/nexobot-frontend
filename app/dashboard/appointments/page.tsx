"use client";

import { useEffect, useState } from "react";

interface Appointment {
  id: string;
  bot_id: string;
  visitor_name: string;
  visitor_email: string | null;
  visitor_phone: string | null;
  service: string | null;
  appointment_date: string;
  appointment_time: string;
  notes: string | null;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
  bots?: { name: string };
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  pending:   { label: "Pendiente",  color: "bg-yellow-100 text-yellow-700" },
  confirmed: { label: "Confirmada", color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelada",  color: "bg-red-100 text-red-700" },
};

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split("-");
  const d = new Date(Number(year), Number(month) - 1, Number(day));
  return d.toLocaleDateString("es", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function formatTime(timeStr: string) {
  const [h, m] = timeStr.split(":");
  const hour = Number(h);
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 || 12;
  return `${h12}:${m} ${ampm}`;
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading]           = useState(true);
  const [filter, setFilter]             = useState("all");
  const [showForm, setShowForm]         = useState(false);
  const [saving, setSaving]             = useState(false);
  const [saveError, setSaveError]       = useState("");
  const [deleting, setDeleting]         = useState<string | null>(null);
  const [bots, setBots]                 = useState<{ id: string; name: string }[]>([]);
  const [form, setForm] = useState({
    bot_id: "",
    visitor_name: "",
    visitor_email: "",
    visitor_phone: "",
    service: "",
    appointment_date: "",
    appointment_time: "",
    notes: "",
  });

  useEffect(() => {
    fetchAppointments();
    fetchBots();
  }, []);

  async function fetchAppointments() {
    setLoading(true);
    const res = await fetch("/api/appointments", { credentials: "include" });
    if (res.ok) {
      const d = await res.json();
      setAppointments(d.appointments ?? []);
    }
    setLoading(false);
  }

  async function fetchBots() {
    const res = await fetch("/api/bots", { credentials: "include" });
    if (res.ok) {
      const d = await res.json();
      setBots(d.bots ?? []);
    }
  }

  async function handleStatusChange(id: string, status: string) {
    const res = await fetch(`/api/appointments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: status as Appointment["status"] } : a))
      );
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta cita? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    const res = await fetch(`/api/appointments/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setAppointments((prev) => prev.filter((a) => a.id !== id));
    setDeleting(null);
  }

  async function handleSave() {
    if (!form.bot_id || !form.visitor_name || !form.appointment_date || !form.appointment_time) {
      setSaveError("Completa los campos obligatorios: bot, nombre, fecha y hora.");
      return;
    }
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchAppointments();
        setShowForm(false);
        setForm({ bot_id: "", visitor_name: "", visitor_email: "", visitor_phone: "", service: "", appointment_date: "", appointment_time: "", notes: "" });
      } else {
        setSaveError(data.error ?? "Error al guardar. Intenta de nuevo.");
      }
    } catch {
      setSaveError("Error de conexión. Verifica tu internet.");
    } finally {
      setSaving(false);
    }
  }

  const filtered = appointments.filter((a) => filter === "all" || a.status === filter);
  const counts = {
    all:       appointments.length,
    pending:   appointments.filter((a) => a.status === "pending").length,
    confirmed: appointments.filter((a) => a.status === "confirmed").length,
    cancelled: appointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fafa] via-white to-[#fdf6ee] p-6">
    <div className="max-w-6xl mx-auto">

      {/* Header con degradado */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#062828] to-[#0f4040] rounded-2xl p-6 mb-8 shadow-lg">
        {/* Círculos decorativos */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: "#2CC5C5" }} />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10" style={{ background: "#F5A623" }} />
        <div className="relative flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-8 h-8 rounded-lg bg-[#2CC5C5]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="text-xl font-bold text-white">Citas y Agenda</h1>
            </div>
            <p className="text-[#7ee8e8] text-sm ml-10">Gestiona las citas agendadas por tus bots</p>
          </div>
          <button
            onClick={() => { setShowForm(true); setSaveError(""); }}
            className="flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nueva cita
          </button>
        </div>
        {/* Stats rápidas */}
        <div className="relative grid grid-cols-3 gap-3 mt-5">
          {[
            { label: "Pendientes", value: counts.pending, color: "text-yellow-300" },
            { label: "Confirmadas", value: counts.confirmed, color: "text-green-300" },
            { label: "Total", value: counts.all, color: "text-[#2CC5C5]" },
          ].map((s) => (
            <div key={s.label} className="bg-white/10 rounded-xl px-4 py-3 text-center backdrop-blur-sm">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-white/60 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 bg-white/80 backdrop-blur-sm border border-gray-100 p-1 rounded-xl w-fit shadow-sm">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              filter === s ? "bg-gradient-to-r from-[#2CC5C5] to-[#1AAFAF] text-white shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {s === "all" ? "Todas" : STATUS_LABELS[s].label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filter === s ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
            }`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Modal crear cita */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#062828] to-[#0f4040] px-6 py-4 rounded-t-2xl">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <svg className="w-4 h-4 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Nueva cita
              </h2>
            </div>
            <div className="p-6">
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bot *</label>
                <select
                  value={form.bot_id}
                  onChange={(e) => setForm((f) => ({ ...f, bot_id: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] bg-white"
                >
                  <option value="">Selecciona un bot...</option>
                  {bots.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                  <input type="text" value={form.visitor_name}
                    onChange={(e) => setForm((f) => ({ ...f, visitor_name: e.target.value }))}
                    placeholder="Nombre del cliente"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                  <input type="text" value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    placeholder="Ej: Consulta, Corte..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.visitor_email}
                    onChange={(e) => setForm((f) => ({ ...f, visitor_email: e.target.value }))}
                    placeholder="cliente@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="tel" value={form.visitor_phone}
                    onChange={(e) => setForm((f) => ({ ...f, visitor_phone: e.target.value }))}
                    placeholder="+1 555 0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input type="date" value={form.appointment_date}
                    onChange={(e) => setForm((f) => ({ ...f, appointment_date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
                  <input type="time" value={form.appointment_time}
                    onChange={(e) => setForm((f) => ({ ...f, appointment_time: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Detalles adicionales..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] resize-none"
                />
              </div>
            </div>

            {saveError && (
              <div className="mt-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                ⚠️ {saveError}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button onClick={() => { setShowForm(false); setSaveError(""); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50">
                {saving ? "Guardando..." : "Crear cita"}
              </button>
            </div>
          </div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="relative overflow-hidden bg-white rounded-2xl border border-[#2CC5C5]/20 shadow-sm py-16 text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0fafa] to-white" />
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: "#2CC5C5", transform: "translate(30%, -30%)" }} />
          <div className="relative">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-[#2CC5C5]/20 to-[#F5A623]/20 mb-4 shadow-inner">
              <svg className="w-10 h-10 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              {filter === "all" ? "Sin citas todavía" : `Sin citas ${STATUS_LABELS[filter]?.label.toLowerCase()}`}
            </h3>
            <p className="text-gray-400 text-sm max-w-xs mx-auto">
              {filter === "all"
                ? "Las citas aparecerán aquí cuando los clientes agenden a través de tus bots"
                : "No hay citas con este estado actualmente"}
            </p>
            {filter === "all" && (
              <button
                onClick={() => { setShowForm(true); setSaveError(""); }}
                className="mt-5 inline-flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-md"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Crear primera cita
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((appt) => (
            <div key={appt.id}
              className="bg-white/80 backdrop-blur-sm rounded-2xl border border-[#2CC5C5]/10 shadow-sm hover:shadow-md transition p-5 flex flex-col sm:flex-row sm:items-center gap-4">

              {/* Date block */}
              <div className="flex-shrink-0 w-16 text-center bg-gradient-to-br from-[#2CC5C5]/15 to-[#F5A623]/10 rounded-xl py-2 px-1 border border-[#2CC5C5]/20">
                <p className="text-2xl font-black text-[#0f4040] leading-none">
                  {appt.appointment_date.split("-")[2]}
                </p>
                <p className="text-xs text-[#2CC5C5] font-medium uppercase mt-0.5">
                  {new Date(appt.appointment_date + "T12:00:00").toLocaleDateString("es", { month: "short" })}
                </p>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900">{appt.visitor_name}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_LABELS[appt.status]?.color}`}>
                    {STATUS_LABELS[appt.status]?.label}
                  </span>
                  {appt.service && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{appt.service}</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5">
                  <p className="text-sm text-gray-500">🕐 {formatTime(appt.appointment_time)}</p>
                  <p className="text-sm text-gray-500">📅 {formatDate(appt.appointment_date)}</p>
                  {appt.visitor_email && <p className="text-sm text-gray-500">✉️ {appt.visitor_email}</p>}
                  {appt.visitor_phone && <p className="text-sm text-gray-500">📞 {appt.visitor_phone}</p>}
                  {appt.bots?.name && <p className="text-sm text-gray-400">🤖 {appt.bots.name}</p>}
                </div>
                {appt.notes && <p className="text-xs text-gray-400 mt-1.5 italic">💬 {appt.notes}</p>}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                {appt.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleStatusChange(appt.id, "confirmed")}
                      className="px-3 py-1.5 bg-green-50 text-green-700 text-xs font-semibold rounded-lg hover:bg-green-100 transition"
                    >
                      ✓ Confirmar
                    </button>
                    <button
                      onClick={() => handleStatusChange(appt.id, "cancelled")}
                      className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition"
                    >
                      ✗ Cancelar
                    </button>
                  </>
                )}
                {appt.status === "confirmed" && (
                  <button
                    onClick={() => handleStatusChange(appt.id, "cancelled")}
                    className="px-3 py-1.5 bg-red-50 text-red-700 text-xs font-semibold rounded-lg hover:bg-red-100 transition"
                  >
                    ✗ Cancelar
                  </button>
                )}
                {appt.status === "cancelled" && (
                  <button
                    onClick={() => handleStatusChange(appt.id, "pending")}
                    className="px-3 py-1.5 bg-yellow-50 text-yellow-700 text-xs font-semibold rounded-lg hover:bg-yellow-100 transition"
                  >
                    ↩ Restaurar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(appt.id)}
                  disabled={deleting === appt.id}
                  className="px-3 py-1.5 text-gray-400 text-xs font-medium rounded-lg hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                >
                  {deleting === appt.id ? "..." : "🗑️"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
