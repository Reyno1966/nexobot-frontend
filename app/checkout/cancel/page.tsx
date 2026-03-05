import Link from "next/link";

export default function CancelPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center">

        {/* Ícono */}
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-2xl font-extrabold text-gray-900 mb-2">
          Pago cancelado
        </h1>

        <p className="text-gray-500 mb-8">
          No se realizó ningún cargo. Puedes volver a intentarlo cuando quieras.
        </p>

        <Link
          href="/#pricing"
          className="block w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition mb-3"
        >
          Ver planes nuevamente
        </Link>

        <Link
          href="/dashboard"
          className="block w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-semibold hover:bg-gray-50 transition"
        >
          Ir a mi dashboard
        </Link>

      </div>
    </div>
  );
}
