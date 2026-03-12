"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface MonthlySummary {
  totalExpenses: number;
  totalSales: number;
  expenseCount: number;
  saleCount: number;
  currency: string;
}

function formatMoney(amount: number) {
  return new Intl.NumberFormat("es", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export default function BusinessOverviewPage() {
  const [summary, setSummary] = useState<MonthlySummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [expRes, saleRes] = await Promise.all([
          fetch("/api/business/expenses?period=current_month", { credentials: "include" }),
          fetch("/api/business/sales?period=current_month", { credentials: "include" }),
        ]);

        let totalExpenses = 0;
        let expenseCount = 0;
        let totalSales = 0;
        let saleCount = 0;

        if (expRes.ok) {
          const { expenses } = await expRes.json();
          totalExpenses = (expenses ?? []).reduce((s: number, e: { amount: number }) => s + Number(e.amount), 0);
          expenseCount = (expenses ?? []).length;
        }
        if (saleRes.ok) {
          const { sales } = await saleRes.json();
          totalSales = (sales ?? []).reduce((s: number, e: { amount: number }) => s + Number(e.amount), 0);
          saleCount = (sales ?? []).length;
        }

        setSummary({ totalExpenses, totalSales, expenseCount, saleCount, currency: "USD" });
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const profit = (summary?.totalSales ?? 0) - (summary?.totalExpenses ?? 0);
  const monthName = new Date().toLocaleDateString("es", { month: "long", year: "numeric" });

  const QUICK_ACTIONS = [
    { href: "/dashboard/business/expenses", label: "Registrar gasto", icon: "💸", desc: "Compras y gastos del negocio", color: "hover:border-red-200" },
    { href: "/dashboard/business/sales",    label: "Registrar venta",  icon: "💰", desc: "Ingresos del día",             color: "hover:border-green-200" },
    { href: "/dashboard/products",          label: "Ver inventario",   icon: "📦", desc: "Productos y stock disponible", color: "hover:border-blue-200" },
    { href: "/dashboard/invoices",          label: "Crear factura",    icon: "🧾", desc: "Comprobantes para clientes",   color: "hover:border-purple-200" },
    { href: "/dashboard/business/notes",    label: "Nueva nota",       icon: "📝", desc: "Recordatorios y pendientes",  color: "hover:border-yellow-200" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* KPIs del mes */}
      <div className="mb-2">
        <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">
          Resumen de {monthName}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {/* Ingresos */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Ingresos</p>
            <span className="text-green-500 text-lg">💰</span>
          </div>
          <p className="text-3xl font-bold text-green-600">{formatMoney(summary?.totalSales ?? 0)}</p>
          <p className="text-xs text-gray-400 mt-1">{summary?.saleCount ?? 0} ventas este mes</p>
        </div>

        {/* Gastos */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Gastos</p>
            <span className="text-red-400 text-lg">💸</span>
          </div>
          <p className="text-3xl font-bold text-red-500">{formatMoney(summary?.totalExpenses ?? 0)}</p>
          <p className="text-xs text-gray-400 mt-1">{summary?.expenseCount ?? 0} gastos este mes</p>
        </div>

        {/* Ganancia neta */}
        <div className={`rounded-2xl border shadow-sm p-5 ${profit >= 0 ? "bg-gradient-to-br from-[#EEF9F9] to-[#FEF3DC] border-[#D9F5F5]" : "bg-red-50 border-red-100"}`}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Ganancia neta</p>
            <span className="text-lg">{profit >= 0 ? "📈" : "📉"}</span>
          </div>
          <p className={`text-3xl font-bold ${profit >= 0 ? "text-[#2CC5C5]" : "text-red-600"}`}>
            {formatMoney(profit)}
          </p>
          <p className="text-xs text-gray-400 mt-1">ingresos − gastos</p>
        </div>
      </div>

      {/* Acciones rápidas */}
      <p className="text-xs text-gray-400 uppercase tracking-widest font-semibold mb-3">Acciones rápidas</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        {QUICK_ACTIONS.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-all ${action.color}`}
          >
            <span className="text-2xl">{action.icon}</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">{action.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Estado vacío amigable si no hay datos */}
      {(summary?.expenseCount === 0 && summary?.saleCount === 0) && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
          <p className="text-4xl mb-3">🏪</p>
          <p className="font-semibold text-gray-900">¡Empieza a registrar tu actividad!</p>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            Registra gastos y ventas para ver tus ganancias en tiempo real.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/dashboard/business/expenses"
              className="px-5 py-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              + Registrar primer gasto
            </Link>
            <Link
              href="/dashboard/business/sales"
              className="px-5 py-2 border border-gray-200 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition"
            >
              + Registrar venta
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
