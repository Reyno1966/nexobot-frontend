"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordTokenPage({ token }: { token: string }) {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || !confirm) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
    setMessage("");

    const res = await fetch("/api/auth/reset/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al actualizar la contraseña");
      return;
    }

    setMessage("Tu contraseña ha sido actualizada correctamente.");
    setTimeout(() => router.push("/auth/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Crear nueva contraseña
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4 text-sm text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Guardar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
