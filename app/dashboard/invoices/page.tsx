"use client";

import { useEffect, useState } from "react";

interface InvoiceItem {
  description: string;
  quantity: number;
  unit_price: number;
}

interface Invoice {
  id: string;
  invoice_number: string;
  client_name: string;
  client_email: string | null;
  client_phone: string | null;
  client_address: string | null;
  items: InvoiceItem[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total: number;
  currency: string;
  due_date: string | null;
  notes: string | null;
  status: "draft" | "sent" | "paid" | "cancelled";
  created_at: string;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  draft:     { label: "Borrador",  color: "bg-gray-100 text-gray-600" },
  sent:      { label: "Enviada",   color: "bg-blue-100 text-blue-700" },
  paid:      { label: "Pagada",    color: "bg-green-100 text-green-700" },
  cancelled: { label: "Cancelada", color: "bg-red-100 text-red-700" },
};

const CURRENCIES = ["USD", "EUR", "MXN", "COP", "ARS", "CLP", "PEN", "CHF"];

const emptyItem = (): InvoiceItem => ({ description: "", quantity: 1, unit_price: 0 });

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es", { style: "currency", currency }).format(amount);
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}

export default function InvoicesPage() {
  const [invoices, setInvoices]       = useState<Invoice[]>([]);
  const [loading, setLoading]         = useState(true);
  const [filter, setFilter]           = useState("all");
  const [showForm, setShowForm]       = useState(false);
  const [saving, setSaving]           = useState(false);
  const [saveError, setSaveError]     = useState("");
  const [deleting, setDeleting]       = useState<string | null>(null);
  const [preview, setPreview]         = useState<Invoice | null>(null);

  const [form, setForm] = useState({
    client_name: "",
    client_email: "",
    client_phone: "",
    client_address: "",
    currency: "USD",
    tax_rate: "0",
    due_date: "",
    notes: "",
    items: [emptyItem()],
  });

  useEffect(() => { fetchInvoices(); }, []);

  async function fetchInvoices() {
    setLoading(true);
    const res = await fetch("/api/invoices", { credentials: "include" });
    if (res.ok) setInvoices((await res.json()).invoices ?? []);
    setLoading(false);
  }

  function updateItem(index: number, field: keyof InvoiceItem, value: string | number) {
    setForm((f) => {
      const items = [...f.items];
      items[index] = { ...items[index], [field]: value };
      return { ...f, items };
    });
  }

  function addItem() { setForm((f) => ({ ...f, items: [...f.items, emptyItem()] })); }
  function removeItem(i: number) { setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) })); }

  const subtotal   = form.items.reduce((s, i) => s + i.quantity * Number(i.unit_price), 0);
  const taxAmount  = subtotal * (Number(form.tax_rate) / 100);
  const total      = subtotal + taxAmount;

  async function handleSave() {
    if (!form.client_name.trim()) { setSaveError("El nombre del cliente es obligatorio."); return; }
    if (form.items.some((i) => !i.description.trim())) { setSaveError("Todos los ítems deben tener descripción."); return; }
    setSaving(true); setSaveError("");
    try {
      const res = await fetch("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ ...form, tax_rate: Number(form.tax_rate) }),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchInvoices();
        setShowForm(false);
        resetForm();
      } else {
        setSaveError(data.error ?? "Error al guardar. Intenta de nuevo.");
      }
    } catch { setSaveError("Error de conexión."); }
    finally { setSaving(false); }
  }

  function resetForm() {
    setForm({ client_name: "", client_email: "", client_phone: "", client_address: "",
      currency: "USD", tax_rate: "0", due_date: "", notes: "", items: [emptyItem()] });
    setSaveError("");
  }

  async function handleStatusChange(id: string, status: string) {
    const res = await fetch(`/api/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status }),
    });
    if (res.ok) {
      const { invoice } = await res.json();
      setInvoices((prev) => prev.map((inv) => (inv.id === id ? invoice : inv)));
      if (preview?.id === id) setPreview(invoice);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar esta factura? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    const res = await fetch(`/api/invoices/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) { setInvoices((prev) => prev.filter((i) => i.id !== id)); if (preview?.id === id) setPreview(null); }
    setDeleting(null);
  }

  const filtered = invoices.filter((i) => filter === "all" || i.status === filter);
  const counts = { all: invoices.length, draft: 0, sent: 0, paid: 0, cancelled: 0 };
  invoices.forEach((i) => { counts[i.status] = (counts[i.status] ?? 0) + 1; });

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facturas</h1>
          <p className="text-gray-500 mt-1">Crea, envía y gestiona tus facturas</p>
        </div>
        <button onClick={() => { setShowForm(true); resetForm(); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nueva factura
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total facturas", value: invoices.length, color: "text-gray-900" },
          { label: "Pendientes", value: counts.draft + counts.sent, color: "text-blue-700" },
          { label: "Pagadas", value: counts.paid, color: "text-green-700" },
          { label: "Ingresos totales", value: formatMoney(invoices.filter(i => i.status === "paid").reduce((s, i) => s + i.total, 0), "USD"), color: "text-green-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <p className="text-xs text-gray-400 font-medium mb-1">{s.label}</p>
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {(["all", "draft", "sent", "paid", "cancelled"] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${filter === s ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
            {s === "all" ? "Todas" : STATUS_LABELS[s].label}
            <span className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${filter === s ? "bg-blue-100 text-blue-700" : "bg-gray-200 text-gray-500"}`}>
              {counts[s as keyof typeof counts] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {/* Modal crear factura */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Nueva factura</h2>

            {/* Cliente */}
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Datos del cliente</p>
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre / Empresa *</label>
                  <input type="text" value={form.client_name}
                    onChange={(e) => setForm((f) => ({ ...f, client_name: e.target.value }))}
                    placeholder="Acme S.A."
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value={form.client_email}
                    onChange={(e) => setForm((f) => ({ ...f, client_email: e.target.value }))}
                    placeholder="cliente@empresa.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input type="tel" value={form.client_phone}
                    onChange={(e) => setForm((f) => ({ ...f, client_phone: e.target.value }))}
                    placeholder="+1 555 0000"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input type="text" value={form.client_address}
                    onChange={(e) => setForm((f) => ({ ...f, client_address: e.target.value }))}
                    placeholder="Calle 123, Ciudad, País"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Ítems */}
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Servicios / Productos *</p>
              <div className="space-y-2">
                {form.items.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input type="text" value={item.description}
                      onChange={(e) => updateItem(i, "description", e.target.value)}
                      placeholder="Descripción del servicio"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input type="number" value={item.quantity} min="1"
                      onChange={(e) => updateItem(i, "quantity", Number(e.target.value))}
                      className="w-16 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    />
                    <input type="number" value={item.unit_price} min="0" step="0.01"
                      onChange={(e) => updateItem(i, "unit_price", Number(e.target.value))}
                      placeholder="Precio"
                      className="w-24 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-500 w-20 text-right">
                      {formatMoney(item.quantity * Number(item.unit_price), form.currency)}
                    </span>
                    {form.items.length > 1 && (
                      <button onClick={() => removeItem(i)} className="text-red-400 hover:text-red-600 text-lg leading-none p-1">×</button>
                    )}
                  </div>
                ))}
                <button onClick={addItem}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 mt-1">
                  + Agregar ítem
                </button>
              </div>

              {/* Totales */}
              <div className="mt-4 bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span className="font-medium">{formatMoney(subtotal, form.currency)}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center gap-2">
                    Impuesto
                    <input type="number" value={form.tax_rate} min="0" max="100" step="0.5"
                      onChange={(e) => setForm((f) => ({ ...f, tax_rate: e.target.value }))}
                      className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    />
                    <span className="text-xs">%</span>
                  </span>
                  <span className="font-medium">{formatMoney(taxAmount, form.currency)}</span>
                </div>
                <div className="flex justify-between text-gray-900 font-bold border-t border-gray-200 pt-2">
                  <span>Total</span><span>{formatMoney(total, form.currency)}</span>
                </div>
              </div>
            </div>

            {/* Configuración */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                <select value={form.currency} onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de vencimiento</label>
                <input type="date" value={form.due_date}
                  onChange={(e) => setForm((f) => ({ ...f, due_date: e.target.value }))}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Notas</label>
                <textarea value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                  placeholder="Condiciones de pago, instrucciones adicionales..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {saveError && (
              <div className="mb-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                ⚠️ {saveError}
              </div>
            )}
            <div className="flex gap-3">
              <button onClick={() => { setShowForm(false); resetForm(); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {saving ? "Guardando..." : "Crear factura"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview / Vista de factura */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Toolbar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 no-print">
              <p className="font-bold text-gray-900">{preview.invoice_number}</p>
              <div className="flex items-center gap-2">
                <button onClick={() => window.print()}
                  className="px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg hover:bg-gray-700 transition">
                  🖨️ Imprimir / PDF
                </button>
                {preview.status === "draft" && (
                  <button onClick={() => handleStatusChange(preview.id, "sent")}
                    className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition">
                    📤 Marcar enviada
                  </button>
                )}
                {preview.status === "sent" && (
                  <button onClick={() => handleStatusChange(preview.id, "paid")}
                    className="px-3 py-1.5 bg-green-600 text-white text-xs font-semibold rounded-lg hover:bg-green-700 transition">
                    ✓ Marcar pagada
                  </button>
                )}
                <button onClick={() => setPreview(null)}
                  className="px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition">
                  Cerrar
                </button>
              </div>
            </div>

            {/* Factura */}
            <div className="p-8" id="invoice-print">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">NexoBot</h1>
                  <p className="text-gray-400 text-sm mt-1">nexobot.net</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-900">{preview.invoice_number}</p>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${STATUS_LABELS[preview.status].color}`}>
                    {STATUS_LABELS[preview.status].label}
                  </span>
                  <p className="text-sm text-gray-400 mt-2">Creada: {formatDate(preview.created_at)}</p>
                  {preview.due_date && <p className="text-sm text-gray-400">Vence: {formatDate(preview.due_date)}</p>}
                </div>
              </div>

              {/* Cliente */}
              <div className="bg-gray-50 rounded-xl p-5 mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Facturar a:</p>
                <p className="font-bold text-gray-900">{preview.client_name}</p>
                {preview.client_address && <p className="text-sm text-gray-500">{preview.client_address}</p>}
                {preview.client_email && <p className="text-sm text-gray-500">{preview.client_email}</p>}
                {preview.client_phone && <p className="text-sm text-gray-500">{preview.client_phone}</p>}
              </div>

              {/* Ítems */}
              <table className="w-full mb-6">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left text-xs font-bold text-gray-400 uppercase pb-2">Descripción</th>
                    <th className="text-center text-xs font-bold text-gray-400 uppercase pb-2 w-16">Cant.</th>
                    <th className="text-right text-xs font-bold text-gray-400 uppercase pb-2 w-24">Precio</th>
                    <th className="text-right text-xs font-bold text-gray-400 uppercase pb-2 w-24">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {preview.items.map((item, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 text-sm text-gray-700">{item.description}</td>
                      <td className="py-3 text-sm text-gray-500 text-center">{item.quantity}</td>
                      <td className="py-3 text-sm text-gray-700 text-right">{formatMoney(item.unit_price, preview.currency)}</td>
                      <td className="py-3 text-sm font-medium text-gray-900 text-right">{formatMoney(item.quantity * item.unit_price, preview.currency)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-6">
                <div className="w-64 space-y-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatMoney(preview.subtotal, preview.currency)}</span></div>
                  {preview.tax_rate > 0 && (
                    <div className="flex justify-between text-gray-500"><span>Impuesto ({preview.tax_rate}%)</span><span>{formatMoney(preview.tax_amount, preview.currency)}</span></div>
                  )}
                  <div className="flex justify-between font-black text-gray-900 text-lg border-t border-gray-200 pt-2">
                    <span>Total</span><span>{formatMoney(preview.total, preview.currency)}</span>
                  </div>
                </div>
              </div>

              {preview.notes && (
                <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-600">
                  <p className="font-semibold text-gray-700 mb-1">Notas:</p>
                  <p>{preview.notes}</p>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs text-gray-300">
                Generado con NexoBot · nexobot.net
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de facturas */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="text-5xl mb-4">🧾</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {filter === "all" ? "Sin facturas todavía" : `Sin facturas ${STATUS_LABELS[filter]?.label.toLowerCase()}`}
          </h3>
          <p className="text-gray-500 text-sm">Crea tu primera factura con el botón "Nueva factura"</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {filtered.map((inv) => (
              <div key={inv.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition">
                <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <span className="text-blue-600 text-sm">🧾</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm">{inv.invoice_number}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_LABELS[inv.status].color}`}>
                      {STATUS_LABELS[inv.status].label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">{inv.client_name}</p>
                  <p className="text-xs text-gray-400">{formatDate(inv.created_at)}{inv.due_date ? ` · Vence: ${formatDate(inv.due_date)}` : ""}</p>
                </div>
                <p className="font-black text-gray-900 text-base flex-shrink-0">{formatMoney(inv.total, inv.currency)}</p>
                <div className="flex items-center gap-1 flex-shrink-0">
                  <button onClick={() => setPreview(inv)}
                    className="px-2.5 py-1.5 text-xs text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                    Ver
                  </button>
                  {inv.status === "draft" && (
                    <button onClick={() => handleStatusChange(inv.id, "sent")}
                      className="px-2.5 py-1.5 text-xs text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition">
                      Enviar
                    </button>
                  )}
                  {inv.status === "sent" && (
                    <button onClick={() => handleStatusChange(inv.id, "paid")}
                      className="px-2.5 py-1.5 text-xs text-green-700 font-medium rounded-lg hover:bg-green-50 transition">
                      Pagada
                    </button>
                  )}
                  <button onClick={() => handleDelete(inv.id)} disabled={deleting === inv.id}
                    className="px-2.5 py-1.5 text-xs text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50">
                    {deleting === inv.id ? "..." : "🗑️"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
