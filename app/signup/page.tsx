"use client";

import { useState } from "react";
import Link from "next/link";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Crear cuenta</h1>

        {error && (
          <p className="text-red-600 text-center mb-4 font-semibold">{error}</p>
        )}

        <form
          action="/auth/signup"
          method="post"
          className="space-y-4"
          onSubmit={(e) => {
            const form = e.currentTarget;
            const password = form.password.value;
            const confirm = form.confirm.value;

            if (password !== confirm) {
              e.preventDefault();
              setError("Las contraseñas no coinciden");
            }
          }}
        >
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full border px-3 py-2 rounded-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-sm text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Ocultar" : "Mostrar"}
              </button>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirmar contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirm"
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold"
          >
            Crear cuenta
          </button>
        </form>

        <p className="text-center mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-blue-600 font-semibold">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
