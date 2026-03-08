"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface User { id: string; email: string; created_at?: string }
interface Bot  { id: string; name: string; channel: string; status: string; messages_count: number; messages_this_month: number; system_prompt?: string; created_at: string }
interface Subscription { plan_name: string; status: string; current_period_end?: string; cancel_at_period_end?: boolean }
interface Profile { company_logo_url?: string | null; company_name?: string | null }
interface DayData { date: string; count: number }
interface Analytics {
  dailyMessages: DayData[];
  totalConversations: number;
  conversationsToday: number;
  messagesThisWeek: number;
}

const PLAN_MSG_LIMITS: Record<string, number> = {
  free: 100, Starter: 5000, Pro: 20000, Premium: -1,
};
const CHANNEL_LABELS: Record<string, string> = {
  web: "Web", whatsapp: "WhatsApp", telegram: "Telegram", instagram: "Instagram",
};
const STATUS_COLORS: Record<string, string> = {
  active: "bg-green-100 text-green-700",
  inactive: "bg-gray-100 text-gray-500",
  draft: "bg-yellow-100 text-yellow-700",
};

// ── Gráfico de barras SVG ──────────────────────────────────────────────
function BarChart({ data }: { data: DayData[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const max = Math.max(...data.map((d) => d.count), 1);
  const today = new Date().toISOString().substring(0, 10);

  // Dimensiones del SVG
  const W = 700;
  const H = 120;
  const PADDING = { top: 10, right: 0, bottom: 24, left: 28 };
  const chartW = W - PADDING.left - PADDING.right;
  const chartH = H - PADDING.top - PADDING.bottom;
  const barW = Math.floor(chartW / data.length) - 2;

  // Líneas guía del eje Y
  const yLines = [0, 0.25, 0.5, 0.75, 1].map((pct) => ({
    y: PADDING.top + chartH - pct * chartH,
    label: pct === 0 ? "0" : Math.round(pct * max).toString(),
  }));

  // Etiquetas del eje X (cada ~5 días)
  const xLabels = data
    .map((d, i) => ({ i, d }))
    .filter((_, i) => i === 0 || i === 6 || i === 13 || i === 20 || i === 29);

  function formatDate(dateStr: string) {
    const [, m, day] = dateStr.split("-");
    return `${parseInt(day)}/${parseInt(m)}`;
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height: "140px" }}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Grid lines */}
        {yLines.map((line, i) => (
          <g key={i}>
            <line
              x1={PADDING.left}
              y1={line.y}
              x2={W - PADDING.right}
              y2={line.y}
              stroke="#F3F4F6"
              strokeWidth={1}
            />
            <text
              x={PADDING.left - 4}
              y={line.y + 4}
              textAnchor="end"
              fontSize={8}
              fill="#9CA3AF"
            >
              {line.label}
            </text>
          </g>
        ))}

        {/* Bars */}
        {data.map((d, i) => {
          const barH = max > 0 ? Math.max((d.count / max) * chartH, d.count > 0 ? 3 : 0) : 0;
          const x = PADDING.left + i * (chartW / data.length) + 1;
          const y = PADDING.top + chartH - barH;
          const isToday = d.date === today;
          const isHovered = hovered === i;

          return (
            <g key={i}>
              {/* Hover area (invisible, full column height) */}
              <rect
                x={x}
                y={PADDING.top}
                width={barW}
                height={chartH}
                fill="transparent"
                onMouseEnter={() => setHovered(i)}
                style={{ cursor: "default" }}
              />
              {/* Actual bar */}
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={2}
                fill={
                  isHovered
                    ? isToday ? "#d4870f" : "#23a5a5"
                    : isToday ? "#F5A623" : d.count > 0 ? "#2CC5C5" : "#E5E7EB"
                }
                style={{ transition: "fill 0.15s" }}
              />
            </g>
          );
        })}

        {/* X-axis labels */}
        {xLabels.map(({ i, d }) => (
          <text
            key={i}
            x={PADDING.left + i * (chartW / data.length) + barW / 2}
            y={H - 4}
            textAnchor="middle"
            fontSize={8.5}
            fill="#9CA3AF"
          >
            {formatDate(d.date)}
          </text>
        ))}

        {/* Tooltip */}
        {hovered !== null && data[hovered] && (() => {
          const d = data[hovered];
          const x = PADDING.left + hovered * (chartW / data.length) + barW / 2;
          const tooltipX = Math.min(Math.max(x, 50), W - 50);
          return (
            <g>
              <rect
                x={tooltipX - 44}
                y={PADDING.top - 2}
                width={88}
                height={22}
                rx={5}
                fill="#111827"
              />
              <text
                x={tooltipX}
                y={PADDING.top + 13}
                textAnchor="middle"
                fontSize={9}
                fill="white"
              >
                {d.count} msg · {formatDate(d.date)}
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const [user, setUser]               = useState<User | null>(null);
  const [bots, setBots]               = useState<Bot[]>([]);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [profile, setProfile]         = useState<Profile | null>(null);
  const [analytics, setAnalytics]     = useState<Analytics | null>(null);
  const [loading, setLoading]         = useState(true);
  const [onboardingDismissed, setOnboardingDismissed] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const [meRes, botsRes, subRes, profileRes, analyticsRes] = await Promise.all([
          fetch("/api/auth/me",             { credentials: "include" }),
          fetch("/api/bots",               { credentials: "include" }),
          fetch("/api/dashboard/subscription", { credentials: "include" }),
          fetch("/api/profile",            { credentials: "include" }),
          fetch("/api/analytics",          { credentials: "include" }),
        ]);
        if (meRes.ok)       setUser((await meRes.json()).user);
        if (botsRes.ok)     setBots((await botsRes.json()).bots ?? []);
        if (subRes.ok)      setSubscription((await subRes.json()).subscription);
        if (profileRes.ok)  setProfile((await profileRes.json()).profile);
        if (analyticsRes.ok) setAnalytics(await analyticsRes.json());
      } finally {
        setLoading(false);
      }
    }
    load();
    if (localStorage.getItem("nexobot_onboarding_dismissed") === "true") {
      setOnboardingDismissed(true);
    }
  }, []);

  function dismissOnboarding() {
    localStorage.setItem("nexobot_onboarding_dismissed", "true");
    setOnboardingDismissed(true);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const activeBots    = bots.filter((b) => b.status === "active").length;
  const totalMessages = bots.reduce((acc, b) => acc + (b.messages_count ?? 0), 0);
  const msgsThisMonth = bots.reduce((acc, b) => acc + (b.messages_this_month ?? 0), 0);
  const planName      = subscription?.plan_name ?? "Gratis";
  const planLimit     = PLAN_MSG_LIMITS[planName] ?? 100;
  const usagePct      = planLimit === -1 ? 0 : Math.min(Math.round((msgsThisMonth / planLimit) * 100), 100);
  const usageColor    = usagePct >= 80 ? "from-red-400 to-orange-400" : usagePct >= 50 ? "from-[#F5A623] to-yellow-400" : "from-[#2CC5C5] to-[#F5A623]";
  const renewsOn = subscription?.current_period_end
    ? new Date(subscription.current_period_end).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : null;

  // Onboarding
  const firstBot = bots[0];
  const onboardingSteps = [
    { id: "bot",     label: "Crea tu primer bot",                desc: "El primer paso para automatizar tu negocio",     done: bots.length > 0, href: "/dashboard/bots" },
    { id: "prompt",  label: "Personaliza la inteligencia del bot", desc: "Define la personalidad y el rol de tu asistente", done: bots.some((b) => !!b.system_prompt?.trim()), href: firstBot ? `/dashboard/bots/${firstBot.id}` : "/dashboard/bots" },
    { id: "logo",    label: "Añade el logo de tu empresa",       desc: "Tu marca visible en el widget del chat",         done: !!profile?.company_logo_url, href: "/dashboard/settings" },
    { id: "install", label: "Instala el widget en tu sitio web", desc: "Comparte tu bot con tus clientes",               done: false, href: firstBot ? `/dashboard/bots/${firstBot.id}` : "/dashboard/bots" },
  ];
  const completedCount = onboardingSteps.filter((s) => s.done).length;
  const showOnboarding = !onboardingDismissed && completedCount < 3;

  // Analytics helpers
  const peakDay = analytics?.dailyMessages.reduce((a, b) => (b.count > a.count ? b : a), { date: "", count: 0 });

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Bienvenido{user?.email ? `, ${user.email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="text-gray-500 mt-1">Aquí tienes un resumen de tu cuenta NexoBot.</p>
      </div>

      {/* Onboarding */}
      {showOnboarding && (
        <div className="bg-white rounded-2xl border border-[#D9F5F5] shadow-sm p-5 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="font-semibold text-gray-900 flex items-center gap-2">
                🚀 Primeros pasos
                <span className="text-xs font-bold bg-[#EEF9F9] text-[#2CC5C5] px-2 py-0.5 rounded-full">
                  {completedCount}/{onboardingSteps.length}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-0.5">Configura NexoBot en minutos y empieza a recibir leads</p>
            </div>
            <button onClick={dismissOnboarding} className="text-gray-300 hover:text-gray-500 transition text-xl leading-none mt-0.5 flex-shrink-0" title="Cerrar">×</button>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] transition-all duration-500" style={{ width: `${(completedCount / onboardingSteps.length) * 100}%` }} />
          </div>
          <div className="space-y-2">
            {onboardingSteps.map((step) => (
              <Link key={step.id} href={step.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition group ${step.done ? "opacity-60 cursor-default pointer-events-none" : "hover:bg-[#EEF9F9]"}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${step.done ? "bg-green-100" : "bg-gray-100 group-hover:bg-[#D9F5F5]"}`}>
                  {step.done
                    ? <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    : <span className="w-2 h-2 rounded-full bg-gray-300 group-hover:bg-[#2CC5C5] transition" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${step.done ? "text-gray-400 line-through" : "text-gray-800"}`}>{step.label}</p>
                  {!step.done && <p className="text-xs text-gray-400">{step.desc}</p>}
                </div>
                {!step.done && <svg className="w-4 h-4 text-gray-300 group-hover:text-[#2CC5C5] transition flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Subscription banner */}
      <div className={`rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${subscription ? "bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white" : "bg-gradient-to-r from-gray-900 to-slate-800 text-white"}`}>
        <div>
          <p className="text-sm font-medium opacity-80">Plan actual</p>
          <p className="text-xl font-bold mt-0.5">{planName}</p>
          {renewsOn && !subscription?.cancel_at_period_end && <p className="text-sm opacity-70 mt-1">Renueva el {renewsOn}</p>}
          {subscription?.cancel_at_period_end && <p className="text-sm text-yellow-300 mt-1">⚠️ Cancela el {renewsOn}</p>}
          {!subscription && <p className="text-sm opacity-70 mt-1">1 bot · 100 mensajes/mes</p>}
        </div>
        {!subscription && (
          <Link href="/dashboard/billing" className="flex-shrink-0 bg-white text-gray-900 font-semibold px-5 py-2 rounded-xl hover:bg-gray-100 transition text-sm">
            Mejorar plan →
          </Link>
        )}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Bots activos</p>
          <p className="text-3xl font-bold text-gray-900">{activeBots}</p>
          <p className="text-xs text-gray-400 mt-1">de {bots.length} totales</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Mensajes totales</p>
          <p className="text-3xl font-bold text-gray-900">{totalMessages.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">historial completo</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Conversaciones</p>
          <p className="text-3xl font-bold text-gray-900">{(analytics?.totalConversations ?? 0).toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{analytics?.conversationsToday ?? 0} hoy</p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-500 mb-1">Esta semana</p>
          <p className="text-3xl font-bold text-[#2CC5C5]">{analytics?.messagesThisWeek ?? 0}</p>
          <p className="text-xs text-gray-400 mt-1">mensajes (7 días)</p>
        </div>
      </div>

      {/* ── Analytics: gráfico de mensajes ── */}
      {analytics && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="font-semibold text-gray-900">Mensajes por día</h2>
              <p className="text-sm text-gray-400 mt-0.5">Últimos 30 días · solo mensajes de visitantes</p>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              {peakDay && peakDay.count > 0 && (
                <span className="bg-[#EEF9F9] text-[#2CC5C5] px-3 py-1 rounded-full font-medium">
                  Pico: {peakDay.count} msgs
                </span>
              )}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#2CC5C5] inline-block" /> Mensajes
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#F5A623] inline-block" /> Hoy
                </span>
              </div>
            </div>
          </div>

          <BarChart data={analytics.dailyMessages} />

          {/* Mini resumen debajo del gráfico */}
          {analytics.dailyMessages.every((d) => d.count === 0) && (
            <div className="text-center mt-4 py-3 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-400">Aún no hay mensajes registrados. Instala tu bot para empezar.</p>
            </div>
          )}
        </div>
      )}

      {/* Panel de uso mensual */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-gray-900">Uso mensual de mensajes</p>
            <p className="text-xs text-gray-400 mt-0.5">Se reinicia el 1 de cada mes</p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${
            usagePct >= 80 ? "bg-red-50 text-red-600" :
            usagePct >= 50 ? "bg-yellow-50 text-yellow-600" :
            "bg-[#EEF9F9] text-[#2CC5C5]"
          }`}>
            {planLimit === -1 ? "Ilimitado ∞" : `${usagePct}% usado`}
          </span>
        </div>
        {planLimit !== -1 ? (
          <>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-2 overflow-hidden">
              <div className={`h-full rounded-full bg-gradient-to-r ${usageColor} transition-all duration-500`} style={{ width: `${usagePct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400">
              <span>{msgsThisMonth.toLocaleString()} mensajes usados</span>
              <span>{(planLimit - msgsThisMonth).toLocaleString()} restantes de {planLimit.toLocaleString()}</span>
            </div>
            {usagePct >= 80 && (
              <div className="mt-3 flex items-center gap-2 bg-red-50 rounded-xl px-4 py-2.5">
                <span className="text-red-500 text-sm">⚠️</span>
                <p className="text-xs text-red-600 font-medium">
                  Estás cerca del límite.{" "}
                  <a href="/dashboard/billing" className="underline font-bold">Mejora tu plan</a>{" "}
                  para no interrumpir el servicio.
                </p>
              </div>
            )}
          </>
        ) : (
          <p className="text-sm text-gray-500">Plan Premium — mensajes ilimitados ✅</p>
        )}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Link href="/dashboard/bots" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#B8EDED] hover:shadow-md transition group">
          <div className="w-10 h-10 bg-[#EEF9F9] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#D9F5F5] transition">
            <svg className="w-5 h-5 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </div>
          <p className="font-semibold text-gray-900">Crear bot</p>
          <p className="text-sm text-gray-500 mt-1">Configura tu asistente de IA</p>
        </Link>

        <Link href="/dashboard/billing" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-[#FEE8B8] hover:shadow-md transition group">
          <div className="w-10 h-10 bg-[#FEF3DC] rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#FEE8B8] transition">
            <svg className="w-5 h-5 text-[#F5A623]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <p className="font-semibold text-gray-900">Mejorar plan</p>
          <p className="text-sm text-gray-500 mt-1">Más bots y mensajes</p>
        </Link>

        <Link href="/dashboard/settings" className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:border-green-200 hover:shadow-md transition group">
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
          <Link href="/dashboard/bots" className="text-sm text-[#2CC5C5] hover:text-[#23A5A5] font-medium">Ver todos →</Link>
        </div>
        {bots.length === 0 ? (
          <div className="py-16 text-center">
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
            </div>
            <p className="text-gray-500 font-medium">Aún no tienes bots</p>
            <p className="text-gray-400 text-sm mt-1 mb-4">Crea tu primer bot de IA en segundos</p>
            <Link href="/dashboard/bots" className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white px-5 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition">
              + Crear mi primer bot
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {bots.slice(0, 5).map((bot) => (
              <Link key={bot.id} href={`/dashboard/bots/${bot.id}`} className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-[#EEF9F9] rounded-xl flex items-center justify-center">
                    <span className="text-[#2CC5C5] font-bold text-sm">{bot.name.charAt(0).toUpperCase()}</span>
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
