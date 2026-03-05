"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

interface User {
  id: string;
  email: string;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        if (!res.ok) { router.push("/auth/login"); return; }
        const data = await res.json();
        if (!data?.user) { router.push("/auth/login"); return; }
        setUser(data.user);
      } catch {
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userEmail={user?.email} />
      {/* Main content - offset by sidebar width on desktop, top bar on mobile */}
      <main className="lg:ml-64 pt-[56px] lg:pt-0 min-h-screen">
        {children}
      </main>
    </div>
  );
}
