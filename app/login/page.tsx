import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Iniciar sesión</h1>

        <form action="/api/auth/login" method="post" className="space-y-4">
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
            <input
              type="password"
              name="password"
              required
              className="w-full border px-3 py-2 rounded-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
          >
            Entrar
          </button>
        </form>

        <p className="text-center mt-4">
          ¿No tienes cuenta?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
