"use client";

import { useEffect, useState, useCallback } from "react";

interface Note {
  id: string;
  content: string;
  color: NoteColor;
  is_pinned: boolean;
  created_at: string;
  updated_at: string;
}

const NOTE_COLORS = ["yellow", "blue", "green", "red", "purple"] as const;
type NoteColor = (typeof NOTE_COLORS)[number];

const COLOR_STYLES: Record<NoteColor, { card: string; badge: string; ring: string }> = {
  yellow: {
    card:  "bg-yellow-50  border-yellow-200",
    badge: "bg-yellow-100 text-yellow-700",
    ring:  "ring-yellow-400",
  },
  blue: {
    card:  "bg-blue-50   border-blue-200",
    badge: "bg-blue-100  text-blue-700",
    ring:  "ring-blue-400",
  },
  green: {
    card:  "bg-green-50  border-green-200",
    badge: "bg-green-100 text-green-700",
    ring:  "ring-green-400",
  },
  red: {
    card:  "bg-red-50    border-red-200",
    badge: "bg-red-100   text-red-700",
    ring:  "ring-red-400",
  },
  purple: {
    card:  "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-700",
    ring:  "ring-purple-400",
  },
};

const COLOR_DOTS: Record<NoteColor, string> = {
  yellow: "bg-yellow-400",
  blue:   "bg-blue-400",
  green:  "bg-green-400",
  red:    "bg-red-400",
  purple: "bg-purple-400",
};

const COLOR_LABELS: Record<NoteColor, string> = {
  yellow: "Amarillo",
  blue:   "Azul",
  green:  "Verde",
  red:    "Rojo",
  purple: "Morado",
};

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 1)  return "Ahora";
  if (mins  < 60) return `Hace ${mins}m`;
  if (hours < 24) return `Hace ${hours}h`;
  return `Hace ${days}d`;
}

const emptyForm = { content: "", color: "yellow" as NoteColor, is_pinned: false };

