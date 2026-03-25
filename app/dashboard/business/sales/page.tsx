"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { exportToXLSX, exportToPDF } from "@/lib/export-business";

interface Sale {
  id: string;
  description: string;
  amount: number;
  payment_method: string;
  category: string | null;
  date: string;
  notes: string | null;
  created_at: string;
}

const PAYMENT_METHODS = ["efectivo", "tarjeta", "transferencia", "otro"] as const;
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

const PM_LABELS: Record<PaymentMethod, string> = {
  efectivo:      "Efectivo",
  tarjeta:       "Tarjeta",
  transferencia: "Transferencia",
  otro:          "Otro",
};

const PM_COLORS: Record<PaymentMethod, string> = {
  efectivo:      "bg-green-100 text-green-700",
  tarjeta:       "bg-blue-100 text-blue-700",
  transferencia: "bg-purple-100 text-purple-700",
  otro:          "bg-gray-100 text-gray-600",
};

const PM_ICONS: Record<PaymentMethod, string> = {
  efectivo:      "💵",
  tarjeta:       "💳",
  transferencia: "🏦",
  otro:          "🔄",
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
  description:    "",
  amount:         "",
  payment_method: "efectivo" as PaymentMethod,
  category:       "",
  date:           new Date().toISOString().split("T")[0],
  notes:          "",
};

