"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { href: "#features",     label: "Características" },
  { href: "#how-it-works", label: "Cómo funciona" },
  { href: "#pricing",      label: "Precios" },
  { href: "#faq",          label: "FAQ" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 70);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Cierra menú al hacer scroll
  useEffect(() => {
    if (scrolled) setMenuOpen(false);
  }, [scrolled]);

  // Bloquea scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
            : "bg-[#041414]/70 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src="/nexobot-logo.png"
              alt="NexoBot"
              width={130}
              height={40}
              className={`h-9 w-auto object-contain transition-all duration-300 ${
                !scrolled ? "brightness-0 invert" : ""
              }`}
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                className={`relative px-4 py-2 text-sm font-semibold rounded-lg transition-all group ${
                  scrolled
                    ? "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                    : "text-white/75 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 group-hover:w-1/2 h-[2px] rounded-full bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <a
              href="/auth/login"
              className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all ${
                scrolled
                  ? "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              Iniciar sesión
            </a>
            <a
              href="/auth/signup"
              className="px-5 py-2.5 bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-bold rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-[#0A5555]/30"
            >
              Empezar gratis →
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className={`md:hidden p-2 rounded-xl transition-all ${
              scrolled
                ? "text-gray-700 hover:bg-gray-100"
                : "text-white hover:bg-white/10"
            }`}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                menuOpen
                  ? "rotate-45 translate-y-[9px] bg-white"
                  : scrolled ? "bg-gray-700" : "bg-white"
              }`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 ${
                menuOpen
                  ? "opacity-0 scale-x-0"
                  : scrolled ? "bg-gray-700" : "bg-white"
              }`} />
              <span className={`block h-0.5 rounded-full transition-all duration-300 origin-center ${
                menuOpen
                  ? "-rotate-45 -translate-y-[9px] bg-white"
                  : scrolled ? "bg-gray-700" : "bg-white"
              }`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-[69px] left-0 right-0 bg-[#041414] border-b border-white/10 transition-all duration-300 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          <div className="px-6 pt-4 pb-6 space-y-1">
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3.5 px-4 rounded-xl text-white/80 hover:text-white hover:bg-white/5 text-base font-semibold transition-all group"
              >
                {label}
                <svg className="w-4 h-4 text-white/20 group-hover:text-[#2CC5C5] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            ))}

            {/* Divider */}
            <div className="h-px bg-white/10 my-3" />

            {/* CTAs */}
            <a
              href="/auth/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center py-3 px-4 rounded-xl border border-white/15 text-white/70 hover:text-white hover:border-white/30 text-sm font-semibold transition-all"
            >
              Iniciar sesión
            </a>
            <a
              href="/auth/signup"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#2CC5C5] to-[#F5A623] text-white text-sm font-bold hover:opacity-90 transition-all shadow-lg mt-2"
            >
              Empezar gratis — es gratis →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
