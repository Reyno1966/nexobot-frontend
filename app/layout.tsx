import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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

        {children}
      </body>
    </html>
  );
}
