"use client";

export default function SalesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Ventas del día</h1>
        <p className="text-gray-500 mt-1">Registra tus ventas y lleva el control de tu caja diaria.</p>
      </div>

      {/* Coming soon */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EEF9F9] to-[#FEF3DC] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          El módulo de ventas te permitirá registrar cada venta, elegir el método de pago
          y ver el resumen de tu caja al cierre del día.
        </p>

        {/* Feature list */}
        <ul className="text-left inline-flex flex-col gap-2 text-sm text-gray-600 mb-8">
          {[
            "Registro de ventas por método de pago (efectivo, tarjeta, transferencia)",
            "Resumen diario y mensual de ingresos",
            "Comparativa vs gastos para ver ganancia neta",
            "Exportar reporte en PDF (planes Pro y Premium)",
          ].map((feat) => (
            <li key={feat} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#2CC5C5] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feat}
            </li>
          ))}
        </ul>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EEF9F9] text-[#2CC5C5] text-sm font-medium">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          En desarrollo — próxima actualización
        </div>
      </div>
    </div>
  );
}
