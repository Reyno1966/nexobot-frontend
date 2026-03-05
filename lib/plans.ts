export const PRICE_TO_PLAN: Record<string, string> = {
  price_1T18BGRap0JkQNsmaUVhyNFr: "Starter",
  price_1T15gVRap0JkQNsm59vukMuR: "Pro",
  price_1T15jDRap0JkQNsmQRvEkpcm: "Premium",
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

export const PLAN_PRICES: Record<string, { monthly: string; stripe_price_id: string }> = {
  Starter: { monthly: "$29", stripe_price_id: "price_1T18BGRap0JkQNsmaUVhyNFr" },
  Pro:     { monthly: "$59", stripe_price_id: "price_1T15gVRap0JkQNsm59vukMuR" },
  Premium: { monthly: "$99", stripe_price_id: "price_1T15jDRap0JkQNsmQRvEkpcm" },
};
