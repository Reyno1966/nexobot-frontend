"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import NotificationToast from "@/components/dashboard/NotificationToast";

interface User {
  id: string;
  email: string;
}

interface ToastData {
  count: number;
  botName: string;
}

const LS_KEY = "nexobot_notifications_seen";
const POLL_INTERVAL_MS = 30_000; // 30 segundos

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [newConversations, setNewConversations] = useState(0);
  const [toast, setToast] = useState<ToastData | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Cuando el usuario está en la página de conversaciones, marcar todo como visto
  useEffect(() => {
    if (pathname === "/dashboard/conversations") {
      localStorage.setItem(LS_KEY, new Date().toISOString());
      setNewConversations(0);
    }
  }, [pathname]);

  // Polling de notificaciones
  const pollNotifications = useCallback(async () => {
    try {
      const since = localStorage.getItem(LS_KEY) ?? new Date(Date.now() - 60_000).toISOString();
      const res = await fetch(`/api/notifications?since=${encodeURIComponent(since)}`, {
        credentials: "include",
      });
      if (!res.ok) return;

      const data = await res.json();
      const count: number = data.newConversations ?? 0;

      if (count > 0) {
        setNewConversations(count);

        // Solo mostrar toast si no estamos ya en la página de conversaciones
        if (pathname !== "/dashboard/conversations") {
          const botName =
            count === 1
              ? (data.latest?.[0]?.bot_name ?? "Tu bot")
              : `${data.latest?.[0]?.bot_name ?? "Tu bot"} y ${count - 1} más`;
          setToast({ count, botName });
        }
      }
    } catch {
      // silencio — no interrumpir la UI si falla la notificación
    }
  }, [pathname]);

  // Auth check inicial
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

  // Polling — arranca solo cuando el usuario está autenticado
  useEffect(() => {
    if (!user) return;

    // Primera comprobación al autenticarse
    pollNotifications();

    const interval = setInterval(pollNotifications, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [user, pollNotifications]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-500 text-sm">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar userEmail={user?.email} newConversations={newConversations} />

      {/* Main content - offset by sidebar width on desktop, top bar on mobile */}
      <main className="lg:ml-64 pt-[56px] lg:pt-0 min-h-screen">
        {children}
      </main>

      {/* Toast de notificación */}
      {toast && (
        <NotificationToast
          key={`${toast.count}-${toast.botName}`}
          count={toast.count}
          botName={toast.botName}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
