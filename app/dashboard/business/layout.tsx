"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const BUSINESS_NAV = [
  { href: "/dashboard/business",            label: "Resumen",    icon: "📊" },
  { href: "/dashboard/business/expenses",   label: "Gastos",     icon: "💸" },
  { href: "/dashboard/business/sales",      label: "Ventas",     icon: "💰" },
  { href: "/dashboard/business/inventory",  label: "Inventario", icon: "📦" },
  { href: "/dashboard/invoices",            label: "Facturas",   icon: "🧾" },
  { href: "/dashboard/business/notes",      label: "Notas",      icon: "📝" },
];

export default function BusinessLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Mi Negocio</h1>
        <p className="text-gray-500 mt-1 text-sm">Gestiona gastos, ventas, inventario y más desde un solo lugar.</p>
      </div>

      {/* Sub-navegación */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 mb-6 scrollbar-hide">
        {BUSINESS_NAV.map((item) => {
          const isActive =
            item.href === "/dashboard/business"
              ? pathname === "/dashboard/business"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                isActive
                  ? "bg-gradient-to-r from-[#EEF9F9] to-[#FEF3DC] text-[#2CC5C5] border border-[#D9F5F5] shadow-sm"
                  : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </div>

      {children}
    </div>
  );
}
