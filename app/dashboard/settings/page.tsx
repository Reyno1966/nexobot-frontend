"use client";

import { useEffect, useRef, useState } from "react";
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
  const [profile, setProfile] = useState<Profile>({
    company_name: "", company_logo_url: "", company_address: "",
    company_phone: "", company_email: "", company_website: "",
  });
  const [brandSaving, setBrandSaving]   = useState(false);
  const [brandMessage, setBrandMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [logoPreview, setLogoPreview]   = useState<string>("");
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoError, setLogoError]       = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  // ── Subida directa de logo ──
  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoUploading(true);
    setLogoError(false);
    setBrandMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res  = await fetch("/api/profile/upload-logo", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const data = await res.json();

      if (res.ok && data.url) {
        setProfile((p) => ({ ...p, company_logo_url: data.url }));
        setLogoPreview(data.url);
        setBrandMessage({ type: "success", text: "✅ Logo subido correctamente. Recuerda guardar los cambios." });
      } else {
        setBrandMessage({ type: "error", text: data.error ?? "Error al subir el logo." });
      }
    } catch {
      setBrandMessage({ type: "error", text: "Error de conexión al subir la imagen." });
    } finally {
      setLogoUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

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
      const res  = await fetch("/api/auth/update-password", {
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
      const res  = await fetch("/api/profile", {
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
        <div className="w-10 h-10 border-4 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
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
          <div className="w-9 h-9 bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] rounded-xl flex items-center justify-center">
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

        {/* Preview del widget */}
        <div className="mb-5 bg-gradient-to-r from-[#041414] to-[#062828] rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#2CC5C5] to-[#F5A623] flex items-center justify-center flex-shrink-0">
            {logoPreview && !logoError ? (
              <Image
                src={logoPreview} alt="Logo" width={40} height={40}
                className="w-full h-full object-cover"
                onError={() => setLogoError(true)}
              />
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

          {/* ── LOGO: subida directa + URL ── */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Logo de la empresa</label>

            {/* Zona de subida */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-200 rounded-xl p-5 text-center cursor-pointer hover:border-[#2CC5C5] hover:bg-[#EEF9F9] transition-all group mb-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp,image/gif,image/svg+xml"
                onChange={handleLogoUpload}
                className="hidden"
              />

              {logoUploading ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-3 border-[#2CC5C5] border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm text-[#2CC5C5] font-medium">Subiendo imagen...</p>
                </div>
              ) : logoPreview && !logoError ? (
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={logoPreview} alt="Logo preview" width={64} height={64}
                    className="w-16 h-16 object-contain rounded-xl"
                    onError={() => setLogoError(true)}
                  />
                  <p className="text-xs text-gray-400">Haz clic para cambiar el logo</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-[#EEF9F9] rounded-xl flex items-center justify-center group-hover:bg-[#D9F5F5] transition">
                    <svg className="w-6 h-6 text-[#2CC5C5]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Haz clic para subir tu logo</p>
                  <p className="text-xs text-gray-400">JPG, PNG, WebP, GIF o SVG · Máx. 2MB</p>
                </div>
              )}
            </div>

            {/* URL manual como alternativa */}
            <div className="flex items-center gap-2 mb-1">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400">o pega una URL</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>
            <input
              type="url"
              value={profile.company_logo_url ?? ""}
              onChange={(e) => {
                setProfile((p) => ({ ...p, company_logo_url: e.target.value }));
                setLogoPreview(e.target.value);
                setLogoError(false);
              }}
              placeholder="https://tuempresa.com/logo.png"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5] mt-2"
            />
          </div>

          {/* Nombre de empresa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de la empresa *</label>
            <input
              type="text"
              value={profile.company_name ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, company_name: e.target.value }))}
              placeholder="Ej: Acme Solutions S.A."
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
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
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={profile.company_phone ?? ""}
                onChange={(e) => setProfile((p) => ({ ...p, company_phone: e.target.value }))}
                placeholder="+1 555 0000"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
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
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sitio web</label>
            <input
              type="url"
              value={profile.company_website ?? ""}
              onChange={(e) => setProfile((p) => ({ ...p, company_website: e.target.value }))}
              placeholder="https://tuempresa.com"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
            />
          </div>

          {brandMessage && (
            <div className={`rounded-xl px-4 py-3 text-sm ${
              brandMessage.type === "success"
                ? "bg-green-50 text-green-700 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}>
              {brandMessage.text}
            </div>
          )}

          <button
            type="submit"
            disabled={brandSaving || logoUploading}
            className="w-full py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
          >
            {brandSaving ? "Guardando..." : "💾 Guardar branding"}
          </button>
        </form>
      </div>

      {/* ── CUENTA ── */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Información de cuenta</h2>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 bg-[#EEF9F9] rounded-2xl flex items-center justify-center overflow-hidden">
            {logoPreview && !logoError ? (
              <Image src={logoPreview} alt="Logo" width={56} height={56} className="w-full h-full object-cover" onError={() => setLogoError(true)} />
            ) : (
              <span className="text-[#2CC5C5] font-bold text-xl uppercase">
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
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar nueva contraseña</label>
            <input
              type="password"
              value={pwForm.confirm}
              onChange={(e) => setPwForm((f) => ({ ...f, confirm: e.target.value }))}
              placeholder="Repite la contraseña"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2CC5C5]"
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
            className="w-full py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white rounded-xl text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
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
          className="inline-flex items-center gap-2 text-sm font-medium text-[#2CC5C5] hover:text-[#23A5A5] transition">
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