export default function SalesPage() {
  const [sales, setSales]             = useState<Sale[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filterPM, setFilterPM]       = useState<"Todas" | PaymentMethod>("Todas");
  const [monthOffset, setMonthOffset] = useState(0);
  const [showForm, setShowForm]       = useState(false);
  const [editingId, setEditingId]     = useState<string | null>(null);
  const [saving, setSaving]           = useState(false);
  const [deleting, setDeleting]       = useState<string | null>(null);
  const [saveError, setSaveError]     = useState("");
  const [form, setForm]               = useState({ ...emptyForm });
  const [showExport, setShowExport]   = useState(false);
  const [exporting, setExporting]     = useState<"xlsx" | "pdf" | null>(null);
  const exportRef                     = useRef<HTMLDivElement>(null);

  const period = getMonthPeriod(monthOffset);

  const fetchSales = useCallback(async () => {
    setLoading(true);
    const res = await fetch(
      `/api/business/sales?year=${period.year}&month=${period.month}`,
      { credentials: "include" }
    );
    if (res.ok) setSales((await res.json()).sales ?? []);
    setLoading(false);
  }, [period.year, period.month]);

  useEffect(() => { fetchSales(); }, [fetchSales]);

  // ── Derived stats ───────────────────────────────────────────────────────────
  const filtered = filterPM === "Todas"
    ? sales
    : sales.filter((s) => s.payment_method === filterPM);

  const totalMonth = sales.reduce((sum, s) => sum + Number(s.amount), 0);

  const byPM = PAYMENT_METHODS.map((pm) => ({
    pm,
    total: sales.filter((s) => s.payment_method === pm).reduce((sum, s) => sum + Number(s.amount), 0),
    count: sales.filter((s) => s.payment_method === pm).length,
  })).filter((p) => p.count > 0).sort((a, b) => b.total - a.total);

  const topPM = byPM[0];

  // ── Form helpers ────────────────────────────────────────────────────────────
  function openNew() {
    setForm({ ...emptyForm, date: new Date().toISOString().split("T")[0] });
    setEditingId(null);
    setSaveError("");
    setShowForm(true);
  }

  function openEdit(s: Sale) {
    setForm({
      description:    s.description,
      amount:         String(s.amount),
      payment_method: (s.payment_method as PaymentMethod) ?? "efectivo",
      category:       s.category ?? "",
      date:           s.date,
      notes:          s.notes ?? "",
    });
    setEditingId(s.id);
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
    const url    = editingId ? `/api/business/sales/${editingId}` : "/api/business/sales";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        description:    form.description.trim(),
        amount,
        payment_method: form.payment_method,
        category:       form.category.trim() || null,
        date:           form.date,
        notes:          form.notes.trim() || null,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      setSaveError(err.error ?? "Error al guardar. Intenta de nuevo.");
      return;
    }

    closeForm();
    fetchSales();
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta venta? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    await fetch(`/api/business/sales/${id}`, { method: "DELETE", credentials: "include" });
    setDeleting(null);
    setSales((prev) => prev.filter((s) => s.id !== id));
  }

  // ── Export helpers ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (!showExport) return;
    function handleClickOutside(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExport(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showExport]);

  function buildExportData() {
    const columns = [
      { header: "Fecha",            key: "fecha",          width: 14, align: "left"  as const },
      { header: "Descripción",      key: "descripcion",    width: 30, align: "left"  as const },
      { header: "Categoría",        key: "categoria",      width: 16, align: "left"  as const },
      { header: "Método de pago",   key: "metodo",         width: 16, align: "center" as const },
      { header: "Monto (USD)",      key: "monto",          width: 14, align: "right" as const },
    ];
    const rows = filtered.map((s) => ({
      fecha:       formatDate(s.date),
      descripcion: s.description,
      categoria:   s.category ?? "",
      metodo:      PM_LABELS[s.payment_method as PaymentMethod] ?? s.payment_method,
      monto:       Number(s.amount).toFixed(2),
    }));
    const totalAmt = filtered.reduce((sum, s) => sum + Number(s.amount), 0);
    const totals = {
      fecha:       "",
      descripcion: "TOTAL",
      categoria:   "",
      metodo:      `${filtered.length} venta${filtered.length !== 1 ? "s" : ""}`,
      monto:       totalAmt.toFixed(2),
    };
    const pmLabel = filterPM === "Todas" ? "Todos los métodos" : PM_LABELS[filterPM as PaymentMethod];
    const subtitle = `Período: ${period.label} · Filtro: ${pmLabel} · Generado: ${new Date().toLocaleDateString("es", { day: "2-digit", month: "long", year: "numeric" })}`;
    const filename = `ventas_${period.year}-${period.month}`;
    return { columns, rows, totals, subtitle, filename };
  }

  async function handleExport(type: "xlsx" | "pdf") {
    setShowExport(false);
    setExporting(type);
    const { columns, rows, totals, subtitle, filename } = buildExportData();
    const opts = { filename, title: "Reporte de Ventas", subtitle, columns, rows, totals };
    try {
      if (type === "xlsx") await exportToXLSX(opts);
      else                  await exportToPDF(opts);
    } finally {
      setExporting(null);
    }
  }

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Stats cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total del mes */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Total del mes</p>
          <p className="text-3xl font-bold text-[#2CC5C5]">{formatMoney(totalMonth)}</p>
          <p className="text-xs text-gray-400 mt-1">{sales.length} ventas en {period.label}</p>
        </div>

        {/* Método más usado */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Método más usado</p>
          {topPM ? (
            <>
              <p className="text-xl font-bold text-gray-900">
                {PM_ICONS[topPM.pm]} {PM_LABELS[topPM.pm]}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {topPM.count} venta{topPM.count !== 1 ? "s" : ""} · {formatMoney(topPM.total)}
              </p>
            </>
          ) : (
            <p className="text-sm text-gray-400 mt-2">Sin ventas aún</p>
          )}
        </div>

        {/* Por método */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">Por método de pago</p>
          {byPM.length === 0 ? (
            <p className="text-sm text-gray-400">Sin datos</p>
          ) : (
            <div className="space-y-1">
              {byPM.map((p) => (
                <div key={p.pm} className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {PM_ICONS[p.pm]} {PM_LABELS[p.pm]}
                  </span>
                  <span className="text-xs font-semibold text-gray-800">{formatMoney(p.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Toolbar ── */}
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

        {/* Filtro por método de pago */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full">
          {(["Todas", ...PAYMENT_METHODS] as const).map((pm) => (
            <button
              key={pm}
              onClick={() => setFilterPM(pm as "Todas" | PaymentMethod)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                filterPM === pm
                  ? "bg-[#2CC5C5] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[#2CC5C5] hover:text-[#2CC5C5]"
              }`}
            >
              {pm === "Todas" ? "Todas" : `${PM_ICONS[pm as PaymentMethod]} ${PM_LABELS[pm as PaymentMethod]}`}
            </button>
          ))}
        </div>

        {/* Botones: Exportar + Agregar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Exportar dropdown */}
          <div className="relative" ref={exportRef}>
            <button
              onClick={() => setShowExport((v) => !v)}
              disabled={!!exporting || filtered.length === 0}
              className="flex items-center gap-1.5 px-4 py-2 border border-[#2CC5C5] text-[#2CC5C5] rounded-xl text-sm font-semibold hover:bg-[#EEF9F9] transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {exporting ? (
                <div className="w-4 h-4 border-2 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              )}
              Exportar
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {showExport && (
              <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl shadow-lg py-1 min-w-[160px]">
                <button
                  onClick={() => handleExport("xlsx")}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#EEF9F9] hover:text-[#2CC5C5] transition"
                >
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Excel (.xlsx)
                </button>
                <button
                  onClick={() => handleExport("pdf")}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 hover:bg-[#EEF9F9] hover:text-[#2CC5C5] transition"
                >
                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  PDF
                </button>
              </div>
            )}
          </div>

          <button
            onClick={openNew}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Registrar venta
          </button>
        </div>
      </div>

      {/* ── Lista de ventas ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">🛒</p>
            <p className="font-semibold text-gray-700">
              {filterPM === "Todas" ? "No hay ventas este mes" : `No hay ventas con "${PM_LABELS[filterPM as PaymentMethod]}"`}
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              {filterPM === "Todas"
                ? "Registra tu primera venta para comenzar."
                : "Prueba cambiando el filtro de método de pago."}
            </p>
            {filterPM === "Todas" && (
              <button
                onClick={openNew}
                className="px-5 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                + Registrar venta
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {/* Header tabla */}
            <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-6 py-3 bg-gray-50 text-xs text-gray-400 font-semibold uppercase tracking-wide">
              <span>Descripción</span>
              <span className="text-right">Monto</span>
              <span className="text-center">Método</span>
              <span className="text-center">Fecha</span>
              <span />
            </div>

            {filtered.map((sale) => (
              <div
                key={sale.id}
                className="flex flex-col sm:grid sm:grid-cols-[1fr_auto_auto_auto_auto] gap-2 sm:gap-4 items-start sm:items-center px-6 py-4 hover:bg-gray-50 transition group"
              >
                {/* Descripción */}
                <div>
                  <p className="font-medium text-gray-900 text-sm">{sale.description}</p>
                  {sale.category && (
                    <p className="text-xs text-gray-400 mt-0.5">Categoría: {sale.category}</p>
                  )}
                  {sale.notes && (
                    <p className="text-xs text-gray-400 italic">{sale.notes}</p>
                  )}
                </div>

                {/* Monto */}
                <p className="font-bold text-[#2CC5C5] text-sm sm:text-right">
                  {formatMoney(Number(sale.amount))}
                </p>

                {/* Método de pago */}
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${PM_COLORS[sale.payment_method as PaymentMethod] ?? "bg-gray-100 text-gray-500"}`}>
                  {PM_ICONS[sale.payment_method as PaymentMethod]} {PM_LABELS[sale.payment_method as PaymentMethod] ?? sale.payment_method}
                </span>

                {/* Fecha */}
                <p className="text-xs text-gray-400 text-center whitespace-nowrap">
                  {formatDate(sale.date)}
                </p>

                {/* Acciones */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    onClick={() => openEdit(sale)}
                    className="p-1.5 text-gray-400 hover:text-[#2CC5C5] hover:bg-[#EEF9F9] rounded-lg transition"
                    title="Editar"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(sale.id)}
                    disabled={deleting === sale.id}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                    title="Eliminar"
                  >
                    {deleting === sale.id ? (
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
                {editingId ? "Editar venta" : "Registrar venta"}
              </h2>
              <button onClick={closeForm} className="text-gray-400 hover:text-gray-600 transition p-1">
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
                  placeholder="Ej. Venta de producto, Servicio de consultoría..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
                  autoFocus
                />
              </div>

              {/* Monto y Método de pago */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Método de pago</label>
                  <select
                    value={form.payment_method}
                    onChange={(e) => setForm((f) => ({ ...f, payment_method: e.target.value as PaymentMethod }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent bg-white"
                  >
                    {PAYMENT_METHODS.map((pm) => (
                      <option key={pm} value={pm}>
                        {PM_ICONS[pm]} {PM_LABELS[pm]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Categoría y Fecha */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    placeholder="Ej. Producto, Servicio..."
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
                    editingId ? "Guardar cambios" : "Registrar venta"
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
