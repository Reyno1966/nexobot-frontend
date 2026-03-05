"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    const confirm = (form.elements.namedItem("confirm_password") as HTMLInputElement).value;

    // Validación: contraseñas iguales
    if (password !== confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Validación: longitud mínima
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData(form);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Error al crear la cuenta");
      return;
    }

    // Registro exitoso → hacer login automático
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const loginRes = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (loginRes.ok) {
      router.push("/dashboard");
    } else {
      // Si no se puede hacer login automático, redirigir al login
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h1>

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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium mb-1">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirm_password"
                placeholder="••••••••"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-2 text-sm text-gray-600"
              >
                {showConfirm ? "Ocultar" : "Ver"}
              </button>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Olvidaste tu contraseña?{" "}
          <Link href="/auth/reset" className="text-black font-medium">
            Recuperar cuenta
          </Link>
        </p>

        <p className="text-center text-sm text-gray-500 mt-2">
          ¿Ya tienes cuenta?{" "}
          <Link href="/auth/login" className="text-black font-medium">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
