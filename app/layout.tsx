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
  title: "NexoBot",
  description: "Your intelligent assistant that automates sales and customer support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>

        {/* LANGUAGE SELECTOR */}
        <div className="flex justify-end gap-4 p-4 text-sm font-semibold">
          <a href="/" className="hover:text-blue-600 transition">🇪🇸 ES</a>
          <a href="/en" className="hover:text-blue-600 transition">🇺🇸 EN</a>
          <a href="/pt" className="hover:text-blue-600 transition">🇧🇷 PT</a>
          <a href="/fr" className="hover:text-blue-600 transition">🇫🇷 FR</a>
          <a href="/it" className="hover:text-blue-600 transition">🇮🇹 IT</a>
          <a href="/de" className="hover:text-blue-600 transition">🇩🇪 DE</a>
          <a href="/nl" className="hover:text-blue-600 transition">🇳🇱 NL</a>
          <a href="/ar" className="hover:text-blue-600 transition">🇸🇦 AR</a>
        </div>

        {children}
      </body>
    </html>
  );
}
