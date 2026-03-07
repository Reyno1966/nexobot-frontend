"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface User    { id: string; email: string; created_at?: string }
interface Profile {
  company_name:     string | null;
  company_logo_url: string | null;
  company_address:  string | null;
  company_phone:    string | null;
  company_email:    string | null;
  company_website:  string | null;
}

export default function SettingsPage() {
  const [user, setUser]       = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Password form
  const [pwForm, setPwForm]       = useState({ next: "", confirm: "" });
  const [pwLoading, setPwLoading] = useState(false);
  const [pwMessage, setPwMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Branding form
  const [profile, setProfile]       = useState<Profile>({
    company_name: "", company_logo_url: "", company_address: "",
    company_phone: "", company_email: "", company_website: "",
  });
  const [brandSaving, setBrandSaving] = useState(false);
  const [brandMessage, setBrandMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [logoPreview, setLogoPreview]   = useState<string>("");

  useEffect(() => {
    async function load() {
      const [meRes, profileRes] = await Promise.all([
        fetch("/api/auth/me",  { credentials: "include" }),
        fetch("/api/profile",  { credentials: "include" }),
      ]);
      if (meRes.ok)      setUser((await meRes.json()).user);
      if (profileRes.ok) {
        const { profile: p } = await profileRes.json();
        if (p) {
          setProfile({
            company_name:     p.company_name     ?? "",
            company_logo_url: p.company_logo_url ?? "",
            company_address:  p.company_address  ?? "",
            company_phone:    p.company_phone    ?? "",
            company_email:    p.company_email    ?? "",
            company_website:  p.company_website  ?? "",
          });
          if (p.company_logo_url) setLogoPreview(p.company_logo_url);
        }
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleChangePassword(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPwMessage(null);
    if (pwForm.next !== pwForm.confirm) {
      setPwMessage({ type: "error", text: "Las contraseñas nuevas no coinciden." }); return;
    }
    if (pwForm.next.length < 8) {
      setPwMessage({ type: "error", text: "La contraseña debe tener mínimo 8 caracteres." }); return;
    }
    setPwLoading(true);
    try {
      const res = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password: pwForm.next }),
      });
      const data = await res.json();
      if (res.ok) {
        setPwMessage({ type: "success", text: "Contraseña actualizada correctamente." });
        setPwForm({ next: "", confirm: "" });
      } else {
        setPwMessage({ type: "error", text: data.error ?? "Error al actualizar la contraseña." });
      }
    } finally { setPwLoading(false); }
  }

  async function handleSaveBranding(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBrandMessage(null);
    setBrandSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(profile),
      });
      const data = await res.json();
      if (res.ok) {
        setBrandMessage({ type: "success", text: "¡Branding guardado correctamente!" });
        if (profile.company_logo_url) setLogoPreview(profile.company_logo_url);
      } else {
        setBrandMessage({ type: "error", text: data.error ?? "Error al guardar." });
      }
    } catch {
      setBrandMessage({ type: "error", text: "Error de conexión." });
    } finally { setBrandSaving(false); }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
        <p className="text-gray-500 mt-1">Gestiona tu cuenta, empresa y preferencias</p>
      </div>

      {/* ── BRANDING DE EMPRESA ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-violet-600 rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">Branding de tu empresa</h2>
            <p className="text-xs text-gray-400">Aparece en tu widget de chat, facturas y dashboard</p>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-5 bg-gradient-to-r from-[#050816] to-[#0d1537] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
            {logoPreview ? (
              <Image src={logoPreview} alt="Logo" width={40} height={40} className="w-full h-full object-cover" onError={() => setLogoPreview("")} />
            ) : (
              <span className="text-white font-bold text-sm">
                {profile.company_name?.charAt(0)?.toUpperCase() || "E"}
              </span>
            )}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              {profile.company_name || "Nombre de tu empresa"}
            </p>
            <p className="text-green-400 text-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full inline-block" />
              En línea
            </p>
          </div>
          <span className="ml-auto text-xs text-white/30 italic">Vista previa del widget</span>
        </div>

        <form onSubmit={handleSaveBranding} className="space-y-4">
          {/* Logo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL del Logo
            </label>
            <input
              type="url"
              value={profile.company_logo_url ?? ""}
              onChange={(e) => {
                setProfile((p) => ({ ...p, company_logo_url: e.target.value }));
                setLogoPreview(e.target.value);
              }}
              placeholder="https://tuempresa.com/logo.png"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-xs text-gray-400 mt-1">
              💡 Sube tu logo a <a href="https://imgur.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">imgur.com</a> o cualquier hosting de imágenes y pega la URL aquí
            </p>
          </div>

          {/* Nombre de empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa *</label>
            <input
              type="text"
              value={profile.company_name ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, company_name: e.target.value }))}
              placeholder="Ej: Acme Solutions S.A."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de empresa</label>
              <input
                type="email"
                value={profile.company_email ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, company_email: e.target.value }))}
                placeholder="contacto@tuempresa.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={profile.company_phone ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, company_phone: e.target.value }))}
                placeholder="+1 555 0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              type="text"
              value={profile.company_address ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, company_address: e.target.value }))}
              placeholder="Calle Principal 123, Ciudad, País"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
            <input
              type="url"
              value={profile.company_website ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, company_website: e.target.value }))}
              placeholder="https://tuempresa.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {brandMessage && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              brandMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {brandMessage.type === "success" ? "✅" : "⚠️"} {brandMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={brandSaving}
            className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {brandSaving ? "Guardando..." : "💾 Guardar branding"}
          </button>
        </form>
      </div>

      {/* ── CUENTA ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Información de cuenta</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center overflow-hidden">
            {logoPreview ? (
              <Image src={logoPreview} alt="Logo" width={56} height={56} className="w-full h-full object-cover" onError={() => setLogoPreview("")} />
            ) : (
              <span className="text-blue-700 font-bold text-xl uppercase">
                {profile.company_name?.charAt(0) || user?.email?.charAt(0) || "U"}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-gray-900">{profile.company_name || user?.email}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
            {joinedDate && <p className="text-xs text-gray-400 mt-0.5">Miembro desde {joinedDate}</p>}
          </div>
        </div>
      </div>

      {/* ── CONTRASEÑA ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Cambiar contraseña</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={pwForm.next}
              onChange={(e) => setPwForm((f) => ({ ...f, next: e.target.value }))}
              placeholder="Mínimo 8 caracteres"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
              placeholder="Repite la contraseña"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {pwMessage && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              pwMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {pwMessage.text}
            </div>
          )}
          <button
            type="submit"
            disabled={pwLoading || !pwForm.next || !pwForm.confirm}
            className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
          >
            {pwLoading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>

      {/* ── SOPORTE ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-2">Soporte</h2>
        <p className="text-sm text-gray-500 mb-4">¿Tienes algún problema o pregunta? Escríbenos.</p>
        <a href="mailto:support@nexobot.net"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700 transition">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          support@nexobot.net
        </a>
      </div>
    </div>
  );
}
