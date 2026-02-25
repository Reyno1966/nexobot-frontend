export default function UpdatePasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Nueva contraseña</h1>

        <form action="/api/auth/update-password" method="post" className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Nueva contraseña</label>
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
            Actualizar contraseña
          </button>
        </form>
      </div>
    </div>
  );
}
