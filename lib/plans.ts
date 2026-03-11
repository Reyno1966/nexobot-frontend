export const PRICE_TO_PLAN: Record<string, string> = {
  // Suscripciones mensuales (precios actuales)
  price_1T8eHgRap0JkQNsmxXKjK3IH: "Starter",
  price_1T8eNZRap0JkQNsmeObpDc8j: "Pro",
  price_1T8eRdRap0JkQNsmllSsPbVs: "Premium",
  // Servicios adicionales (pago único)
  price_1T8ehkRap0JkQNsmtky7j7ZL: "Personalización Avanzada",
  price_1T8f2CRap0JkQNsmyzuyUvU4: "Automatizaciones Avanzadas",
  price_1T8eyARap0JkQNsmWVnTTioZ: "Integración Sistemas Externos",
};

export const PLAN_LIMITS: Record<string, { bots: number; messages: number; label: string }> = {
  free:    { bots: 1,  messages: 100,    label: "Gratis"    },
  Starter: { bots: 3,  messages: 5000,   label: "Starter"   },
  Pro:     { bots: 10, messages: 20000,  label: "Pro"       },
  Premium: { bots: -1, messages: -1,     label: "Premium"   }, // -1 = ilimitado
};

export const PLAN_PRICES: Record<string, { monthly: string; stripe_price_id: string }> = {
  Starter: { monthly: "$14", stripe_price_id: "price_1T8eHgRap0JkQNsmxXKjK3IH" },
  Pro:     { monthly: "$29", stripe_price_id: "price_1T8eNZRap0JkQNsmeObpDc8j" },
  Premium: { monthly: "$49", stripe_price_id: "price_1T8eRdRap0JkQNsmllSsPbVs" },
};
