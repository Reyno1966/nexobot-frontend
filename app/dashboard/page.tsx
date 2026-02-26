"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/auth/login");
          return;
        }

        const data = await res.json();

        if (!data?.user) {
          router.push("/auth/login");
          return;
        }

        setUser(data.user);
        setLoading(false);
      } catch (error) {
        router.push("/auth/login");
      }
    }

    loadUser();
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

        <LogoutButton />
      </div>
    </div>
  );
}
