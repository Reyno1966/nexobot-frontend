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
  { value: "web",       label: "🌐 Web" },
  { value: "whatsapp",  label: "💬 WhatsApp" },
  { value: "facebook",  label: "📘 Facebook" },
  { value: "messenger", label: "💙 Facebook Messenger" },
  { value: "instagram", label: "📸 Instagram" },
  { value: "telegram",  label: "✈️ Telegram" },
  { value: "email",     label: "📧 Email" },
];

const CHANNEL_COLORS: Record<string, string> = {
  web:       "bg-[#EEF9F9] text-[#2CC5C5]",
  whatsapp:  "bg-green-100 text-green-700",
  facebook:  "bg-blue-100 text-blue-800",
  messenger: "bg-purple-100 text-purple-700",
  instagram: "bg-pink-100 text-pink-700",
  telegram:  "bg-sky-100 text-sky-700",
  email:     "bg-violet-100 text-violet-700",
};

// ── Plantillas de bots pre-configurados ──
const BOT_TEMPLATES = [
  {
    id: "support",
    emoji: "🤝",
    name: "Soporte al cliente",
    description: "Resuelve dudas y tickets de soporte",
    defaultName: "Asistente de Soporte",
    defaultDesc: "Bot de soporte al cliente",
    systemPrompt: "Eres un asistente de soporte al cliente amable y profesional de [Tu Empresa]. Tu misión es ayudar a los clientes a resolver dudas, problemas técnicos y consultas sobre productos o servicios. Responde siempre en español, de forma clara y concisa. Si no puedes resolver algo, ofrece escalar con un agente humano.",
  },
  {
    id: "store",
    emoji: "🛒",
    name: "Tienda en línea",
    description: "Asistente de ventas y catálogo",
    defaultName: "Asistente de Ventas",
    defaultDesc: "Bot de ventas y catálogo",
    systemPrompt: "Eres un asistente de ventas amable de [Tu Tienda]. Tu objetivo es ayudar a los clientes a encontrar el producto ideal, responder preguntas sobre precios, disponibilidad y tiempos de envío. Motiva la compra con información útil. Responde siempre en español de forma profesional y entusiasta.",
  },
  {
    id: "clinic",
    emoji: "🏥",
    name: "Clínica / Salud",
    description: "Citas, servicios médicos y orientación",
    defaultName: "Asistente de Salud",
    defaultDesc: "Bot de citas y servicios médicos",
    systemPrompt: `Eres un asistente virtual de [Tu Clínica]. Tu objetivo principal es agendar citas médicas de forma ordenada y profesional.

FLUJO DE AGENDAMIENTO (sigue este orden, de a una pregunta por vez):
1. Saluda con calidez y pregunta en qué puedes ayudar.
2. Si desea una cita, pide su NOMBRE COMPLETO.
3. Pregunta el SERVICIO o especialidad que necesita (ej: medicina general, odontología, nutrición).
4. Pregunta la FECHA deseada (pídela en formato día/mes/año, ej: 15/03/2026).
5. Pregunta la HORA preferida (ej: 10:00 AM, 3:00 PM).
6. Pregunta su TELÉFONO de contacto.
7. Pregunta su EMAIL (opcional).
8. Resume todos los datos y confirma con un mensaje como: "¡Tu cita ha sido confirmada! Te esperamos el [fecha] a las [hora] para [servicio]. Nombre: [nombre]. Te contactaremos al [teléfono] si hay algún cambio."

REGLAS:
- Haz UNA sola pregunta a la vez, espera la respuesta antes de continuar.
- Si el usuario da fecha y hora juntas, acéptala y continúa.
- No des diagnósticos ni recomendaciones de medicamentos.
- Para urgencias indica llamar directamente a la clínica.
- Responde siempre en español con empatía y profesionalismo.`,
  },
  {
    id: "restaurant",
    emoji: "🍽️",
    name: "Restaurante",
    description: "Menú, reservas y pedidos",
    defaultName: "Asistente del Restaurante",
    defaultDesc: "Bot de menú y reservaciones",
    systemPrompt: `Eres el asistente virtual de [Tu Restaurante]. Ayudas con el menú, precios y reservaciones.

FLUJO DE RESERVACIÓN (sigue este orden, una pregunta por vez):
1. Saluda con calidez. Si el cliente quiere reservar, inicia el flujo.
2. Pide su NOMBRE COMPLETO.
3. Pregunta la FECHA de la reservación (formato día/mes/año, ej: 20/03/2026).
4. Pregunta la HORA (ej: 8:00 PM).
5. Pregunta el NÚMERO DE PERSONAS (esto va como servicio: "Mesa para X personas").
6. Pide su TELÉFONO de contacto.
7. Pregunta si tiene alguna preferencia especial (alergias, zona, ocasión especial) — esto va en notas.
8. Confirma con: "¡Reservación confirmada! Mesa para [X personas] el [fecha] a las [hora]. Nombre: [nombre]. Te contactaremos al [teléfono]. ¡Te esperamos!"

REGLAS:
- Haz UNA sola pregunta a la vez.
- Si el usuario ya dio varios datos juntos, acéptalos y pide lo que falta.
- Responde siempre en español, de forma cálida y acogedora.`,
  },
  {
    id: "blank",
    emoji: "✏️",
    name: "Personalizado",
    description: "Empieza desde cero",
    defaultName: "",
    defaultDesc: "",
    systemPrompt: "",
  },
];

