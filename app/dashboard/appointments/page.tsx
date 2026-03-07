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
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Citas y Agenda</h1>
          <p className="text-gray-500 mt-1">Gestiona las citas agendadas por tus bots</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSaveError(""); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva cita
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit">
        {(["all", "pending", "confirmed", "cancelled"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
              filter === s ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {s === "all" ? "Todas" : STATUS_LABELS[s].label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
              filter === s ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"
            }`}>
              {counts[s]}
            </span>
          </button>
        ))}
      </div>

      {/* Modal crear cita */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Nueva cita</h2>
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bot *</label>
                <select
                  value={form.bot_id}
                  onChange={(e) => setForm((f) => ({ ...f, bot_id: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                  <input type="text" value={form.service}
                    onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))}
                    placeholder="Ej: Consulta, Corte..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.visitor_email}
                    onChange={(e) => setForm((f) => ({ ...f, visitor_email: e.target.value }))}
                    placeholder="cliente@email.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="tel" value={form.visitor_phone}
                    onChange={(e) => setForm((f) => ({ ...f, visitor_phone: e.target.value }))}
                    placeholder="+1 555 0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha *</label>
                  <input type="date" value={form.appointment_date}
                    onChange={(e) => setForm((f) => ({ ...f, appointment_date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora *</label>
                  <input type="time" value={form.appointment_time}
                    onChange={(e) => setForm((f) => ({ ...f, appointment_time: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Detalles adicionales..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
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
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {saving ? "Guardando..." : "Crear cita"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="text-5xl mb-4">📅</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === "all" ? "Sin citas todavía" : `Sin citas ${STATUS_LABELS[filter]?.label.toLowerCase()}`}
          </h3>
          <p className="text-gray-500 text-sm">
            {filter === "all"
              ? "Las citas aparecerán aquí cuando los clientes agenden a través de tus bots"
              : "No hay citas con este estado actualmente"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((appt) => (
            <div key={appt.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col sm:flex-row sm:items-center gap-4">

              {/* Date block */}
              <div className="flex-shrink-0 w-16 text-center bg-blue-50 rounded-xl py-2 px-1">
                <p className="text-2xl font-black text-blue-700 leading-none">
                  {appt.appointment_date.split("-")[2]}
                </p>
                <p className="text-xs text-blue-500 font-medium uppercase mt-0.5">
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
  );
}
