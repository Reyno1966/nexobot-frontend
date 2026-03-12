"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  cost_price: number;
  stock: number | null;
  category: string | null;
  active: boolean;
  created_at: string;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

function getMarginColor(margin: number) {
  if (margin >= 50) return "text-green-600";
  if (margin >= 20) return "text-[#F5A623]";
  return "text-red-500";
}

function getStockBadge(stock: number | null) {
  if (stock === null) return null;
  if (stock === 0)  return { label: "Sin stock",   style: "bg-red-100 text-red-600" };
  if (stock <= 5)   return { label: "Stock bajo",  style: "bg-orange-100 text-orange-600" };
  return               { label: `${stock} uds`,   style: "bg-green-100 text-green-700" };
}

export default function InventoryPage() {
  const [products, setProducts]   = useState<Product[]>([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState("");
  const [filterActive, setFilter] = useState<"todos" | "activos" | "inactivos">("activos");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/products", { credentials: "include" });
    if (res.ok) {
      const data = await res.json();
      // La API de products puede devolver {products: [...]} o directamente un array
      setProducts(data.products ?? data ?? []);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  // ── Derived ─────────────────────────────────────────────────────────────────
  const filtered = products
    .filter((p) => {
      if (filterActive === "activos")   return p.active;
      if (filterActive === "inactivos") return !p.active;
      return true;
    })
    .filter((p) =>
      search.trim() === "" ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category ?? "").toLowerCase().includes(search.toLowerCase())
    );

  const activeProducts  = products.filter((p) => p.active);
  const lowStock        = products.filter((p) => p.stock !== null && p.stock <= 5);
  const outOfStock      = products.filter((p) => p.stock === 0);
  const totalStockValue = activeProducts.reduce((sum, p) => sum + (p.price * (p.stock ?? 0)), 0);

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div>
      {/* ── Stats cards ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Productos activos</p>
          <p className="text-3xl font-bold text-gray-900">{activeProducts.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Valor de stock</p>
          <p className="text-2xl font-bold text-[#2CC5C5]">{formatMoney(totalStockValue)}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Stock bajo</p>
          <p className="text-3xl font-bold text-[#F5A623]">{lowStock.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">≤ 5 unidades</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">Sin stock</p>
          <p className="text-3xl font-bold text-red-500">{outOfStock.length}</p>
          <p className="text-xs text-gray-400 mt-0.5">0 unidades</p>
        </div>
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
        {/* Buscador */}
        <div className="relative flex-1 max-w-xs">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar producto..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] focus:border-transparent"
          />
        </div>

        {/* Filtro estado */}
        <div className="flex items-center gap-1.5">
          {(["activos", "inactivos", "todos"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                filterActive === f
                  ? "bg-[#2CC5C5] text-white shadow-sm"
                  : "bg-white text-gray-500 border border-gray-200 hover:border-[#2CC5C5] hover:text-[#2CC5C5]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Botón gestionar (va a /dashboard/products) */}
        <Link
          href="/dashboard/products"
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Gestionar productos
        </Link>
      </div>

      {/* ── Tabla de productos ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-4xl mb-3">📦</p>
            <p className="font-semibold text-gray-700">
              {products.length === 0 ? "No hay productos aún" : "No se encontraron productos"}
            </p>
            <p className="text-sm text-gray-400 mt-1 mb-4">
              {products.length === 0
                ? "Agrega productos desde el catálogo para verlos aquí."
                : "Intenta con otra búsqueda o cambia el filtro."}
            </p>
            {products.length === 0 && (
              <Link
                href="/dashboard/products"
                className="inline-block px-5 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
              >
                Ir a Catálogo de productos
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs text-gray-400 font-semibold uppercase tracking-wide">
                  <th className="text-left px-6 py-3">Producto</th>
                  <th className="text-right px-4 py-3">Precio venta</th>
                  <th className="text-right px-4 py-3">Costo</th>
                  <th className="text-right px-4 py-3">Margen</th>
                  <th className="text-center px-4 py-3">Stock</th>
                  <th className="text-center px-4 py-3">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((product) => {
                  const hasCost  = product.cost_price > 0;
                  const margin   = hasCost ? ((product.price - product.cost_price) / product.price) * 100 : null;
                  const stockBadge = getStockBadge(product.stock);

                  return (
                    <tr key={product.id} className="hover:bg-gray-50 transition">
                      {/* Producto */}
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">{product.name}</p>
                        {product.category && (
                          <p className="text-xs text-gray-400 mt-0.5">{product.category}</p>
                        )}
                      </td>

                      {/* Precio venta */}
                      <td className="px-4 py-4 text-right font-semibold text-gray-900">
                        {formatMoney(product.price)}
                      </td>

                      {/* Costo */}
                      <td className="px-4 py-4 text-right text-gray-500">
                        {hasCost ? formatMoney(product.cost_price) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>

                      {/* Margen */}
                      <td className="px-4 py-4 text-right">
                        {margin !== null ? (
                          <span className={`font-semibold ${getMarginColor(margin)}`}>
                            {margin.toFixed(1)}%
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">Sin costo</span>
                        )}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4 text-center">
                        {stockBadge ? (
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${stockBadge.style}`}>
                            {stockBadge.label}
                          </span>
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </td>

                      {/* Estado */}
                      <td className="px-4 py-4 text-center">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          product.active
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-500"
                        }`}>
                          {product.active ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Nota sobre cost_price ── */}
      {activeProducts.some((p) => p.cost_price === 0) && (
        <div className="mt-4 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-700">
          <svg className="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            Algunos productos no tienen costo registrado. Agrega el precio de costo en{" "}
            <Link href="/dashboard/products" className="font-semibold underline underline-offset-2">
              Catálogo de productos
            </Link>{" "}
            para ver el margen de ganancia.
          </span>
        </div>
      )}
    </div>
  );
}
