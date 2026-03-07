import OpenAI from "openai";

export const openai = new OpenAI({
  apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

// ── Modelo más barato y capaz ──
export const AI_MODEL = "gpt-4o-mini";

// ── Límites para no gastar más de lo que se gana ──
export const MAX_OUTPUT_TOKENS = 350;      // Máx tokens por respuesta
export const MAX_HISTORY_MESSAGES = 6;    // Solo últimas 3 conversaciones (6 mensajes)
export const MAX_SYSTEM_PROMPT_CHARS = 800; // Límite de caracteres del system prompt

// ── Costo estimado por mensaje (USD) ──
// gpt-4o-mini: $0.15/1M input, $0.60/1M output
// ~800 input tokens + 350 output = ~$0.0003 por mensaje
// Starter (5000 msgs): ~$1.50 costo vs $29 ingreso = 95% margen ✅
// Pro (20000 msgs): ~$6 costo vs $59 ingreso = 90% margen ✅
// Premium (unlimited): ~$30 costo máx vs $99 ingreso = 70% margen ✅
