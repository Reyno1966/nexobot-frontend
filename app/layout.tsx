import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NexoBot — Automatiza tus ventas con IA",
    template: "%s | NexoBot",
  },
  description:
    "Automatiza ventas, atención al cliente y generación de leads con tu asistente inteligente. Responde 24/7 en WhatsApp, web y redes sociales.",
  keywords: ["chatbot", "automatización", "ventas", "WhatsApp", "IA", "NexoBot"],
  authors: [{ name: "NexoBot" }],
  openGraph: {
    title: "NexoBot — Automatiza tus ventas con IA",
    description: "Tu asistente inteligente que trabaja 24/7 para hacer crecer tu negocio.",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* LANGUAGE SELECTOR */}
        <nav className="flex justify-end gap-4 p-4 text-sm font-semibold border-b border-gray-100 bg-white">
          <Link href="/" className="hover:text-blue-600 transition">🇪🇸 ES</Link>
          <Link href="/en" className="hover:text-blue-600 transition">🇺🇸 EN</Link>
          <Link href="/pt" className="hover:text-blue-600 transition">🇧🇷 PT</Link>
          <Link href="/fr" className="hover:text-blue-600 transition">🇫🇷 FR</Link>
          <Link href="/it" className="hover:text-blue-600 transition">🇮🇹 IT</Link>
          <Link href="/de" className="hover:text-blue-600 transition">🇩🇪 DE</Link>
          <Link href="/nl" className="hover:text-blue-600 transition">🇳🇱 NL</Link>
          <Link href="/ar" className="hover:text-blue-600 transition">🇸🇦 AR</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}
