"use client";

import { useEffect, useState } from "react";

interface Conversation {
  id: string;
  bot_id: string;
  session_id: string;
  visitor_name: string;
  message_count: number;
  last_message_at: string;
  created_at: string;
  bots?: { name: string };
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  tokens_used: number;
  created_at: string;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "ahora";
  if (mins < 60) return `hace ${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `hace ${days}d`;
}

function exportCSV(conversations: Conversation[]) {
  const rows: (string | number)[][] = [
    ["Visitante", "Bot", "Mensajes", "Última actividad", "Fecha creación"],
    ...conversations.map((c) => [
      c.visitor_name || "Visitante",
      c.bots?.name || "Bot",
      c.message_count ?? 0,
      new Date(c.last_message_at).toLocaleString("es"),
      new Date(c.created_at).toLocaleDateString("es"),
    ]),
  ];
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `conversaciones-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ConversationsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected]           = useState<Conversation | null>(null);
  const [messages, setMessages]           = useState<Message[]>([]);
  const [loading, setLoading]             = useState(true);
  const [loadingMsgs, setLoadingMsgs]     = useState(false);
  const [search, setSearch]               = useState("");

  useEffect(() => {
    fetch("/api/conversations", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setConversations(d.conversations ?? []))
      .finally(() => setLoading(false));
  }, []);

  async function selectConversation(conv: Conversation) {
    setSelected(conv);
    setLoadingMsgs(true);
    const res = await fetch(`/api/conversations/${conv.id}`, { credentials: "include" });
    const data = await res.json();
    setMessages(data.messages ?? []);
    setLoadingMsgs(false);
  }

  const filtered = search.trim()
    ? conversations.filter(
        (c) =>
          (c.visitor_name || "").toLowerCase().includes(search.toLowerCase()) ||
          (c.bots?.name || "").toLowerCase().includes(search.toLowerCase())
      )
    : conversations;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Conversaciones</h1>
          <p className="text-gray-500 mt-1">Historial completo de chats de tus bots</p>
        </div>
        {conversations.length > 0 && (
          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exportar CSV
          </button>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin conversaciones aún</h3>
          <p className="text-gray-500 text-sm">Las conversaciones aparecerán aquí cuando los visitantes hablen con tus bots</p>
        </div>
      ) : (
        <>
          {/* Search bar */}
          <div className="mb-4 relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por visitante o bot..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]/40 focus:border-[#2CC5C5]"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-12 text-center">
              <p className="text-gray-400 text-sm">No se encontraron conversaciones para &ldquo;{search}&rdquo;</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lista de conversaciones */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">{filtered.length} conversaciones{search ? ` · "${search}"` : ""}</p>
                </div>
                <div className="divide-y divide-gray-50 max-h-[600px] overflow-y-auto">
                  {filtered.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => selectConversation(conv)}
                      className={`w-full text-left px-5 py-4 hover:bg-gray-50 transition ${selected?.id === conv.id ? "bg-[#2CC5C5]/5 border-l-2 border-[#2CC5C5]" : ""}`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                            {(conv.visitor_name || "V").charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {conv.visitor_name || "Visitante"}
                            </p>
                            <p className="text-xs text-gray-400">{conv.bots?.name ?? "Bot"}</p>
                          </div>
                        </div>
                        <span className="text-xs text-gray-400">{timeAgo(conv.last_message_at)}</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-10">{conv.message_count ?? 0} mensajes</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vista de mensajes */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col" style={{ minHeight: "400px" }}>
                {!selected ? (
                  <div className="flex-1 flex items-center justify-center text-center p-8">
                    <div>
                      <div className="text-4xl mb-3">👈</div>
                      <p className="text-gray-500 text-sm">Selecciona una conversación para ver los mensajes</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-[#041414] to-[#0a2222]">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold">
                          {(selected.visitor_name || "V").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{selected.visitor_name || "Visitante"}</p>
                          <p className="text-gray-400 text-xs">
                            {selected.bots?.name} · {new Date(selected.created_at).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => exportCSV([selected])}
                        className="text-gray-400 hover:text-white transition text-xs px-2 py-1 rounded-lg hover:bg-white/10"
                        title="Exportar esta conversación"
                      >
                        ↓ CSV
                      </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-50 max-h-[500px]">
                      {loadingMsgs ? (
                        <div className="flex items-center justify-center py-10">
                          <div className="w-6 h-6 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
                        </div>
                      ) : messages.length === 0 ? (
                        <p className="text-center text-gray-400 text-sm py-8">Sin mensajes guardados</p>
                      ) : (
                        messages.map((msg) => (
                          <div key={msg.id} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                            {msg.role === "assistant" && (
                              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center text-white text-xs font-bold flex-shrink-0 mt-0.5">
                                B
                              </div>
                            )}
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-[#2CC5C5] text-white rounded-br-sm"
                                : "bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100"
                            }`}>
                              {msg.content}
                              {msg.role === "assistant" && msg.tokens_used > 0 && (
                                <p className="text-xs text-gray-400 mt-1">{msg.tokens_used} tokens</p>
                              )}
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
