"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User { id: string; email: string; created_at?: string }
interface Bot { id: string; name: string; channel: string; status: string; messages_count: number; created_at: string }
interface Subscription { plan_name: string; status: string; current_period_end?: string; cancel_at_period_end?: boolean }

const CHANNEL_LABELS: Record<string, string> = {
  web: "Web", whatsapp: "WhatsApp", telegram: "Telegram", instagram: "Instagram",
};
const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
  draft: "bg-yellow-100 text-yellow-700",
};

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bots, setBots] = useState<Bot[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [meRes, botsRes, subRes] = await Promise.all([
          fetch("/api/auth/me", { credentials: "include" }),
          fetch("/api/bots", { credentials: "include" }),
          fetch("/api/dashboard/subscription", { credentials: "include" }),
        ]);
        if (meRes.ok) setUser((await meRes.json()).user);
        if (botsRes.ok) setBots((await botsRes.json()).bots ?? []);
        if (subRes.ok) setSubscription((await subRes.json()).subscription);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeBots = bots.filter((b) => b.status === "active").length;
  const totalMessages = bots.reduce((acc, b) => acc + (b.messages_count ?? 0), 0);
  const planName = subscription?.plan_name ?? "Gratis";
  const renewsOn = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu cuenta NexoBot.</p>
      </div>

      {/* Subscription banner */}
      <div className={`rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${subscription ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white" : "bg-gradient-to-r from-gray-900 to-slate-800 text-white"}`}>
        <div>
          <p className="text-sm font-medium opacity-80">Plan actual</p>
          <p className="text-xl font-bold mt-0.5">{planName}</p>
          {renewsOn && !subscription?.cancel_at_period_end && (
            <p className="text-sm opacity-70 mt-1">Renueva el {renewsOn}</p>
          )}
          {subscription?.cancel_at_period_end && (
            <p className="text-sm text-yellow-300 mt-1">⚠️ Cancela el {renewsOn}</p>
          )}
          {!subscription && (
            <p className="text-sm opacity-70 mt-1">1 bot · 100 mensajes/mes</p>
          )}
        </div>
        {!subscription && (
          <Link
            href="/dashboard/billing"
            className="flex-shrink-0 bg-white text-gray-900 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition text-sm"
          >
            Mejorar plan →
          </Link>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Bots activos</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{activeBots}</p>
          <p className="text-xs text-gray-400 mt-1">de {bots.length} totales</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Mensajes procesados</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{totalMessages.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">este mes</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-sm text-gray-500">Estado de cuenta</p>
          <p className="text-3xl font-bold text-green-600 mt-1">Activa</p>
          <p className="text-xs text-gray-400 mt-1">{planName}</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link
          href="/dashboard/bots"
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-blue-200 hover:shadow-md transition group"
        >
          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-blue-100 transition">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <p className="font-semibold text-gray-900">Crear bot</p>
          <p className="text-sm text-gray-500 mt-1">Configura tu asistente de IA</p>
        </Link>

        <Link
          href="/dashboard/billing"
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-purple-200 hover:shadow-md transition group"
        >
          <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-purple-100 transition">
            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <p className="font-semibold text-gray-900">Mejorar plan</p>
          <p className="text-sm text-gray-500 mt-1">Más bots y mensajes</p>
        </Link>

        <Link
          href="/dashboard/settings"
          className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md transition group"
        >
          <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mb-3 group-hover:bg-green-100 transition">
            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-semibold text-gray-900">Configuración</p>
          <p className="text-sm text-gray-500 mt-1">Gestiona tu cuenta</p>
        </Link>
      </div>

      {/* Recent bots */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-900">Mis bots recientes</h2>
          <Link href="/dashboard/bots" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Ver todos →
          </Link>
        </div>

        {bots.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Aún no tienes bots</p>
            <p className="text-gray-400 text-sm mt-1 mb-4">Crea tu primer bot de IA en segundos</p>
            <Link
              href="/dashboard/bots"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-violet-600 text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition"
            >
              + Crear mi primer bot
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {bots.slice(0, 5).map((bot) => (
              <div key={bot.id} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">{bot.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{bot.name}</p>
                    <p className="text-xs text-gray-400">{CHANNEL_LABELS[bot.channel] ?? bot.channel}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400">{bot.messages_count ?? 0} msgs</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_COLORS[bot.status] ?? "bg-gray-100 text-gray-500"}`}>
                    {bot.status === "active" ? "Activo" : bot.status === "inactive" ? "Inactivo" : "Borrador"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
