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

  // Tab
  const [activeTab, setActiveTab] = useState<"config" | "appearance" | "test" | "embed">("config");
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
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${systemPrompt.length > 700 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-500"}`}>
                {systemPrompt.length}/800
              </span>
            </div>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value.substring(0, 800))}
              rows={7}
              placeholder={`Ejemplo:\nEres un asistente de ventas amable de [Tu Empresa]. Tu objetivo es ayudar a los clientes a encontrar el producto ideal, responder preguntas sobre precios y disponibilidad, y guiarlos hacia la compra. Responde siempre en español, de forma profesional y concisa. Si no sabes algo, ofrece contactar a un asesor humano.`}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] resize-none mt-3 leading-relaxed"
            />
            <p className="text-xs text-gray-400 mt-2">
              💡 Un buen prompt define el tono, objetivo y limitaciones del bot. Máximo 800 caracteres.
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
    </div>
  );
}
