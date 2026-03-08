"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import type { HealthAlert, HealthResponse } from "@/app/api/health/route";

const REFRESH_MS = 5 * 60 * 1000; // 5 minutos
const DISMISS_KEY = "nexobot_dismissed_alerts"; // sessionStorage

function getDismissed(): Set<string> {
  try {
    const raw = sessionStorage.getItem(DISMISS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveDismissed(ids: Set<string>) {
  try {
    sessionStorage.setItem(DISMISS_KEY, JSON.stringify([...ids]));
  } catch { /* noop */ }
}

// ── Íconos por nivel ────────────────────────────────────────────────────
function AlertIcon({ level }: { level: HealthAlert["level"] }) {
  if (level === "error") {
    return (
      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      </div>
    );
  }
  return (
    <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
      <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
          d="M12 8v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      </svg>
    </div>
  );
}

// ── Barra sana (todo OK) ─────────────────────────────────────────────────
function HealthyBar() {
  return (
    <div className="flex items-center gap-2.5 bg-green-50 border border-green-200 rounded-2xl px-4 py-3 mb-6">
      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <p className="text-sm font-medium text-green-700">Todos los bots funcionan correctamente</p>
      <span className="ml-auto text-xs text-green-500 flex-shrink-0">● En línea</span>
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────
export default function AlertsPanel() {
  const [alerts, setAlerts]             = useState<HealthAlert[]>([]);
  const [overall, setOverall]           = useState<HealthResponse["overall"]>("healthy");
  const [dismissed, setDismissed]       = useState<Set<string>>(new Set());
  const [loaded, setLoaded]             = useState(false);

  const fetchHealth = useCallback(async () => {
    try {
      const res = await fetch("/api/health", { credentials: "include" });
      if (!res.ok) return;
      const data: HealthResponse = await res.json();
      setAlerts(data.alerts);
      setOverall(data.overall);
    } catch { /* silencio */ }
  }, []);

  useEffect(() => {
    setDismissed(getDismissed());
    fetchHealth().then(() => setLoaded(true));
    const interval = setInterval(fetchHealth, REFRESH_MS);
    return () => clearInterval(interval);
  }, [fetchHealth]);

  function dismissAlert(id: string) {
    const next = new Set(dismissed).add(id);
    setDismissed(next);
    saveDismissed(next);
  }

  if (!loaded) return null; // nada hasta que cargue

  // Filtrar alertas ya descartadas
  const visible = alerts.filter((a) => !dismissed.has(a.id));

  // Si no hay alertas visibles, mostrar barra verde (solo si no hay ninguna activa)
  if (visible.length === 0) {
    // Solo mostrar ✅ si el overall fue healthy (no si el usuario descartó todo)
    return overall === "healthy" ? <HealthyBar /> : null;
  }

  return (
    <div className="mb-6 space-y-3">
      {/* Header de panel */}
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-2 h-2 rounded-full animate-pulse ${overall === "error" ? "bg-red-500" : "bg-yellow-500"}`} />
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
          {overall === "error" ? "Requiere atención" : "Avisos del sistema"}
        </p>
        <span className="ml-1 text-xs font-bold bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
          {visible.length}
        </span>
      </div>

      {visible.map((alert) => (
        <div
          key={alert.id}
          className={`flex items-start gap-3 p-4 rounded-2xl border ${
            alert.level === "error"
              ? "bg-red-50 border-red-200"
              : "bg-yellow-50 border-yellow-200"
          }`}
        >
          <AlertIcon level={alert.level} />

          <div className="flex-1 min-w-0">
            <p className={`text-sm font-semibold ${alert.level === "error" ? "text-red-700" : "text-yellow-800"}`}>
              {alert.title}
            </p>
            <p className={`text-xs mt-0.5 leading-relaxed ${alert.level === "error" ? "text-red-600/80" : "text-yellow-700/80"}`}>
              {alert.description}
            </p>
            <Link
              href={alert.href}
              className={`inline-flex items-center gap-1 mt-2 text-xs font-bold transition ${
                alert.level === "error"
                  ? "text-red-600 hover:text-red-700"
                  : "text-yellow-700 hover:text-yellow-800"
              }`}
            >
              {alert.action}
            </Link>
          </div>

          {/* Descartar alerta */}
          <button
            onClick={() => dismissAlert(alert.id)}
            className="text-gray-300 hover:text-gray-500 transition flex-shrink-0 mt-0.5"
            title="Descartar"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
