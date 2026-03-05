"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    // Validación básica
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setError("");
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Credenciales incorrectas");
      return;
    }

    // Login exitoso → redirigir al dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

        {/* MENSAJE DE ERROR */}
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="tuemail@example.com"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2 text-sm text-gray-600"
              >
                {showPassword ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* RECUPERAR CUENTA */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <Link href="/auth/reset" className="text-black font-medium">
            Recuperar cuenta
          </Link>
        </p>

        {/* REGISTRO */}
        <p className="text-center text-sm text-gray-500 mt-2">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/signup" className="text-black font-medium">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  );
}
