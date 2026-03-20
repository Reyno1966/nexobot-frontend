export const PRICE_TO_PLAN: Record<string, string> = {
  // ── Planes mensuales (v3 — 2026-03-20) ──
  price_1TCyOpRap0JkQNsmITpDzS3K: "Starter",   // $19/mes
  price_1TCyZtRap0JkQNsmgI7TTCsN: "Pro",        // $39/mes
  price_1TCyjDRap0JkQNsmsD2sNoh7: "Premium",    // $79/mes
  // ── Planes anuales (v3) ──
  price_1TCyWDRap0JkQNsmF2TqoFIh: "Starter",   // $182/año
  price_1TCyd3Rap0JkQNsmkNvp1VvQ: "Pro",        // $374/año
  price_1TCylLRap0JkQNsm2rjF94Ny: "Premium",    // $778/año
  // ── Planes mensuales (legacy v2) ──
  price_1T8eHgRap0JkQNsmxXKjK3IH: "Starter",
  price_1T8eNZRap0JkQNsmeObpDc8j: "Pro",
  price_1T8eRdRap0JkQNsmllSsPbVs: "Premium",
  // ── Planes anuales (legacy v2) ──
  price_1T8qkPRap0JkQNsm1MI5XoYm: "Starter",
  price_1T8qndRap0JkQNsmswIpSK3M: "Pro",
  price_1T8qr5Rap0JkQNsm8wzRX02G: "Premium",
  // ── Planes legacy (v1) ──
  price_1T18BGRap0JkQNsmaUVhyNFr: "Starter",
  price_1T15gVRap0JkQNsm59vukMuR: "Pro",
  price_1T15jDRap0JkQNsmQRvEkpcm: "Premium",
  // ── Servicios adicionales (v3) ──
  price_1TCzXvRap0JkQNsmZu8qpWIX: "Personalización Avanzada",    // $69
  price_1TCzaERap0JkQNsmDF5hgJ75: "Automatizaciones Avanzadas",  // $99
  price_1TCzdPRap0JkQNsmkZRPlJPC: "Integración Sistemas Externos", // $149
  // ── Servicios adicionales (legacy) ──
  price_1T8ehkRap0JkQNsmtky7j7ZL: "Personalización Avanzada",
  price_1T8f2CRap0JkQNsmyzuyUvU4: "Automatizaciones Avanzadas",
  price_1T8eyARap0JkQNsmWVnTTioZ: "Integración Sistemas Externos",
  price_1T161uRap0JkQNsm3BJZGOEu: "Personalización Avanzada",
  price_1T163sRap0JkQNsmOrHBQuJp: "Automatizaciones Avanzadas",
  price_1T166cRap0JkQNsmuPTOPBBu: "Integración Sistemas Externos",
};

export const PLAN_LIMITS: Record<string, { bots: number; messages: number; label: string }> = {
  free:     { bots: 1,  messages: 100,   label: "Gratis"   },
  Starter:  { bots: 2,  messages: 1000,  label: "Starter"  },
  Pro:      { bots: 5,  messages: 5000,  label: "Pro"      },
  Premium:  { bots: -1, messages: -1,    label: "Premium"  }, // -1 = ilimitado
  Business: { bots: -1, messages: -1,    label: "Premium"  }, // alias legacy → Premium
};

// Precios mensuales y anuales (anual = 2 meses gratis)
export const PLAN_PRICES = {
  Starter: {
    monthly: { price: 19,  label: "$19",  stripe_price_id: "price_1TCyOpRap0JkQNsmITpDzS3K" },
    annual:  { price: 182, label: "$182", monthlyEquiv: "$15", stripe_price_id: "price_1TCyWDRap0JkQNsmF2TqoFIh" },
  },
  Pro: {
    monthly: { price: 39,  label: "$39",  stripe_price_id: "price_1TCyZtRap0JkQNsmgI7TTCsN" },
    annual:  { price: 374, label: "$374", monthlyEquiv: "$31", stripe_price_id: "price_1TCyd3Rap0JkQNsmkNvp1VvQ" },
  },
  Premium: {
    monthly: { price: 79,  label: "$79",  stripe_price_id: "price_1TCyjDRap0JkQNsmsD2sNoh7" },
    annual:  { price: 778, label: "$778", monthlyEquiv: "$65", stripe_price_id: "price_1TCylLRap0JkQNsm2rjF94Ny" },
  },
};
