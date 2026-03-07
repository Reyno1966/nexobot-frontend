"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Bot {
  id: string;
  name: string;
  description: string;
  channel: string;
  status: string;
  messages_count: number;
  created_at: string;
}

const CHANNELS = [
  { value: "web", label: "Web" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "telegram", label: "Telegram" },
  { value: "instagram", label: "Instagram" },
];

const CHANNEL_COLORS: Record<string, string> = {
  web: "bg-blue-100 text-blue-700",
  whatsapp: "bg-green-100 text-green-700",
  telegram: "bg-sky-100 text-sky-700",
  instagram: "bg-pink-100 text-pink-700",
};

export default function BotsPage() {
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", description: "", channel: "web" });

  async function fetchBots() {
    const res = await fetch("/api/bots", { credentials: "include" });
    if (res.ok) setBots((await res.json()).bots ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchBots(); }, []);

  function openCreate() {
    setEditingBot(null);
    setForm({ name: "", description: "", channel: "web" });
    setShowForm(true);
  }

  function openEdit(bot: Bot) {
    setEditingBot(bot);
    setForm({ name: bot.name, description: bot.description ?? "", channel: bot.channel });
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    try {
      if (editingBot) {
        const res = await fetch(`/api/bots/${editingBot.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ ...form, status: editingBot.status }),
        });
        if (res.ok) {
          const { bot } = await res.json();
          setBots((prev) => prev.map((b) => (b.id === bot.id ? bot : b)));
        }
      } else {
        const res = await fetch("/api/bots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        if (res.ok) {
          const { bot } = await res.json();
          setBots((prev) => [bot, ...prev]);
        }
      }
      setShowForm(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleStatus(bot: Bot) {
    const newStatus = bot.status === "active" ? "inactive" : "active";
    const res = await fetch(`/api/bots/${bot.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ name: bot.name, description: bot.description, channel: bot.channel, status: newStatus }),
    });
    if (res.ok) {
      const { bot: updated } = await res.json();
      setBots((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este bot? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    const res = await fetch(`/api/bots/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setBots((prev) => prev.filter((b) => b.id !== id));
    setDeleting(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mis Bots</h1>
          <p className="text-gray-500 mt-1">Gestiona tus asistentes de IA</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear bot
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              {editingBot ? "Editar bot" : "Crear nuevo bot"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ej: Asistente de ventas"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="¿Para qué sirve este bot?"
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canal</label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {CHANNELS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {saving ? "Guardando..." : editingBot ? "Guardar cambios" : "Crear bot"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Empty state */}
      {bots.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes bots aún</h3>
          <p className="text-gray-500 text-sm mb-6">Crea tu primer bot de IA y empieza a automatizar</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition"
          >
            + Crear mi primer bot
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bots.map((bot) => (
            <div key={bot.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold">{bot.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{bot.name}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CHANNEL_COLORS[bot.channel] ?? "bg-gray-100 text-gray-500"}`}>
                      {CHANNELS.find((c) => c.value === bot.channel)?.label ?? bot.channel}
                    </span>
                  </div>
                </div>
                {/* Toggle activo/inactivo */}
                <button
                  onClick={() => handleToggleStatus(bot)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${bot.status === "active" ? "bg-blue-600" : "bg-gray-200"}`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${bot.status === "active" ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>

              {bot.description && (
                <p className="text-sm text-gray-500 line-clamp-2">{bot.description}</p>
              )}

              <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                <p className="text-xs text-gray-400">{bot.messages_count ?? 0} mensajes procesados</p>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/bots/${bot.id}`}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold transition px-2 py-1 rounded-lg hover:bg-blue-50"
                  >
                    ⚙️ Configurar
                  </Link>
                  <button
                    onClick={() => openEdit(bot)}
                    className="text-xs text-gray-500 hover:text-blue-600 font-medium transition px-2 py-1 rounded-lg hover:bg-blue-50"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(bot.id)}
                    disabled={deleting === bot.id}
                    className="text-xs text-gray-500 hover:text-red-600 font-medium transition px-2 py-1 rounded-lg hover:bg-red-50 disabled:opacity-50"
                  >
                    {deleting === bot.id ? "..." : "Eliminar"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
