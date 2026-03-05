"use client";

import { useState } from "react";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setError("El email es obligatorio");
      return;
    }

    setError("");
    setMessage("");

    const res = await fetch("/api/auth/reset", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Error al enviar el correo");
      return;
    }

    setMessage("Si el correo existe, recibirás un enlace para recuperar tu cuenta.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Recuperar contraseña</h1>

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
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="tuemail@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Enviar enlace
          </button>
        </form>
      </div>
    </div>
  );
}
