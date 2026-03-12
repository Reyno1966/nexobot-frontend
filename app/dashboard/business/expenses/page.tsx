"use client";

import { useEffect, useState, useCallback } from "react";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  supplier: string | null;
  date: string;
  notes: string | null;
  created_at: string;
}

const CATEGORIES = [
  "Compras",
  "Servicios",
  "Nómina",
  "Marketing",
  "Alquiler",
  "Transporte",
  "Equipamiento",
  "Otros",
];

const CATEGORY_COLORS: Record<string, string> = {
  Compras:      "bg-blue-100 text-blue-700",
  Servicios:    "bg-purple-100 text-purple-700",
  Nómina:       "bg-orange-100 text-orange-700",
  Marketing:    "bg-pink-100 text-pink-700",
  Alquiler:     "bg-yellow-100 text-yellow-700",
  Transporte:   "bg-teal-100 text-teal-700",
  Equipamiento: "bg-indigo-100 text-indigo-700",
  Otros:        "bg-gray-100 text-gray-600",
};

function formatMoney(amount: number) {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function formatDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString("es", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getMonthPeriod(offset = 0) {
  const d = new Date();
  d.setMonth(d.getMonth() + offset);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  return { year: y, month: m, label: d.toLocaleDateString("es", { month: "long", year: "numeric" }) };
}

const emptyForm = {
  description: "",
  amount: "",
  category: "Compras",
  supplier: "",
  date: new Date().toISOString().split("T")[0],
  notes: "",
};

export default function ExpensesPage() {
  const [expenses, setExpenses]       = useState<Expense[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filterCat, setFilterCat]     = useState("Todas");
  const [monthOffset, setMonthOffset] = useState(0);
  const [showForm, setShowForm]       = useState(false);
  const [editingId, setEditingId]     = useState<string | null>(null);
  const [saving, setSaving]           = useState(false);
  const [deleting, setDeleting]       = useState<string | null>(null);
  const [saveError, setSaveError]     = useState("");
  const [form, setForm]               = useState({ ...emptyForm });

  const period = getMonthPeriod(monthOffset);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/business/expenses?year=${period.year}&month=${period.month}`,
      { credentials: "include" }
    );
    if (res.ok) setExpenses((await res.json()).expenses ?? []);
    setLoading(false);
  }, [period.year, period.month]);

  useEffect(() => { fetchExpenses(); }, [fetchExpenses]);

  // ── Derived stats ──────────────────────────────────────────────────────────
  const filtered = filterCat === "Todas"
    ? expenses
    : expenses.filter((e) => e.category === filterCat);

  const totalMonth = expenses.reduce((s, e) => s + Number(e.amount), 0);

  const byCat = CATEGORIES.map((cat) => ({
    cat,
    total: expenses.filter((e) => e.category === cat).reduce((s, e) => s + Number(e.amount), 0),
  })).filter((c) => c.total > 0).sort((a, b) => b.total - a.total);

  const topCategory = byCat[0];

  // ── Form helpers ───────────────────────────────────────────────────────────
  function openNew() {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setEditingId(null);
    setSaveError("");
    setShowForm(true);
  }

  function openEdit(e: Expense) {
    setForm({
      description: e.description,
      amount:      String(e.amount),
      category:    e.category,
      supplier:    e.supplier ?? "",
      date:        e.date,
      notes:       e.notes ?? "",
    });
    setEditingId(e.id);
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

    if (!form.description.trim()) { setSaveError("La descripción es obligatoria."); return; }
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount < 0) { setSaveError("Ingresa un monto válido."); return; }
    if (!form.date) { setSaveError("La fecha es obligatoria."); return; }

    setSaving(true);
    const url    = editingId ? `/api/business/expenses/${editingId}` : "/api/business/expenses";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        description: form.description.trim(),
        amount,
        category: form.category,
        supplier: form.supplier.trim() || null,
        date:     form.date,
        notes:    form.notes.trim() || null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSaveError(err.error ?? "Error al guardar. Intenta de nuevo.");
      return;
    }

    closeForm();
    fetchExpenses();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este gasto? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    await fetch(`/api/business/expenses/${id}`, { method: "DELETE", credentials: "include" });
    setDeleting(null);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total del mes</p>
          <p className="text-3xl font-bold text-red-500">{formatMoney(totalMonth)}</p>
          <p className="text-xs text-gray-400 mt-1">{expenses.length} gastos en {period.label}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Categoría mayor</p>
          {topCategory ? (
            <>
              <p className="text-xl font-bold text-gray-900">{topCategory.cat}</p>
              <p className="text-xs text-gray-400 mt-1">{formatMoney(topCategory.total)}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400 mt-2">Sin gastos aún</p>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Por categoría</p>
          {byCat.length === 0 ? (
            <p className="text-sm text-gray-400">Sin datos</p>
          ) : (
            <div className="space-y-1">
              {byCat.slice(0, 3).map((c) => (
                <div key={c.cat} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">{c.cat}</span>
                  <span className="text-xs font-semibold text-gray-800">{formatMoney(c.total)}</span>
                </div>
              ))}
              {byCat.length > 3 && (
                <p className="text-xs text-gray-400">+{byCat.length - 3} más</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Toolbar: selector de mes + filtro + botón ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
        {/* Selector de mes */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMonthOffset((o) => o - 1)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500"
            title="Mes anterior"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-700 capitalize min-w-[140px] text-center">
            {period.label}
          </span>
          <button
            onClick={() => setMonthOffset((o) => Math.min(o + 1, 0))}
            disabled={monthOffset === 0}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-500 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Mes siguiente"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Filtro de categoría */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {["Todas", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCat(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                filterCat === cat
                  ? "bg-[#2CC5C5] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[#2CC5C5] hover:text-[#2CC5C5]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Botón agregar */}
        <button
          onClick={openNew}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Agregar gasto
        </button>
      </div>

      {/* ── Lista de gastos ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">💸</p>
            <p className="font-semibold text-gray-700">
              {filterCat === "Todas" ? "No hay gastos este mes" : `No hay gastos en "${filterCat}"`}
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              {filterCat === "Todas"
                ? "Registra tu primer gasto para comenzar."
                : "Prueba cambiando el filtro de categoría."}
            </p>
            {filterCat === "Todas" && (
              <button
                onClick={openNew}
                className="px-5 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                + Registrar gasto
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {/* Header tabla */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 text-xs text-gray-400 font-semibold uppercase tracking-wide">
              <span>Descripción</span>
              <span className="text-right">Monto</span>
              <span className="text-center">Categoría</span>
              <span className="text-center">Fecha</span>
              <span />
            </div>

            {filtered.map((expense) => (
              <div
                key={expense.id}
                className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 sm:gap-4 items-start sm:items-center px-6 py-4 hover:bg-gray-50 transition group"
              >
                {/* Descripción */}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{expense.description}</p>
                  {expense.supplier && (
                    <p className="text-xs text-gray-400 mt-0.5">Proveedor: {expense.supplier}</p>
                  )}
                  {expense.notes && (
                    <p className="text-xs text-gray-400 italic">{expense.notes}</p>
                  )}
                </div>

                {/* Monto */}
                <p className="font-bold text-red-500 text-sm sm:text-right">
                  {formatMoney(Number(expense.amount))}
                </p>

                {/* Categoría */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[expense.category] ?? "bg-gray-100 text-gray-500"}`}>
                  {expense.category}
                </span>

                {/* Fecha */}
                <p className="text-xs text-gray-400 text-center whitespace-nowrap">
                  {formatDate(expense.date)}
                </p>

                {/* Acciones */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(expense)}
                    className="p-1.5 text-gray-400 hover:text-[#2CC5C5] hover:bg-[#EEF9F9] rounded-lg transition"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    disabled={deleting === expense.id}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Eliminar"
                  >
                    {deleting === expense.id ? (
                      <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Modal / Formulario ── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeForm} />

          {/* Panel */}
          <div className="relative bg-white rounded-t-3xl sm:rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10">
            <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">
                {editingId ? "Editar gasto" : "Registrar gasto"}
              </h2>
              <button
                onClick={closeForm}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
              {/* Descripción */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Ej. Compra de materiales, Suscripción Adobe..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
                  autoFocus
                />
              </div>

              {/* Monto y Categoría lado a lado */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monto (USD) <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={form.amount}
                      onChange={(e) => setForm((f) => ({ ...f, amount: e.target.value }))}
                      placeholder="0.00"
                      className="w-full border border-gray-200 rounded-xl pl-7 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Proveedor y Fecha lado a lado */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Proveedor</label>
                  <input
                    type="text"
                    value={form.supplier}
                    onChange={(e) => setForm((f) => ({ ...f, supplier: e.target.value }))}
                    placeholder="Ej. Amazon, Sodimac..."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Notas */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Observaciones opcionales..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent resize-none"
                />
              </div>

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
                    editingId ? "Guardar cambios" : "Registrar gasto"
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
