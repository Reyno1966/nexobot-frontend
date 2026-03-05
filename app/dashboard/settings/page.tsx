"use client";

import { useEffect, useState } from "react";

interface User { id: string; email: string; created_at?: string }

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Change password form
  const [pwForm, setPwForm] = useState({ current: "", next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/auth/me", { credentials: "include" });
      if (res.ok) setUser((await res.json()).user);
      setLoading(false);
    }
    load();
  }, []);

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwMessage(null);

    if (pwForm.next !== pwForm.confirm) {
      setPwMessage({ type: "error", text: "Las contraseñas nuevas no coinciden." });
      return;
    }
    if (pwForm.next.length < 8) {
      setPwMessage({ type: "error", text: "La contraseña debe tener mínimo 8 caracteres." });
      return;
    }

    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: pwForm.next }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMessage({ type: "success", text: "Contraseña actualizada correctamente." });
        setPwForm({ current: "", next: "", confirm: "" });
      } else {
        setPwMessage({ type: "error", text: data.error ?? "Error al actualizar la contraseña." });
      }
    } finally {
      setPwLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Gestiona tu cuenta y preferencias</p>
      </div>

      {/* Account info */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Información de cuenta</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
            <span className="text-blue-700 font-bold text-xl uppercase">
              {user?.email?.charAt(0) ?? "U"}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.email}</p>
            {joinedDate && <p className="text-sm text-gray-400 mt-0.5">Miembro desde {joinedDate}</p>}
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl px-4 py-3">
          <p className="text-xs text-gray-400 mb-1">Email</p>
          <p className="text-sm font-medium text-gray-700">{user?.email}</p>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={pwForm.next}
              onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
              placeholder="Repite la contraseña"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {pwMessage && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              pwMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {pwMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={pwLoading || !pwForm.next || !pwForm.confirm}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {pwLoading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>

      {/* Support */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Soporte</h2>
        <p className="text-sm text-gray-500 mb-4">
          ¿Tienes algún problema o pregunta? Escríbenos y te ayudamos.
        </p>
        <a
          href="mailto:support@nexobot.net"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          support@nexobot.net
        </a>
      </div>
    </div>
  );
}
