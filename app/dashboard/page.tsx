"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem("sb-session");

    if (!session) {
      router.push("/auth/login");
      return;
    }

    const parsed = JSON.parse(session);

    if (!parsed?.user) {
      router.push("/auth/login");
      return;
    }

    setUser(parsed.user);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4">Bienvenido</h1>

        <p className="text-gray-700 mb-6">
          Has iniciado sesión como:
          <br />
          <span className="font-semibold">{user.email}</span>
        </p>

        <button
          onClick={() => {
            localStorage.removeItem("sb-session");
            router.push("/auth/login");
          }}
          className="w-full bg-black text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
