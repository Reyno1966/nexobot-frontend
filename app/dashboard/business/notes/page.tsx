"use client";

export default function NotesPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Notas rápidas</h1>
        <p className="text-gray-500 mt-1">Captura ideas, recordatorios y tareas pendientes de tu negocio.</p>
      </div>

      {/* Coming soon */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EEF9F9] to-[#FEF3DC] flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-2">Próximamente</h2>
        <p className="text-gray-500 max-w-sm mx-auto mb-6">
          Las notas rápidas te permitirán capturar ideas y recordatorios al instante,
          organizados por color y con la opción de fijar las más importantes.
        </p>

        {/* Feature list */}
        <ul className="text-left inline-flex flex-col gap-2 text-sm text-gray-600 mb-8">
          {[
            "Notas con colores personalizados (amarillo, azul, verde, rojo, morado)",
            "Fijar notas importantes al inicio de la lista",
            "Búsqueda rápida entre todas tus notas",
            "Sincronización en tiempo real entre dispositivos",
          ].map((feat) => (
            <li key={feat} className="flex items-start gap-2">
              <svg className="w-4 h-4 text-[#F5A623] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feat}
            </li>
          ))}
        </ul>

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FEF3DC] text-[#F5A623] text-sm font-medium">
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