type FormState = { name: string; description: string; channel: string; system_prompt: string };

export default function BotsPage() {
  const [bots, setBots]             = useState<Bot[]>([]);
  const [loading, setLoading]       = useState(true);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showForm, setShowForm]     = useState(false);
  const [editingBot, setEditingBot] = useState<Bot | null>(null);
  const [saving, setSaving]         = useState(false);
  const [saveError, setSaveError]   = useState("");
  const [deleting, setDeleting]     = useState<string | null>(null);
  const [form, setForm]             = useState<FormState>({ name: "", description: "", channel: "web", system_prompt: "" });

  async function fetchBots() {
    const res = await fetch("/api/bots", { credentials: "include" });
    if (res.ok) setBots((await res.json()).bots ?? []);
    setLoading(false);
  }

  useEffect(() => { fetchBots(); }, []);

  function openCreate() {
    setEditingBot(null);
    setForm({ name: "", description: "", channel: "web", system_prompt: "" });
    setShowTemplates(true);
  }

  function openEdit(bot: Bot) {
    setEditingBot(bot);
    setForm({ name: bot.name, description: bot.description ?? "", channel: bot.channel, system_prompt: "" });
    setShowTemplates(false);
    setShowForm(true);
  }

  function selectTemplate(template: typeof BOT_TEMPLATES[0]) {
    setForm({
      name:          template.defaultName,
      description:   template.defaultDesc,
      channel:       "web",
      system_prompt: template.systemPrompt,
    });
    setShowTemplates(false);
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    setSaving(true);
    setSaveError("");
    try {
      if (editingBot) {
        const res = await fetch(`/api/bots/${editingBot.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ name: form.name, description: form.description, channel: form.channel, status: editingBot.status }),
        });
        const data = await res.json();
        if (res.ok) {
          setBots((prev) => prev.map((b) => (b.id === data.bot.id ? data.bot : b)));
          setShowForm(false);
        } else {
          setSaveError(data.error ?? "Error al guardar. Intenta de nuevo.");
        }
      } else {
        const res = await fetch("/api/bots", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(form),
        });
        const data = await res.json();
        if (res.ok) {
          setBots((prev) => [data.bot, ...prev]);
          setShowForm(false);
        } else {
          setSaveError(data.error ?? "Error al crear el bot. Intenta de nuevo.");
        }
      }
    } catch {
      setSaveError("Error de conexión. Verifica tu internet e intenta de nuevo.");
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
        <div className="w-10 h-10 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
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
          className="flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Crear bot
        </button>
      </div>

      {/* ── Modal: Selección de plantilla ── */}
      {showTemplates && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">¿Qué tipo de bot quieres crear?</h2>
            <p className="text-sm text-gray-500 mb-5">Elige una plantilla para empezar más rápido</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {BOT_TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => selectTemplate(t)}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-100 hover:border-[#B8EDED] hover:bg-[#EEF9F9] transition text-center group"
                >
                  <span className="text-3xl">{t.emoji}</span>
                  <span className="text-sm font-semibold text-gray-800 group-hover:text-[#2CC5C5] transition">{t.name}</span>
                  <span className="text-xs text-gray-400">{t.description}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowTemplates(false)}
              className="mt-5 w-full py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ── Modal: Formulario de creación / edición ── */}
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
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="¿Para qué sirve este bot?"
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Canal</label>
                <select
                  value={form.channel}
                  onChange={(e) => setForm((f) => ({ ...f, channel: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] bg-white"
                >
                  {CHANNELS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              {/* Indicador de plantilla aplicada */}
              {!editingBot && form.system_prompt && (
                <div className="flex items-center gap-2 bg-[#EEF9F9] rounded-xl px-3 py-2">
                  <svg className="w-4 h-4 text-[#2CC5C5] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-xs text-[#2CC5C5] font-medium">
                    Plantilla aplicada — puedes personalizar la IA desde la configuración del bot
                  </p>
                </div>
              )}
            </div>

            {saveError && (
              <div className="mt-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                ⚠️ {saveError}
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => { setShowForm(false); setSaveError(""); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name.trim()}
                className="flex-1 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
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
          <div className="w-20 h-20 bg-[#EEF9F9] rounded-2xl flex items-center justify-center mx-auto mb-5">
            <svg className="w-10 h-10 text-[#B8EDED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No tienes bots aún</h3>
          <p className="text-gray-500 text-sm mb-6">Crea tu primer bot de IA y empieza a automatizar</p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition"
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
                  <div className="w-10 h-10 bg-[#EEF9F9] rounded-xl flex items-center justify-center">
                    <span className="text-[#2CC5C5] font-bold">{bot.name.charAt(0).toUpperCase()}</span>
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
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${bot.status === "active" ? "bg-[#2CC5C5]" : "bg-gray-200"}`}
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
                    className="text-xs text-[#2CC5C5] hover:text-[#23A5A5] font-semibold transition px-2 py-1 rounded-lg hover:bg-[#EEF9F9]"
                  >
                    ⚙️ Configurar
                  </Link>
                  <button
                    onClick={() => openEdit(bot)}
                    className="text-xs text-gray-500 hover:text-[#2CC5C5] font-medium transition px-2 py-1 rounded-lg hover:bg-[#EEF9F9]"
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
