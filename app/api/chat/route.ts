import { NextResponse } from "next/server";
import { getAuth }       from "@/lib/auth";
import { processBotMessage, BotMessage } from "@/lib/processBotMessage";

export async function POST(req: Request) {
  try {
    // ── 1. Autenticación con auto-refresh ──────────────────────────────────
    const auth = await getAuth();
    if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    const { supabase, userId } = auth;

    // ── 2. Leer body ──────────────────────────────────────────────────────
    const body = await req.json();
    const { botId, message, history = [] } = body as {
      botId:   string;
      message: string;
      history: BotMessage[];
    };

    if (!botId || !message?.trim()) {
      return NextResponse.json({ error: "Faltan parámetros" }, { status: 400 });
    }

    // ── 3. Procesar mensaje con el motor del bot ───────────────────────────
    const result = await processBotMessage({
      userId,
      botId,
      message,
      history,
      supabase,
      source: "dashboard",
    });

    if (result.error === "Bot no encontrado") {
      return NextResponse.json({ error: "Bot no encontrado" }, { status: 404 });
    }
    if (result.error === "El bot está inactivo") {
      return NextResponse.json({ error: "El bot está inactivo" }, { status: 403 });
    }
    if (result.error) {
      return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 });
    }
    if (result.limitReached) {
      return NextResponse.json(
        { error: result.reply, limitReached: true },
        { status: 429 }
      );
    }

    // ── 4. Guardar conversación en historial (dashboard test session) ─────
    try {
      const sessionId = `dashboard-${userId}-${botId}`;
      let conversationId: string | null = null;

      const { data: existingConv } = await supabase
        .from("conversations")
        .select("id, message_count")
        .eq("bot_id", botId)
        .eq("session_id", sessionId)
        .single();

      if (existingConv) {
        conversationId = existingConv.id;
        await supabase
          .from("conversations")
          .update({
            last_message_at: new Date().toISOString(),
            message_count: (existingConv.message_count ?? 0) + 2,
          })
          .eq("id", conversationId);
      } else {
        const { data: newConv } = await supabase
          .from("conversations")
          .insert({
            bot_id:        botId,
            session_id:    sessionId,
            visitor_name:  "Prueba (Dashboard)",
            message_count: 2,
          })
          .select("id")
          .single();
        conversationId = newConv?.id ?? null;
      }

      if (conversationId) {
        await supabase.from("messages").insert([
          { conversation_id: conversationId, bot_id: botId, role: "user",      content: message.trim().substring(0, 800), tokens_used: 0 },
          { conversation_id: conversationId, bot_id: botId, role: "assistant", content: result.reply, tokens_used: result.tokensUsed },
        ]);
      }
    } catch {
      // No interrumpir si falla el guardado del historial
    }

    return NextResponse.json({
      reply:        result.reply,
      tokensUsed:   result.tokensUsed,
      messagesLeft: result.messagesLeft,
    });

  } catch (err) {
    const msg = err instanceof Error ? err.message : "Error desconocido";
    console.error("Error en chat API:", msg);
    return NextResponse.json({ error: "Error al procesar el mensaje" }, { status: 500 });
  }
}
