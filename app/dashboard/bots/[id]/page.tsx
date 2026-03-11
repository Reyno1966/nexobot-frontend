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
  const [activeTab, setActiveTab] = useState<"config" | "appearance" | "test" | "embed" | "notifications">("config");
  const [copiedLink, setCopiedLink] = useState(false);

  function copyLink() {
    navigator.clipboard.writeText(`${APP_URL}/widget/${id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
        ] as const).map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
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
    </div>
  );
}