export default function NotesPage() {
  const [notes, setNotes]         = useState<Note[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filterColor, setFilter]  = useState<"Todas" | NoteColor>("Todas");
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [pinning, setPinning]     = useState<string | null>(null);
  const [saveError, setSaveError] = useState("");
  const [form, setForm]           = useState({ ...emptyForm });

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/business/notes", { credentials: "include" });
    if (res.ok) setNotes((await res.json()).notes ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchNotes(); }, [fetchNotes]);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const filtered = filterColor === "Todas"
    ? notes
    : notes.filter((n) => n.color === filterColor);

  const pinnedCount = notes.filter((n) => n.is_pinned).length;

  // ── Helpers ─────────────────────────────────────────────────────────────────
  function openNew() {
    setForm({ ...emptyForm });
    setEditingId(null);
    setSaveError("");
    setShowForm(true);
  }

  function openEdit(n: Note) {
    setForm({ content: n.content, color: n.color, is_pinned: n.is_pinned });
    setEditingId(n.id);
    setSaveError("");
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingId(null);
    setSaveError("");
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSaveError("");

    if (!form.content.trim())          { setSaveError("El contenido es obligatorio."); return; }
    if (form.content.trim().length > 2000) { setSaveError("Máximo 2000 caracteres."); return; }

    setSaving(true);
    const url    = editingId ? `/api/business/notes/${editingId}` : "/api/business/notes";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        content:   form.content.trim(),
        color:     form.color,
        is_pinned: form.is_pinned,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSaveError(err.error ?? "Error al guardar. Intenta de nuevo.");
      return;
    }

    closeForm();
    fetchNotes();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta nota? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    await fetch(`/api/business/notes/${id}`, { method: "DELETE", credentials: "include" });
    setDeleting(null);
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  async function togglePin(note: Note) {
    setPinning(note.id);
    const res = await fetch(`/api/business/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ is_pinned: !note.is_pinned }),
    });
    if (res.ok) {
      const updated: Note = (await res.json()).note;
      setNotes((prev) => {
        const rest = prev.filter((n) => n.id !== note.id);
        const sorted = [updated, ...rest].sort((a, b) =>
          Number(b.is_pinned) - Number(a.is_pinned) ||
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        return sorted;
      });
    }
    setPinning(null);
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Stats banner ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total notas</p>
          <p className="text-3xl font-bold text-gray-900">{notes.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Fijadas</p>
          <p className="text-3xl font-bold text-[#F5A623]">{pinnedCount}</p>
        </div>
        {/* Distribución por color — top 2 */}
        {NOTE_COLORS.map((c) => ({ c, count: notes.filter((n) => n.color === c).length }))
          .filter((x) => x.count > 0)
          .sort((a, b) => b.count - a.count)
          .slice(0, 2)
          .map(({ c, count }) => (
            <div key={c} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-center gap-1.5 mb-1">
                <span className={`w-2.5 h-2.5 rounded-full ${COLOR_DOTS[c]}`} />
                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">{COLOR_LABELS[c]}</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">{count}</p>
            </div>
          ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        {/* Filtro por color */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {(["Todas", ...NOTE_COLORS] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c as "Todas" | NoteColor)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                filterColor === c
                  ? "bg-[#2CC5C5] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[#2CC5C5] hover:text-[#2CC5C5]"
              }`}
            >
              {c !== "Todas" && (
                <span className={`w-2 h-2 rounded-full ${COLOR_DOTS[c as NoteColor]}`} />
              )}
              {c === "Todas" ? "Todas" : COLOR_LABELS[c as NoteColor]}
            </button>
          ))}
        </div>

        {/* Botón nueva nota */}
        <button
          onClick={openNew}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva nota
        </button>
      </div>

      {/* ── Grid de notas ── */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-16 text-center">
          <p className="text-4xl mb-3">📝</p>
          <p className="font-semibold text-gray-700">
            {filterColor === "Todas" ? "No hay notas aún" : `No hay notas de color ${COLOR_LABELS[filterColor as NoteColor]}`}
          </p>
          <p className="text-sm text-gray-400 mt-1 mb-4">
            {filterColor === "Todas"
              ? "Captura ideas, tareas o recordatorios importantes."
              : "Prueba cambiando el filtro de color."}
          </p>
          {filterColor === "Todas" && (
            <button
              onClick={openNew}
              className="px-5 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              + Crear primera nota
            </button>
          )}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((note) => {
            const styles = COLOR_STYLES[note.color] ?? COLOR_STYLES.yellow;
            return (
              <div
                key={note.id}
                className={`break-inside-avoid rounded-2xl border p-5 group relative transition hover:shadow-md ${styles.card}`}
              >
                {/* Pin indicator */}
                {note.is_pinned && (
                  <div className="absolute top-3 right-3">
                    <svg className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
                    </svg>
                  </div>
                )}

                {/* Contenido */}
                <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed pr-4">
                  {note.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-gray-400">{timeAgo(note.updated_at)}</span>

                  {/* Acciones — se muestran al hover */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                    {/* Pin/Unpin */}
                    <button
                      onClick={() => togglePin(note)}
                      disabled={pinning === note.id}
                      className={`p-1.5 rounded-lg transition ${
                        note.is_pinned
                          ? "text-[#F5A623] hover:bg-yellow-100"
                          : "text-gray-400 hover:text-[#F5A623] hover:bg-yellow-50"
                      }`}
                      title={note.is_pinned ? "Quitar pin" : "Fijar nota"}
                    >
                      {pinning === note.id ? (
                        <div className="w-4 h-4 border-2 border-[#F5A623] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg className="w-4 h-4" fill={note.is_pinned ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      )}
                    </button>

                    {/* Editar */}
                    <button
                      onClick={() => openEdit(note)}
                      className="p-1.5 text-gray-400 hover:text-[#2CC5C5] hover:bg-white/60 rounded-lg transition"
                      title="Editar"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>

                    {/* Eliminar */}
                    <button
                      onClick={() => handleDelete(note.id)}
                      disabled={deleting === note.id}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                      title="Eliminar"
                    >
                      {deleting === note.id ? (
                        <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal / Formulario ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeForm} />

          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Editar nota" : "Nueva nota"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Contenido */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nota <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                  placeholder="Escribe tu nota aquí..."
                  rows={5}
                  maxLength={2000}
                  autoFocus
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent resize-none"
                />
                <p className="text-xs text-gray-400 text-right mt-1">
                  {form.content.length}/2000
                </p>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex items-center gap-2">
                  {NOTE_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, color: c }))}
                      title={COLOR_LABELS[c]}
                      className={`w-8 h-8 rounded-full ${COLOR_DOTS[c]} transition-all ${
                        form.color === c
                          ? "ring-2 ring-offset-2 ring-gray-400 scale-110"
                          : "hover:scale-105 opacity-70 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Fijar */}
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <div
                  onClick={() => setForm((f) => ({ ...f, is_pinned: !f.is_pinned }))}
                  className={`w-10 h-6 rounded-full transition-colors relative ${
                    form.is_pinned ? "bg-[#F5A623]" : "bg-gray-200"
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.is_pinned ? "translate-x-5" : "translate-x-1"
                  }`} />
                </div>
                <span className="text-sm text-gray-700">Fijar nota al inicio</span>
              </label>

              {/* Error */}
              {saveError && (
                <p className="text-sm text-red-500 bg-red-50 rounded-xl px-4 py-2.5">
                  ⚠️ {saveError}
                </p>
              )}

              {/* Botones */}
              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={closeForm}
                  className="flex-1 py-2.5 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    editingId ? "Guardar cambios" : "Crear nota"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
