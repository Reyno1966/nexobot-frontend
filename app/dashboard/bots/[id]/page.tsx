"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Bot {
  id: string;
  name: string;
  description: string;
  channel: string;
  status: string;
  system_prompt: string;
  messages_count: number;
  messages_this_month: number;
  widget_color: string;
  welcome_message: string;
  notify_email: string | null;
  notify_whatsapp: string | null;
  notify_telegram_token: string | null;
  notify_telegram_chat_id: string | null;
  agent_enabled: boolean;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://nexobot.net";

const COLOR_PRESETS = [
  "#2CC5C5", // Teal (default NexoBot)
  "#6366F1", // Indigo
  "#EC4899", // Pink
  "#F59E0B", // Amber
  "#10B981", // Emerald
  "#3B82F6", // Blue
  "#EF4444", // Red
  "#8B5CF6", // Violet
];

export default function BotDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [bot, setBot] = useState<Bot | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Form
  const [systemPrompt, setSystemPrompt] = useState("");
  const [botName, setBotName] = useState("");
  const [description, setDescription] = useState("");
  const [widgetColor, setWidgetColor] = useState("#2CC5C5");
  const [welcomeMessage, setWelcomeMessage] = useState("¡Hola! 👋 ¿En qué puedo ayudarte hoy?");
  const [hexInput, setHexInput] = useState("#2CC5C5");
  const [agentEnabled, setAgentEnabled] = useState(false);

  // Chat test
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Notificaciones
  const [notifyEmail, setNotifyEmail]               = useState("");
  const [notifyWhatsapp, setNotifyWhatsapp]         = useState("");
  const [notifyTelegramToken, setNotifyTelegramToken]   = useState("");
  const [notifyTelegramChatId, setNotifyTelegramChatId] = useState("");
  const [notifySaved, setNotifySaved]               = useState(false);
  const [notifySaving, setNotifySaving]             = useState(false);

  // Tab
  const [activeTab, setActiveTab] = useState<"config" | "appearance" | "test" | "embed" | "notifications" | "analytics" | "whatsapp">("config");
  const [copiedLink, setCopiedLink] = useState(false);

  // WhatsApp connection
  interface WAConnection {
    id: string;
    phone_number_id: string;
    display_phone: string | null;
    active: boolean;
    has_token: boolean;
    created_at: string;
  }
  interface WAVerifyResult {
    displayName: string | null;
    phoneNumber: string | null;
  }
  const [waConnection, setWaConnection]       = useState<WAConnection | null>(null);
  const [waLoading, setWaLoading]             = useState(false);
  const [waSaving, setWaSaving]               = useState(false);
  const [waPhoneNumberId, setWaPhoneNumberId] = useState("");
  const [waDisplayPhone, setWaDisplayPhone]   = useState("");
  const [waToken, setWaToken]                 = useState("");
  const [waHasToken, setWaHasToken]           = useState(false);
  const [waShowToken, setWaShowToken]         = useState(false);
  const [waVerifying, setWaVerifying]         = useState(false);
  const [waVerified, setWaVerified]           = useState<WAVerifyResult | null>(null);
  const [waVerifyError, setWaVerifyError]     = useState("");
  const [waSaved, setWaSaved]                 = useState(false);
  const [waError, setWaError]                 = useState("");

  // Analytics
  interface BotAnalytics {
    totalMessages: number;
    messagesThisMonth: number;
    totalConversations: number;
    convsThisWeek: number;
    convsToday: number;
    lastActivity: string | null;
    dailyData: { date: string; count: number }[];
  }
  const [analytics, setAnalytics] = useState<BotAnalytics | null>(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(`${APP_URL}/widget/${id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  }

  async function loadAnalytics() {
    if (analytics || analyticsLoading) return;
    setAnalyticsLoading(true);
    try {
      const res = await fetch(`/api/bots/${id}/analytics`, { credentials: "include" });
      if (res.ok) setAnalytics(await res.json());
    } catch { /* silencioso */ }
    setAnalyticsLoading(false);
  }

  async function loadWAConnection() {
    if (waLoading) return;
    setWaLoading(true);
    try {
      const res = await fetch(`/api/whatsapp/connections?botId=${id}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        setWaConnection(data.connection);
        if (data.connection) {
          setWaPhoneNumberId(data.connection.phone_number_id ?? "");
          setWaDisplayPhone(data.connection.display_phone ?? "");
          setWaHasToken(data.connection.has_token ?? false);
        }
      }
    } catch { /* silencioso */ }
    setWaLoading(false);
  }

  async function handleVerifyWA() {
    const tokenToVerify = waToken.trim();
    if (!waPhoneNumberId.trim() || !tokenToVerify) {
      setWaVerifyError("Ingresa el Phone Number ID y el token antes de verificar.");
      return;
    }
    setWaVerifying(true);
    setWaVerified(null);
    setWaVerifyError("");
    try {
      const res = await fetch("/api/whatsapp/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ botId: id, phoneNumberId: waPhoneNumberId, waToken: tokenToVerify }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setWaVerifyError(data.error ?? "No se pudo verificar la conexión con Meta.");
      } else {
        setWaVerified({ displayName: data.displayName, phoneNumber: data.phoneNumber });
        // Autocompletar display_phone si está vacío
        if (!waDisplayPhone && data.phoneNumber) {
          setWaDisplayPhone(data.phoneNumber);
        }
      }
    } catch {
      setWaVerifyError("Error de red al verificar.");
    }
    setWaVerifying(false);
  }

  async function handleSaveWA() {
    setWaSaving(true);
    setWaError("");
    try {
      const body: Record<string, string> = {
        botId:         id,
        phoneNumberId: waPhoneNumberId,
        displayPhone:  waDisplayPhone,
      };
      // Solo enviar waToken si el usuario escribió uno nuevo
      if (waToken.trim()) body.waToken = waToken.trim();

      const res = await fetch("/api/whatsapp/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setWaError(data.error ?? "Error al guardar");
      } else {
        setWaConnection(data.connection);
        setWaHasToken(data.connection?.has_token ?? false);
        setWaToken(""); // Limpiar campo de token tras guardar
        setWaSaved(true);
        setTimeout(() => setWaSaved(false), 2500);
      }
    } catch {
      setWaError("Error de conexión");
    }
    setWaSaving(false);
  }

  async function handleDisconnectWA() {
    if (!confirm("¿Desactivar la integración de WhatsApp para este bot?")) return;
    const res = await fetch(`/api/whatsapp/connections?botId=${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (res.ok) {
      setWaConnection(null);
      setWaPhoneNumberId("");
      setWaDisplayPhone("");
      setWaToken("");
      setWaHasToken(false);
      setWaVerified(null);
    }
  }

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/bots", { credentials: "include" });
      if (!res.ok) { router.push("/dashboard/bots"); return; }
      const data = await res.json();
      const found = (data.bots ?? []).find((b: Bot) => b.id === id);
      if (!found) { router.push("/dashboard/bots"); return; }
      setBot(found);
      setBotName(found.name);
      setDescription(found.description ?? "");
      setSystemPrompt(found.system_prompt ?? "");
      const color = found.widget_color ?? "#2CC5C5";
      setWidgetColor(color);
      setHexInput(color);
      setWelcomeMessage(found.welcome_message ?? "¡Hola! 👋 ¿En qué puedo ayudarte hoy?");
      setNotifyEmail(found.notify_email ?? "");
      setNotifyWhatsapp(found.notify_whatsapp ?? "");
      setNotifyTelegramToken(found.notify_telegram_token ?? "");
      setNotifyTelegramChatId(found.notify_telegram_chat_id ?? "");
      setAgentEnabled(found.agent_enabled ?? false);
      setLoading(false);
    }
    load();
  }, [id, router]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, chatLoading]);

  function handleColorChange(color: string) {
    setWidgetColor(color);
    setHexInput(color);
  }

  function handleHexInput(value: string) {
    setHexInput(value);
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setWidgetColor(value);
    }
  }

  async function handleSave() {
    if (!bot) return;
    setSaving(true);
    const res = await fetch(`/api/bots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: botName,
        description,
        channel: bot.channel,
        status: bot.status,
        system_prompt: systemPrompt,
        widget_color: widgetColor,
        welcome_message: welcomeMessage,
        notify_email: notifyEmail || null,
        notify_whatsapp: notifyWhatsapp || null,
        notify_telegram_token: notifyTelegramToken || null,
        notify_telegram_chat_id: notifyTelegramChatId || null,
        agent_enabled: agentEnabled,
      }),
    });
    if (res.ok) {
      const { bot: updated } = await res.json();
      setBot(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    }
    setSaving(false);
  }

  async function handleSaveNotifications() {
    if (!bot) return;
    setNotifySaving(true);
    const res = await fetch(`/api/bots/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        name: botName,
        description,
        channel: bot.channel,
        status: bot.status,
        system_prompt: systemPrompt,
        widget_color: widgetColor,
        welcome_message: welcomeMessage,
        notify_email: notifyEmail || null,
        notify_whatsapp: notifyWhatsapp || null,
        notify_telegram_token: notifyTelegramToken || null,
        notify_telegram_chat_id: notifyTelegramChatId || null,
      }),
    });
    if (res.ok) {
      setNotifySaved(true);
      setTimeout(() => setNotifySaved(false), 2500);
    }
    setNotifySaving(false);
  }

  async function handleChat(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = chatInput.trim();
    setChatInput("");
    setChatError("");
    setChatHistory((h) => [...h, { role: "user", content: userMsg }]);
    setChatLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ botId: id, message: userMsg, history: chatHistory }),
      });
      const data = await res.json();
      if (data.error) {
        setChatError(data.error);
        setChatHistory((h) => h.slice(0, -1));
      } else {
        setChatHistory((h) => [...h, { role: "assistant", content: data.reply }]);
        if (bot) setBot({ ...bot, messages_count: (bot.messages_count ?? 0) + 1, messages_this_month: (bot.messages_this_month ?? 0) + 1 });
      }
    } catch {
      setChatError("Error de conexión");
      setChatHistory((h) => h.slice(0, -1));
    } finally {
      setChatLoading(false);
    }
  }

  const embedCode = `<!-- NexoBot Widget -->
<script>
  window.NexoBotConfig = { botId: "${id}", appUrl: "${APP_URL}" };
  (function(d,s){var j=d.createElement(s);j.src="${APP_URL}/widget.js";d.head.appendChild(j);})(document,"script");
</script>`;

  const iframeCode = `<iframe
  src="${APP_URL}/widget/${id}"
  style="position:fixed;bottom:20px;right:20px;width:380px;height:560px;border:none;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:9999"
  allow="microphone">
</iframe>`;

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard/bots" className="text-gray-400 hover:text-gray-600 transition">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{bot?.name}</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${bot?.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
              {bot?.status === "active" ? "● Activo" : "● Inactivo"}
            </span>
            <span className="ml-2">{bot?.messages_count ?? 0} mensajes totales · {bot?.messages_this_month ?? 0} este mes</span>
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6 w-fit">
        {([
          { key: "config", label: "⚙️ Configuración" },
          { key: "appearance", label: "🎨 Apariencia" },
          { key: "test", label: "💬 Probar bot" },
          { key: "embed", label: "🔗 Instalar" },
          { key: "notifications", label: "🔔 Notificaciones" },
          { key: "analytics", label: "📊 Analytics" },
          { key: "whatsapp", label: "📱 WhatsApp" },
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              setActiveTab(tab.key);
              if (tab.key === "analytics") loadAnalytics();
              if (tab.key === "whatsapp") loadWAConnection();
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── TAB: CONFIGURACIÓN ── */}
      {activeTab === "config" && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-4">Información básica</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre del bot</label>
                <input
                  type="text"
                  value={botName}
                  onChange={(e) => setBotName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Descripción</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="¿Para qué sirve este bot?"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="font-semibold text-gray-900">Personalidad del agente</h2>
                <p className="text-sm text-gray-500 mt-0.5">Define cómo debe comportarse tu bot con los clientes</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${systemPrompt.length > 1300 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                {systemPrompt.length}/1500
              </span>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value.substring(0, 1500))}
              rows={10}
              placeholder={`Ejemplo para bot de citas:\nEres el asistente de [Tu Empresa]. Tu objetivo es agendar citas.\n\nFLUJO (una pregunta por vez):\n1. Saluda y pregunta en qué puedes ayudar.\n2. Pide el NOMBRE COMPLETO.\n3. Pregunta el SERVICIO deseado.\n4. Pide la FECHA (formato DD/MM/YYYY).\n5. Pide la HORA (ej: 10:00 AM).\n6. Pide el TELÉFONO.\n7. Confirma: "¡Cita confirmada! Te esperamos el [fecha] a las [hora]."`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] resize-none mt-3 leading-relaxed"
            />
            <p className="text-xs text-gray-400 mt-2">
              💡 Para bots de citas: incluye un flujo paso a paso y termina confirmando con la fecha y hora. Máximo 1500 caracteres.
            </p>
          </div>

          {/* Agente AI */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-gray-900">Agente AI</h2>
                  <span className="text-xs font-bold bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-2 py-0.5 rounded-full">NUEVO</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  El agente puede consultar tu inventario, agendar citas y buscar productos en tiempo real usando herramientas inteligentes.
                  {agentEnabled && <span className="ml-1 text-[#2CC5C5] font-medium">Activo</span>}
                </p>
                {agentEnabled && (
                  <ul className="mt-3 space-y-1 text-xs text-gray-500">
                    <li className="flex items-center gap-1.5"><span className="text-[#2CC5C5]">✓</span>Consultar inventario y precios</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#2CC5C5]">✓</span>Buscar productos por nombre</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#2CC5C5]">✓</span>Verificar disponibilidad de citas</li>
                    <li className="flex items-center gap-1.5"><span className="text-[#2CC5C5]">✓</span>Agendar citas automáticamente</li>
                  </ul>
                )}
              </div>
              <button
                onClick={() => setAgentEnabled(!agentEnabled)}
                className={`relative flex-shrink-0 ml-4 w-12 h-6 rounded-full transition-colors ${agentEnabled ? "bg-[#2CC5C5]" : "bg-gray-200"}`}
                aria-label="Activar/desactivar Agente AI"
              >
                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${agentEnabled ? "translate-x-6" : "translate-x-0"}`} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm"
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
            {saved && (
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                ✓ Guardado correctamente
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: APARIENCIA ── */}
      {activeTab === "appearance" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left: Settings */}
          <div className="space-y-6">

            {/* Color picker */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-1">Color principal</h2>
              <p className="text-sm text-gray-500 mb-4">Se aplica a botones, burbujas y avatar del widget</p>

              {/* Preset swatches */}
              <div className="flex items-center gap-2.5 flex-wrap mb-4">
                {COLOR_PRESETS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    title={color}
                    className="w-9 h-9 rounded-full transition-all duration-150 ring-offset-2"
                    style={{
                      backgroundColor: color,
                      boxShadow: widgetColor === color ? `0 0 0 3px ${color}55, 0 0 0 5px ${color}` : undefined,
                      transform: widgetColor === color ? "scale(1.15)" : undefined,
                    }}
                  />
                ))}
              </div>

              {/* Custom hex + native picker */}
              <div className="flex items-center gap-3">
                <div className="relative">
                  <input
                    type="color"
                    value={widgetColor}
                    onChange={(e) => handleColorChange(e.target.value)}
                    className="w-10 h-10 rounded-xl cursor-pointer border border-gray-200 p-0.5 bg-white"
                    title="Color personalizado"
                  />
                </div>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <span className="px-3 py-2.5 text-gray-400 text-sm bg-gray-50 border-r border-gray-200 font-mono">#</span>
                  <input
                    type="text"
                    value={hexInput.replace("#", "")}
                    onChange={(e) => handleHexInput(`#${e.target.value}`)}
                    maxLength={6}
                    placeholder="2CC5C5"
                    className="px-3 py-2.5 text-sm font-mono w-24 focus:outline-none"
                  />
                </div>
                <div
                  className="w-10 h-10 rounded-xl border border-gray-100 flex-shrink-0"
                  style={{ backgroundColor: widgetColor }}
                />
              </div>
            </div>

            {/* Welcome message */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="font-semibold text-gray-900 mb-1">Mensaje de bienvenida</h2>
              <p className="text-sm text-gray-500 mb-3">El primer mensaje que verá el visitante al abrir el chat</p>
              <textarea
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value.substring(0, 200))}
                rows={3}
                placeholder="¡Hola! 👋 ¿En qué puedo ayudarte hoy?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] resize-none"
              />
              <p className="text-xs text-gray-400 mt-1.5">{welcomeMessage.length}/200 caracteres</p>
            </div>

            {/* Save button */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm"
              >
                {saving ? "Guardando..." : "Guardar apariencia"}
              </button>
              {saved && (
                <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                  ✓ Guardado correctamente
                </span>
              )}
            </div>
          </div>

          {/* Right: Live preview */}
          <div className="lg:sticky lg:top-6">
            <p className="text-sm font-medium text-gray-500 mb-3">Vista previa en tiempo real</p>
            <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg max-w-sm mx-auto">

              {/* Widget header */}
              <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#041414] to-[#062828]">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: widgetColor }}
                >
                  {(botName || "B").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{botName || "Mi Bot"}</p>
                  <p className="text-green-400 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" /> En línea
                  </p>
                </div>
              </div>

              {/* Sample messages */}
              <div className="bg-gray-50 p-4 space-y-3 min-h-[200px]">
                {/* Bot welcome */}
                <div className="flex gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: widgetColor }}
                  >
                    {(botName || "B").charAt(0).toUpperCase()}
                  </div>
                  <div className="bg-white text-gray-800 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm border border-gray-100 max-w-[220px] leading-relaxed">
                    {welcomeMessage || "¡Hola! 👋 ¿En qué puedo ayudarte hoy?"}
                  </div>
                </div>

                {/* User sample bubble */}
                <div className="flex justify-end">
                  <div
                    className="text-white text-xs rounded-2xl rounded-br-sm px-3 py-2.5 max-w-[160px]"
                    style={{ backgroundColor: widgetColor }}
                  >
                    ¿Cuál es el precio?
                  </div>
                </div>

                {/* Bot reply sample */}
                <div className="flex gap-2">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: widgetColor }}
                  >
                    {(botName || "B").charAt(0).toUpperCase()}
                  </div>
                  <div className="bg-white text-gray-800 text-xs rounded-2xl rounded-bl-sm px-3 py-2.5 shadow-sm border border-gray-100 max-w-[220px] leading-relaxed">
                    Tenemos planes desde $14/mes. ¿Te gustaría saber más detalles?
                  </div>
                </div>
              </div>

              {/* Input preview */}
              <div className="flex items-center gap-2 px-3 py-2.5 bg-white border-t border-gray-100">
                <div className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-400">
                  Escribe tu mensaje...
                </div>
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: widgetColor }}
                >
                  <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>

              {/* Powered by */}
              <div className="text-center py-1.5 bg-white border-t border-gray-50">
                <span className="text-[10px] text-gray-300">Powered by NexoBot</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 text-center mt-3">
              Los cambios se verán en vivo al guardar
            </p>
          </div>
        </div>
      )}

      {/* ── TAB: PROBAR BOT ── */}
      {activeTab === "test" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ height: "560px" }}>

          {/* Chat header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#041414] to-[#062828]">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: widgetColor }}
            >
              {bot?.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-white font-semibold text-sm">{bot?.name}</p>
              <p className="text-green-400 text-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span> En línea
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50">
            {chatHistory.length === 0 && (
              <div className="text-center text-gray-400 text-sm mt-8">
                <div className="text-4xl mb-3">💬</div>
                <p className="font-medium">Empieza una conversación</p>
                <p className="text-xs mt-1">Escribe un mensaje para probar tu bot</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: widgetColor }}
                  >
                    {bot?.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
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
            {chatLoading && (
              <div className="flex gap-2 justify-start">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ backgroundColor: widgetColor }}
                >
                  {bot?.name.charAt(0).toUpperCase()}
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
            {chatError && (
              <div className="bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl px-4 py-2.5 text-center">
                ⚠️ {chatError}
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleChat} className="flex items-center gap-3 px-4 py-3 border-t border-gray-100 bg-white">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Escribe un mensaje..."
              disabled={chatLoading}
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={chatLoading || !chatInput.trim()}
              className="w-10 h-10 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition disabled:opacity-40 flex-shrink-0"
              style={{ backgroundColor: widgetColor }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* ── TAB: INSTALAR ── */}
      {activeTab === "embed" && (
        <div className="space-y-6">

          {/* SHARE LINK */}
          <div className="bg-gradient-to-r from-[#041414] to-[#062828] rounded-2xl p-6 shadow-md">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="font-bold text-white text-lg">🔗 Link directo de tu chatbot</h2>
                <p className="text-white/50 text-sm mt-1">
                  Comparte este link con tus clientes — pueden chatear sin instalar nada
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/10 rounded-xl px-4 py-3 border border-white/10 mb-4">
              <span className="text-[#2CC5C5] text-sm font-mono flex-1 break-all">
                {APP_URL}/widget/{id}
              </span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyLink}
                className="flex items-center gap-2 bg-[#2CC5C5] hover:bg-[#25aFaF] text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition"
              >
                {copiedLink ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    ¡Copiado!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copiar link
                  </>
                )}
              </button>
              <a
                href={`${APP_URL}/widget/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver en vivo
              </a>
            </div>
          </div>

          {/* Booking page link */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">📅 Página de reservas pública</h2>
            <p className="text-sm text-gray-500 mb-4">Link directo para que los clientes agenden citas sin pasar por el chat</p>
            <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 border border-gray-200 mb-3">
              <span className="text-[#2CC5C5] text-sm font-mono flex-1 break-all">{APP_URL}/book/{id}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => { navigator.clipboard.writeText(`${APP_URL}/book/${id}`); }}
                className="flex-1 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
              >
                Copiar link
              </button>
              <a
                href={`${APP_URL}/book/${id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold text-center hover:opacity-90 transition"
              >
                Abrir →
              </a>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Opción 1 — Widget flotante (recomendado)</h2>
            <p className="text-sm text-gray-500 mb-4">Pega este código antes de cerrar la etiqueta <code className="text-[#2CC5C5]">&lt;/body&gt;</code> en tu sitio web</p>
            <div className="relative">
              <pre className="bg-gray-950 text-green-400 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed font-mono">
                {embedCode}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(embedCode)}
                className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg transition"
              >
                Copiar
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-gray-900 mb-1">Opción 2 — iFrame embebido</h2>
            <p className="text-sm text-gray-500 mb-4">Alternativa más simple: pega un iframe donde quieras mostrar el chat</p>
            <div className="relative">
              <pre className="bg-gray-950 text-green-400 text-xs rounded-xl p-4 overflow-x-auto leading-relaxed font-mono">
                {iframeCode}
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(iframeCode)}
                className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg transition"
              >
                Copiar
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl border border-gray-200 p-5">
            <p className="text-xs font-semibold text-gray-500 mb-1">ID único del bot</p>
            <code className="text-[#2CC5C5] text-sm font-mono break-all">{id}</code>
          </div>
        </div>
      )}

      {/* ── TAB: NOTIFICACIONES ── */}
      {activeTab === "notifications" && (
        <div className="space-y-6">

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-sm text-blue-700">
            <strong>¿Cómo funciona?</strong> Cuando un visitante agende una cita a través de tu bot,
            recibirás una notificación automática en los canales que configures aquí.
          </div>

          {/* Email */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Email</h2>
                <p className="text-xs text-gray-400">Recibirás un email detallado con los datos de la cita</p>
              </div>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Disponible</span>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email de notificación</label>
            <input
              type="email"
              value={notifyEmail}
              onChange={(e) => setNotifyEmail(e.target.value)}
              placeholder="tu@empresa.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
            />
            <p className="text-xs text-gray-400 mt-1.5">Si lo dejas vacío, se enviará al email de tu cuenta.</p>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.555 4.118 1.529 5.845L.077 23.487a.5.5 0 00.617.613l5.747-1.505A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.867 9.867 0 01-5.021-1.373l-.36-.214-3.733.978.999-3.645-.235-.375A9.867 9.867 0 012.118 12C2.118 6.53 6.53 2.118 12 2.118S21.882 6.53 21.882 12 17.47 21.882 12 21.882z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">WhatsApp</h2>
                <p className="text-xs text-gray-400">Mensaje automático vía WhatsApp Business API</p>
              </div>
              <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">Requiere API</span>
            </div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Tu número de WhatsApp</label>
            <input
              type="tel"
              value={notifyWhatsapp}
              onChange={(e) => setNotifyWhatsapp(e.target.value)}
              placeholder="+5491123456789"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
            />
            <p className="text-xs text-gray-400 mt-1.5">
              Incluye el código de país. Requiere que NexoBot tenga configurado el acceso a la API de WhatsApp Business.
            </p>
          </div>

          {/* Telegram */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-sky-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">Telegram</h2>
                <p className="text-xs text-gray-400">Recibe mensajes en tu canal o chat de Telegram</p>
              </div>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">Disponible</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Token del bot de Telegram</label>
                <input
                  type="text"
                  value={notifyTelegramToken}
                  onChange={(e) => setNotifyTelegramToken(e.target.value)}
                  placeholder="123456789:AABBccDD..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Chat ID o ID del canal</label>
                <input
                  type="text"
                  value={notifyTelegramChatId}
                  onChange={(e) => setNotifyTelegramChatId(e.target.value)}
                  placeholder="-1001234567890"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                />
              </div>
            </div>
            <div className="mt-3 bg-gray-50 rounded-xl p-3 text-xs text-gray-500 space-y-1">
              <p><strong>Cómo configurarlo:</strong></p>
              <p>1. Abre Telegram y habla con <strong>@BotFather</strong></p>
              <p>2. Escribe <code>/newbot</code> y sigue los pasos para crear tu bot</p>
              <p>3. Copia el token que te da BotFather y pégalo arriba</p>
              <p>4. Para obtener tu Chat ID, habla con <strong>@userinfobot</strong></p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSaveNotifications}
              disabled={notifySaving}
              className="px-6 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm"
            >
              {notifySaving ? "Guardando..." : "Guardar notificaciones"}
            </button>
            {notifySaved && (
              <span className="text-green-600 text-sm font-medium flex items-center gap-1">
                ✓ Configuración guardada
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── TAB: ANALYTICS ── */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          {analyticsLoading || !analytics ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { label: "Mensajes totales", value: analytics.totalMessages.toLocaleString(), icon: "💬", color: "text-[#2CC5C5]" },
                  { label: "Mensajes este mes", value: analytics.messagesThisMonth.toLocaleString(), icon: "📅", color: "text-[#F5A623]" },
                  { label: "Conversaciones", value: analytics.totalConversations.toLocaleString(), icon: "🗨️", color: "text-violet-600" },
                  { label: "Esta semana", value: analytics.convsThisWeek.toLocaleString(), icon: "📈", color: "text-green-600" },
                  { label: "Hoy", value: analytics.convsToday.toLocaleString(), icon: "⚡", color: "text-blue-600" },
                  {
                    label: "Última actividad",
                    value: analytics.lastActivity
                      ? new Date(analytics.lastActivity).toLocaleDateString("es", { day: "2-digit", month: "short" })
                      : "—",
                    icon: "🕐",
                    color: "text-gray-600",
                  },
                ].map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                    <p className="text-2xl mb-2">{s.icon}</p>
                    <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                    <p className="text-xs text-gray-400 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* 14-day bar chart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-1">Mensajes — últimos 14 días</h3>
                <p className="text-xs text-gray-400 mb-5">Mensajes de visitantes por día</p>
                {analytics.dailyData.every((d) => d.count === 0) ? (
                  <p className="text-center text-gray-400 text-sm py-8">Sin actividad en los últimos 14 días</p>
                ) : (() => {
                  const maxVal = Math.max(...analytics.dailyData.map((d) => d.count), 1);
                  return (
                    <div className="flex items-end gap-1.5 h-32">
                      {analytics.dailyData.map((d) => {
                        const heightPct = Math.max((d.count / maxVal) * 100, d.count > 0 ? 4 : 0);
                        const isToday = d.date === new Date().toISOString().split("T")[0];
                        const label = new Date(d.date + "T12:00:00").toLocaleDateString("es", { day: "2-digit", month: "short" });
                        return (
                          <div key={d.date} className="flex-1 flex flex-col items-center gap-1" title={`${label}: ${d.count} msgs`}>
                            <div
                              className="w-full rounded-t-md transition-all"
                              style={{
                                height: `${heightPct}%`,
                                backgroundColor: isToday ? "#F5A623" : "#2CC5C5",
                                opacity: d.count === 0 ? 0.15 : 1,
                                minHeight: d.count > 0 ? "4px" : "2px",
                              }}
                            />
                            {d.count > 0 && <span className="text-[9px] text-gray-400">{d.count}</span>}
                          </div>
                        );
                      })}
                    </div>
                  );
                })()}
                <div className="flex justify-between mt-2 text-[9px] text-gray-300">
                  <span>{new Date(analytics.dailyData[0].date + "T12:00:00").toLocaleDateString("es", { day: "2-digit", month: "short" })}</span>
                  <span>Hoy</span>
                </div>
              </div>

              {/* Link to public booking page */}
              <div className="bg-gradient-to-r from-[#2CC5C5]/10 to-[#F5A623]/10 border border-[#2CC5C5]/20 rounded-2xl p-5 flex items-center justify-between gap-4 flex-wrap">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Página de reservas pública</p>
                  <p className="text-xs text-gray-500 mt-0.5">Comparte este link con tus clientes para que agenden directamente</p>
                  <code className="text-xs text-[#2CC5C5] mt-1 block">{APP_URL}/book/{id}</code>
                </div>
                <a
                  href={`${APP_URL}/book/${id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
                >
                  Abrir →
                </a>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── TAB: WHATSAPP ── */}
      {activeTab === "whatsapp" && (
        <div className="space-y-6">

          {/* Estado de la conexión */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-5">
              {/* WhatsApp icon */}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#25D366" }}>
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">WhatsApp Business</h2>
                <p className="text-sm text-gray-500">
                  {waConnection?.active
                    ? `Conectado${waConnection.display_phone ? " — " + waConnection.display_phone : ""}`
                    : "Sin conexión activa"}
                </p>
              </div>
              {waConnection?.active && (
                <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Activo
                </span>
              )}
            </div>

            {waLoading ? (
              <div className="flex justify-center py-8">
                <div className="w-7 h-7 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <div className="space-y-4">
                {/* Phone Number ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Phone Number ID <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={waPhoneNumberId}
                    onChange={(e) => { setWaPhoneNumberId(e.target.value); setWaVerified(null); }}
                    placeholder="ej: 875188135685843"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Meta for Developers → tu app → WhatsApp → API Setup → Phone Number ID
                  </p>
                </div>

                {/* Token de acceso */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Token de acceso permanente{" "}
                    {waHasToken && !waToken && (
                      <span className="ml-1.5 text-xs font-normal text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                        ✓ configurado
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <input
                      type={waShowToken ? "text" : "password"}
                      value={waToken}
                      onChange={(e) => { setWaToken(e.target.value); setWaVerified(null); setWaVerifyError(""); }}
                      placeholder={waHasToken ? "Deja vacío para mantener el token actual" : "EAABs..."}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-12 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                    />
                    <button
                      type="button"
                      onClick={() => setWaShowToken((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {waShowToken ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    Meta for Developers → tu app → WhatsApp → API Setup → Temporary/Permanent Token
                  </p>
                </div>

                {/* Número visible */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Número visible (opcional)
                  </label>
                  <input
                    type="text"
                    value={waDisplayPhone}
                    onChange={(e) => setWaDisplayPhone(e.target.value)}
                    placeholder="ej: +52 55 1234 5678"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
                  />
                </div>

                {/* Verificar conexión */}
                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Verificar conexión con Meta</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Comprueba que el Phone Number ID y el token son válidos antes de guardar.
                      </p>
                    </div>
                    <button
                      onClick={handleVerifyWA}
                      disabled={waVerifying || !waPhoneNumberId.trim() || (!waToken.trim() && !waHasToken)}
                      className="flex-shrink-0 px-4 py-2 border border-[#2CC5C5] text-[#2CC5C5] rounded-xl text-sm font-medium hover:bg-[#2CC5C5]/5 transition disabled:opacity-40"
                    >
                      {waVerifying ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
                          Verificando...
                        </span>
                      ) : "Verificar conexión"}
                    </button>
                  </div>

                  {waVerified && (
                    <div className="mt-3 flex items-start gap-2 text-sm text-green-700 bg-green-50 rounded-lg px-3 py-2">
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>
                        Conexión verificada
                        {waVerified.displayName && <> — <strong>{waVerified.displayName}</strong></>}
                        {waVerified.phoneNumber && <> ({waVerified.phoneNumber})</>}
                      </span>
                    </div>
                  )}

                  {waVerifyError && (
                    <p className="mt-3 text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{waVerifyError}</p>
                  )}
                </div>

                {waError && (
                  <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2">{waError}</p>
                )}

                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleSaveWA}
                    disabled={waSaving || !waPhoneNumberId.trim()}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 text-sm"
                  >
                    {waSaving ? "Guardando..." : waConnection ? "Actualizar conexión" : "Activar WhatsApp"}
                  </button>
                  {waSaved && (
                    <span className="text-green-600 text-sm font-medium">✓ Guardado</span>
                  )}
                  {waConnection?.active && (
                    <button
                      onClick={handleDisconnectWA}
                      className="px-4 py-2.5 border border-red-200 text-red-500 rounded-xl text-sm font-medium hover:bg-red-50 transition"
                    >
                      Desactivar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cómo configurar el webhook en Meta */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Configurar webhook en Meta for Developers</h3>
            <ol className="space-y-3 text-sm text-gray-600">
              {[
                "Ve a Meta for Developers → tu app → WhatsApp → Configuration.",
                "En el campo Webhook URL pega la URL de abajo.",
                "En Verify Token ingresa el valor que configuraste como WHATSAPP_VERIFY_TOKEN en Vercel.",
                "Haz clic en Verify and Save. Meta llamará al endpoint GET y verificará el token.",
                "En Webhook Fields activa el campo messages.",
                "Ingresa arriba el Phone Number ID y guarda.",
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#2CC5C5]/10 text-[#2CC5C5] text-xs font-bold flex items-center justify-center">{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-5 bg-gray-950 rounded-xl px-4 py-3 flex items-center justify-between gap-3">
              <code className="text-green-400 text-xs font-mono break-all">
                {(process.env.NEXT_PUBLIC_APP_URL || "https://nexobot.net")}/api/whatsapp/webhook
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL || "https://nexobot.net"}/api/whatsapp/webhook`)}
                className="flex-shrink-0 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1 rounded-lg transition"
              >
                Copiar
              </button>
            </div>
          </div>

          {/* Variables de entorno necesarias */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
            <p className="font-semibold mb-2">Variables de entorno requeridas en Vercel (solo para el administrador)</p>
            <ul className="space-y-1 font-mono text-xs text-amber-700">
              <li>WHATSAPP_VERIFY_TOKEN — Token secreto para verificar el webhook (ej: nexobot_webhook_2024)</li>
              <li>WHATSAPP_APP_SECRET — App Secret de tu app Meta (para verificar la firma HMAC)</li>
              <li className="text-amber-500">WHATSAPP_TOKEN — Opcional: token global de fallback si el cliente no configura el suyo</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
