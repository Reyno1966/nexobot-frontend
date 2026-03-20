export const PRICE_TO_PLAN: Record<string, string> = {
  // ── Planes mensuales (actuales v2 — nuevo pricing 2026-03-20) ──
  // TODO: Crear nuevos productos en Stripe y reemplazar estos IDs
  price_1T8eHgRap0JkQNsmxXKjK3IH: "Starter",   // $19/mes (mostrar nuevo precio, ID legacy)
  price_1T8eNZRap0JkQNsmeObpDc8j: "Pro",        // $39/mes
  price_1T8eRdRap0JkQNsmllSsPbVs: "Business",   // $79/mes
  // ── Planes anuales ──
  price_1T8qkPRap0JkQNsm1MI5XoYm: "Starter",   // $190/año
  price_1T8qndRap0JkQNsmswIpSK3M: "Pro",        // $390/año
  price_1T8qr5Rap0JkQNsm8wzRX02G: "Business",   // $790/año
  // ── Planes legacy (mantener para clientes existentes) ──
  price_1T18BGRap0JkQNsmaUVhyNFr: "Starter",
  price_1T15gVRap0JkQNsm59vukMuR: "Pro",
  price_1T15jDRap0JkQNsmQRvEkpcm: "Business",   // era Premium → ahora Business
  // ── Servicios adicionales (actuales) ──
  price_1T8ehkRap0JkQNsmtky7j7ZL: "Personalización Avanzada",
  price_1T8f2CRap0JkQNsmyzuyUvU4: "Automatizaciones Avanzadas",
  price_1T8eyARap0JkQNsmWVnTTioZ: "Integración Sistemas Externos",
  // ── Servicios adicionales (legacy) ──
  price_1T161uRap0JkQNsm3BJZGOEu: "Personalización Avanzada",
  price_1T163sRap0JkQNsmOrHBQuJp: "Automatizaciones Avanzadas",
  price_1T166cRap0JkQNsmuPTOPBBu: "Integración Sistemas Externos",
};

export const PLAN_LIMITS: Record<string, { bots: number; messages: number; label: string }> = {
  free:     { bots: 1,  messages: 100,   label: "Gratis"   },
  Starter:  { bots: 2,  messages: 1000,  label: "Starter"  },
  Pro:      { bots: 5,  messages: 5000,  label: "Pro"      },
  Business: { bots: -1, messages: -1,    label: "Business" }, // -1 = ilimitado
  Premium:  { bots: -1, messages: -1,    label: "Business" }, // alias legacy → Business
};

// Precios mensuales y anuales (anual = 2 meses gratis, paga 10)
// TODO: Crear nuevos productos en Stripe con estos precios y actualizar los stripe_price_id
export const PLAN_PRICES = {
  Starter: {
    monthly: { price: 19,  label: "$19",  stripe_price_id: "price_1T8eHgRap0JkQNsmxXKjK3IH" },
    annual:  { price: 190, label: "$190", monthlyEquiv: "$16", stripe_price_id: "price_1T8qkPRap0JkQNsm1MI5XoYm" },
  },
  Pro: {
    monthly: { price: 39,  label: "$39",  stripe_price_id: "price_1T8eNZRap0JkQNsmeObpDc8j" },
    annual:  { price: 390, label: "$390", monthlyEquiv: "$33", stripe_price_id: "price_1T8qndRap0JkQNsmswIpSK3M" },
  },
  Business: {
    monthly: { price: 79,  label: "$79",  stripe_price_id: "price_1T8eRdRap0JkQNsmllSsPbVs" },
    annual:  { price: 790, label: "$790", monthlyEquiv: "$66", stripe_price_id: "price_1T8qr5Rap0JkQNsm8wzRX02G" },
  },
};
