import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
    <html lang="es" style={{ scrollBehavior: "smooth" }}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* Google Ads Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-1042824233"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-1042824233');
          `}
        </Script>

        {children}
      </body>
    </html>
  );
}
