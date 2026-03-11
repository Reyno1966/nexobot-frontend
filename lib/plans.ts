export const PRICE_TO_PLAN: Record<string, string> = {
  // ── Planes mensuales (actuales) ──
  price_1T8eHgRap0JkQNsmxXKjK3IH: "Starter",
  price_1T8eNZRap0JkQNsmeObpDc8j: "Pro",
  price_1T8eRdRap0JkQNsmllSsPbVs: "Premium",
  // ── Planes anuales ──
  price_1T8qkPRap0JkQNsm1MI5XoYm: "Starter",   // $134/año
  price_1T8qndRap0JkQNsmswIpSK3M: "Pro",        // $278/año
  price_1T8qr5Rap0JkQNsm8wzRX02G: "Premium",    // $470/año
  // ── Planes mensuales (legacy) ──
  price_1T18BGRap0JkQNsmaUVhyNFr: "Starter",
  price_1T15gVRap0JkQNsm59vukMuR: "Pro",
  price_1T15jDRap0JkQNsmQRvEkpcm: "Premium",
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
  free:    { bots: 1,  messages: 100,    label: "Gratis"    },
  Starter: { bots: 3,  messages: 5000,   label: "Starter"   },
  Pro:     { bots: 10, messages: 20000,  label: "Pro"       },
  Premium: { bots: -1, messages: -1,     label: "Premium"   }, // -1 = ilimitado
};

// Precios mensuales y anuales (anual = 20% descuento, 2 meses gratis)
export const PLAN_PRICES = {
  Starter: {
    monthly: { price: 14,  label: "$14",  stripe_price_id: "price_1T8eHgRap0JkQNsmxXKjK3IH" },
    annual:  { price: 134, label: "$134", monthlyEquiv: "$11", stripe_price_id: "price_1T8qkPRap0JkQNsm1MI5XoYm" },
  },
  Pro: {
    monthly: { price: 29,  label: "$29",  stripe_price_id: "price_1T8eNZRap0JkQNsmeObpDc8j" },
    annual:  { price: 278, label: "$278", monthlyEquiv: "$23", stripe_price_id: "price_1T8qndRap0JkQNsmswIpSK3M" },
  },
  Premium: {
    monthly: { price: 49,  label: "$49",  stripe_price_id: "price_1T8eRdRap0JkQNsmllSsPbVs" },
    annual:  { price: 470, label: "$470", monthlyEquiv: "$39", stripe_price_id: "price_1T8qr5Rap0JkQNsm8wzRX02G" },
  },
};
