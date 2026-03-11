import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendAppointmentEmail } from "@/lib/email";
import { sendWhatsAppNotification, sendTelegramNotification, buildAppointmentMessage } from "@/lib/notifications";

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(
  req: Request,
  { params }: { params: Promise<{ botId: string }> }
) {
  try {
    const { botId } = await params;
    const body = await req.json();
    const { visitor_name, visitor_email, visitor_phone, service, appointment_date, appointment_time, notes } = body;

    if (!visitor_name || !appointment_date || !appointment_time) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400, headers: CORS });
    }

    const supabase = getAdminClient();

    // Verificar que el bot existe y está activo, obteniendo también config de notificaciones
    const { data: bot } = await supabase
      .from("bots")
      .select("id, status, user_id, name, notify_email, notify_whatsapp, notify_telegram_token, notify_telegram_chat_id")
      .eq("id", botId)
      .single();

    if (!bot || bot.status !== "active") {
      return NextResponse.json({ error: "Bot no disponible" }, { status: 404, headers: CORS });
    }

    const { data: appointment, error } = await supabase
      .from("appointments")
      .insert({
        bot_id: botId,
        visitor_name,
        visitor_email: visitor_email || null,
        visitor_phone: visitor_phone || null,
        service: service || null,
        appointment_date,
        appointment_time,
        notes: notes || null,
        status: "pending",
      })
      .select()
      .single();

    if (error) {
      console.error("Appointment insert error:", error);
      return NextResponse.json({ error: `Error al guardar cita: ${error.message}` }, { status: 500, headers: CORS });
    }

    // ── Disparar notificaciones (fire & forget) ──
    const msgText = buildAppointmentMessage({
      botName: bot.name,
      visitorName: visitor_name,
      date: appointment_date,
      time: appointment_time,
      email: visitor_email,
      phone: visitor_phone,
    });

    // Email: al email configurado en el bot, o al email del dueño como fallback
    const notifyEmail = bot.notify_email;
    if (notifyEmail) {
      sendAppointmentEmail({
        to: notifyEmail,
        botName: bot.name,
        visitorName: visitor_name,
        date: appointment_date,
        time: appointment_time,
        email: visitor_email,
        phone: visitor_phone,
        service: service,
      }).catch(() => {});
    } else {
      // Fallback: email del dueño de la cuenta
      supabase.auth.admin.getUserById(bot.user_id).then(({ data }) => {
        const ownerEmail = data?.user?.email;
        if (ownerEmail) {
          sendAppointmentEmail({
            to: ownerEmail,
            botName: bot.name,
            visitorName: visitor_name,
            date: appointment_date,
            time: appointment_time,
            email: visitor_email,
            phone: visitor_phone,
            service: service,
          }).catch(() => {});
        }
      }).catch(() => {});
    }

    // WhatsApp
    if (bot.notify_whatsapp) {
      sendWhatsAppNotification({ to: bot.notify_whatsapp, message: msgText }).catch(() => {});
    }

    // Telegram
    if (bot.notify_telegram_token && bot.notify_telegram_chat_id) {
      sendTelegramNotification({
        botToken: bot.notify_telegram_token,
        chatId: bot.notify_telegram_chat_id,
        message: msgText,
      }).catch(() => {});
    }

    return NextResponse.json({ success: true, appointment }, { headers: CORS });
  } catch (err) {
    console.error("Appointment widget error:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500, headers: CORS });
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS });
}
