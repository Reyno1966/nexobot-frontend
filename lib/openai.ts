import OpenAI from "openai";
import type { ChatCompletion } from "openai/resources/chat/completions";

export const openai = new OpenAI({
  apiKey: (process.env.OPENAI_API_KEY || "").trim(),
});

// ── Modelo más barato y capaz ──
export const AI_MODEL = "gpt-4o-mini";

// ── Límites para no gastar más de lo que se gana ──
export const MAX_OUTPUT_TOKENS = 350;
export const MAX_HISTORY_MESSAGES = 6;
export const MAX_SYSTEM_PROMPT_CHARS = 800;
export const MAX_MESSAGES_PER_SESSION = 30; // máx mensajes por visitante por sesión en widget

// ── Costo estimado por mensaje (USD) ──
// gpt-4o-mini: $0.15/1M input, $0.60/1M output
// ~800 input tokens + 350 output = ~$0.0003 por mensaje
// Starter (5000 msgs): ~$1.50 costo vs $14 ingreso = 89% margen ✅
// Pro (20000 msgs): ~$6 costo vs $29 ingreso = 79% margen ✅
// Premium (unlimited): ~$30 costo máx vs $49 ingreso = 39% margen ✅

// ── Reintentos automáticos si OpenAI falla ──
export async function callOpenAI(
  params: Omit<Parameters<typeof openai.chat.completions.create>[0], "stream">,
  maxRetries = 3
): Promise<ChatCompletion> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await openai.chat.completions.create({ ...params, stream: false }) as ChatCompletion;
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries) {
        // Espera 1.5s, 3s antes de reintentar
        await new Promise((resolve) => setTimeout(resolve, attempt * 1500));
      }
    }
  }
  throw lastError;
}

// ── Verificar si hay que resetear contador mensual ──
export function needsMonthlyReset(lastResetAt: string | null | undefined): boolean {
  if (!lastResetAt) return true;
  const last = new Date(lastResetAt);
  const now = new Date();
  return last.getMonth() !== now.getMonth() || last.getFullYear() !== now.getFullYear();
}
