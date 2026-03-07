"use client";

import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  description: string | null;
  category: string;
  sku: string | null;
  price: number;
  currency: string;
  stock: number;
  stock_min: number;
  unit: string;
  image_url: string | null;
  status: "active" | "inactive" | "out_of_stock";
  created_at: string;
  updated_at: string | null;
}

const STATUS_LABELS: Record<string, { label: string; color: string }> = {
  active:       { label: "Activo",     color: "bg-green-100 text-green-700" },
  inactive:     { label: "Inactivo",   color: "bg-gray-100 text-gray-500" },
  out_of_stock: { label: "Sin stock",  color: "bg-red-100 text-red-700" },
};

const CURRENCIES = ["USD", "EUR", "MXN", "COP", "ARS", "CLP", "PEN", "CHF"];
const UNITS      = ["unidades", "kg", "g", "litros", "ml", "metros", "pares", "cajas", "servicios"];

function formatMoney(amount: number, currency: string) {
  return new Intl.NumberFormat("es", { style: "currency", currency }).format(amount);
}

const emptyForm = {
  name: "", description: "", category: "", sku: "",
  price: "", currency: "USD", stock: "", stock_min: "5",
  unit: "unidades", image_url: "",
};

export default function ProductsPage() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filter, setFilter]       = useState("all");
  const [showForm, setShowForm]   = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving]       = useState(false);
  const [saveError, setSaveError] = useState("");
  const [deleting, setDeleting]   = useState<string | null>(null);
  const [form, setForm]           = useState({ ...emptyForm });

  useEffect(() => { fetchProducts(); }, []);

  async function fetchProducts() {
    setLoading(true);
    const res = await fetch("/api/products", { credentials: "include" });
    if (res.ok) setProducts((await res.json()).products ?? []);
    setLoading(false);
  }

  async function handleStockChange(id: string, delta: number) {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newStock = Math.max(0, product.stock + delta);
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ stock: newStock }),
    });
    if (res.ok) {
      const { product: updated } = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  }

  async function handleStatusToggle(id: string, currentStatus: string) {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const { product: updated } = await res.json();
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("¿Eliminar este producto? Esta acción no se puede deshacer.")) return;
    setDeleting(id);
    const res = await fetch(`/api/products/${id}`, { method: "DELETE", credentials: "include" });
    if (res.ok) setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  function openCreate() {
    setEditingId(null);
    setForm({ ...emptyForm });
    setSaveError("");
    setShowForm(true);
  }

  function openEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      name: p.name, description: p.description ?? "", category: p.category,
      sku: p.sku ?? "", price: String(p.price), currency: p.currency,
      stock: String(p.stock), stock_min: String(p.stock_min),
      unit: p.unit, image_url: p.image_url ?? "",
    });
    setSaveError("");
    setShowForm(true);
  }

  async function handleSave() {
    if (!form.name.trim()) { setSaveError("El nombre es obligatorio."); return; }
    setSaving(true); setSaveError("");
    try {
      const payload = {
        ...form,
        price:     Number(form.price) || 0,
        stock:     Number(form.stock) || 0,
        stock_min: Number(form.stock_min) || 0,
      };
      const url    = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok) {
        await fetchProducts();
        setShowForm(false);
      } else {
        setSaveError(data.error ?? "Error al guardar. Intenta de nuevo.");
      }
    } catch { setSaveError("Error de conexión."); }
    finally { setSaving(false); }
  }

  const filtered = products.filter((p) => {
    const matchFilter = filter === "all" || p.status === filter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) ||
                        (p.category?.toLowerCase().includes(search.toLowerCase()));
    return matchFilter && matchSearch;
  });

  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.stock_min).length;
  const outStock = products.filter((p) => p.status === "out_of_stock").length;
  const totalVal = products.filter((p) => p.status === "active").reduce((s, p) => s + p.price * p.stock, 0);
  const counts   = { all: products.length, active: 0, inactive: 0, out_of_stock: 0 };
  products.forEach((p) => { counts[p.status] = (counts[p.status] ?? 0) + 1; });

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventario de Productos</h1>
          <p className="text-gray-500 mt-1">Catálogo privado — tu bot lo consulta en tiempo real</p>
        </div>
        <button onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Nuevo producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-medium mb-1">Total productos</p>
          <p className="text-2xl font-black text-gray-900">{products.length}</p>
        </div>
        <div className={`bg-white rounded-2xl border shadow-sm p-4 ${lowStock > 0 ? "border-orange-200" : "border-gray-100"}`}>
          <p className="text-xs text-gray-400 font-medium mb-1">Stock bajo ⚠️</p>
          <p className={`text-2xl font-black ${lowStock > 0 ? "text-orange-600" : "text-gray-900"}`}>{lowStock}</p>
        </div>
        <div className={`bg-white rounded-2xl border shadow-sm p-4 ${outStock > 0 ? "border-red-200" : "border-gray-100"}`}>
          <p className="text-xs text-gray-400 font-medium mb-1">Sin stock 🔴</p>
          <p className={`text-2xl font-black ${outStock > 0 ? "text-red-600" : "text-gray-900"}`}>{outStock}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
          <p className="text-xs text-gray-400 font-medium mb-1">Valor inventario</p>
          <p className="text-xl font-black text-green-700">{formatMoney(totalVal, "USD")}</p>
        </div>
      </div>

      {/* Alerta stock bajo */}
      {lowStock > 0 && (
        <div className="mb-4 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-orange-500 text-lg">⚠️</span>
          <p className="text-sm text-orange-700 font-medium">
            {lowStock} producto{lowStock > 1 ? "s" : ""} con stock por debajo del mínimo. Considera reabastecer.
          </p>
        </div>
      )}

      {/* Búsqueda y filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto o categoría..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
          {(["all", "active", "inactive", "out_of_stock"] as const).map((s) => (
            <button key={s} onClick={() => setFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${filter === s ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"}`}>
              {s === "all" ? `Todos (${counts.all})` : `${STATUS_LABELS[s].label} (${counts[s] ?? 0})`}
            </button>
          ))}
        </div>
      </div>

      {/* Modal crear/editar */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold text-gray-900 mb-5">
              {editingId ? "Editar producto" : "Nuevo producto"}
            </h2>
            <div className="space-y-4">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                <input type="text" value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Ej: Camiseta básica negra"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                <textarea value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  placeholder="Describe el producto para que el bot pueda responder mejor..."
                  rows={2}
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                  <input type="text" value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    placeholder="Ej: Ropa, Electrónico..."
                    list="categories-list"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <datalist id="categories-list">
                    {categories.map((c) => <option key={c} value={c} />)}
                  </datalist>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU / Código</label>
                  <input type="text" value={form.sku}
                    onChange={(e) => setForm((f) => ({ ...f, sku: e.target.value }))}
                    placeholder="Ej: CAM-NEG-001"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <input type="number" value={form.price} min="0" step="0.01"
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    placeholder="0.00"
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
                  <select value={form.currency}
                    onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {CURRENCIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unidad</label>
                  <select value={form.unit}
                    onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                    {UNITS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock actual</label>
                  <input type="number" value={form.stock} min="0"
                    onChange={(e) => setForm((f) => ({ ...f, stock: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Alerta mínimo</label>
                  <input type="number" value={form.stock_min} min="0"
                    onChange={(e) => setForm((f) => ({ ...f, stock_min: e.target.value }))}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

            </div>

            {saveError && (
              <div className="mt-4 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
                ⚠️ {saveError}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving}
                className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50">
                {saving ? "Guardando..." : editingId ? "Guardar cambios" : "Crear producto"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de productos */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="text-5xl mb-4">📦</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {products.length === 0 ? "Sin productos todavía" : "Sin resultados"}
          </h3>
          <p className="text-gray-500 text-sm">
            {products.length === 0
              ? "Agrega tus productos y tu bot podrá responder sobre disponibilidad y precios"
              : "Prueba con otro término de búsqueda"}
          </p>
          {products.length === 0 && (
            <button onClick={openCreate}
              className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition">
              + Agregar primer producto
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {/* Cabecera tabla */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <div className="col-span-4">Producto</div>
            <div className="col-span-2">Categoría</div>
            <div className="col-span-2 text-right">Precio</div>
            <div className="col-span-2 text-center">Stock</div>
            <div className="col-span-2 text-right">Acciones</div>
          </div>

          <div className="divide-y divide-gray-50">
            {filtered.map((product) => {
              const isLow = product.stock > 0 && product.stock <= product.stock_min;
              return (
                <div key={product.id}
                  className={`grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-5 py-4 hover:bg-gray-50 transition items-center ${isLow ? "bg-orange-50/50 hover:bg-orange-50" : ""}`}>

                  {/* Nombre + estado */}
                  <div className="sm:col-span-4 flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-50 to-violet-50 rounded-xl flex items-center justify-center flex-shrink-0 text-lg">
                      📦
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-gray-900 text-sm truncate">{product.name}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_LABELS[product.status].color}`}>
                          {STATUS_LABELS[product.status].label}
                        </span>
                        {isLow && <span className="text-xs text-orange-600 font-medium">⚠️ Stock bajo</span>}
                        {product.sku && <span className="text-xs text-gray-400">{product.sku}</span>}
                      </div>
                    </div>
                  </div>

                  {/* Categoría */}
                  <div className="sm:col-span-2">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-medium">
                      {product.category || "—"}
                    </span>
                  </div>

                  {/* Precio */}
                  <div className="sm:col-span-2 sm:text-right">
                    <p className="font-bold text-gray-900">{formatMoney(product.price, product.currency)}</p>
                    <p className="text-xs text-gray-400">/{product.unit}</p>
                  </div>

                  {/* Stock con controles */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center gap-2">
                    <button onClick={() => handleStockChange(product.id, -1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition text-sm font-bold">
                      −
                    </button>
                    <span className={`w-12 text-center font-bold text-sm ${isLow ? "text-orange-600" : product.status === "out_of_stock" ? "text-red-600" : "text-gray-900"}`}>
                      {product.stock}
                    </span>
                    <button onClick={() => handleStockChange(product.id, 1)}
                      className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition text-sm font-bold">
                      +
                    </button>
                    <span className="text-xs text-gray-400">{product.unit}</span>
                  </div>

                  {/* Acciones */}
                  <div className="sm:col-span-2 flex items-center sm:justify-end gap-1">
                    <button onClick={() => handleStatusToggle(product.id, product.status)}
                      disabled={product.status === "out_of_stock"}
                      className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition disabled:opacity-40 ${
                        product.status === "active"
                          ? "text-gray-500 hover:bg-gray-100"
                          : "text-green-700 hover:bg-green-50"
                      }`}>
                      {product.status === "active" ? "Pausar" : "Activar"}
                    </button>
                    <button onClick={() => openEdit(product)}
                      className="px-2.5 py-1.5 text-xs text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(product.id)} disabled={deleting === product.id}
                      className="px-2.5 py-1.5 text-xs text-gray-400 rounded-lg hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50">
                      {deleting === product.id ? "..." : "🗑️"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tip de integración con el bot */}
      {products.length > 0 && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start">
          <span className="text-2xl flex-shrink-0">🤖</span>
          <div>
            <p className="font-semibold text-blue-900 text-sm">Tu bot ya puede consultar este catálogo</p>
            <p className="text-blue-700 text-xs mt-1 leading-relaxed">
              Agrega esta instrucción al <strong>System Prompt</strong> de tu bot para que responda sobre productos y stock en tiempo real:
            </p>
            <code className="block mt-2 bg-white border border-blue-100 rounded-xl px-4 py-3 text-xs text-gray-700 leading-relaxed">
              {`Cuando el usuario pregunte sobre productos, precios o disponibilidad, consulta el catálogo actualizado. Los productos disponibles son los que tienen estado "activo". Informa el precio y stock exacto de cada producto.`}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
