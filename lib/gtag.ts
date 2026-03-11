// Google Ads & Analytics — helpers de conversión
// Tag ID: AW-1042824233

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = "AW-1042824233";

// ── Evento: nuevo registro de usuario ──
export function trackSignUp() {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "sign_up", {
    method: "email",
  });
  // Conversión de Google Ads
  window.gtag("event", "conversion", {
    send_to: `${GA_ID}/sign_up`,
  });
}

// ── Evento: pago completado ──
export function trackPurchase({
  transactionId,
  value,
  currency = "USD",
  planName,
}: {
  transactionId: string;
  value: number;
  currency?: string;
  planName: string;
}) {
  if (typeof window === "undefined" || !window.gtag) return;
  // Evento estándar de compra (Google Ads + Analytics)
  window.gtag("event", "purchase", {
    transaction_id: transactionId,
    value,
    currency,
    items: [{ item_name: `NexoBot ${planName}`, quantity: 1, price: value }],
  });
  // Conversión de Google Ads
  window.gtag("event", "conversion", {
    send_to: `${GA_ID}/purchase`,
    value,
    currency,
    transaction_id: transactionId,
  });
}

// ── Evento: inicio de checkout (clic en "Suscribirse") ──
export function trackBeginCheckout(planName: string, value: number) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "begin_checkout", {
    currency: "USD",
    value,
    items: [{ item_name: `NexoBot ${planName}`, quantity: 1, price: value }],
  });
}
