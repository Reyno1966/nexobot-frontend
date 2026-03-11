"use client";

import { usePathname } from "next/navigation";
import FloatingWidget from "./FloatingWidget";

// Rutas donde NO debe aparecer el widget
const EXCLUDED_PREFIXES = ["/dashboard", "/auth", "/checkout", "/book", "/widget", "/api"];

export default function LandingWidgetProvider() {
  const pathname = usePathname();
  const isExcluded = EXCLUDED_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  if (isExcluded) return null;
  return <FloatingWidget />;
}
