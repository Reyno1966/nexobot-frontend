// ── WhatsApp via Meta Cloud API ──
export async function sendWhatsAppNotification({
  to,
  message,
}: {
  to: string;
  message: string;
}) {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken   = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneNumberId || !accessToken) return;

  const normalized = to.replace(/\D/g, "");
  if (!normalized) return;

  try {
    await fetch(`https://graph.facebook.com/v19.0/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: normalized,
        type: "text",
        text: { body: message },
      }),
    });
  } catch {
    // silencioso — no interrumpir el flujo principal
  }
}

// ── Telegram via Bot API ──
export async function sendTelegramNotification({
  botToken,
  chatId,
  message,
}: {
  botToken: string;
  chatId: string;
  message: string;
}) {
  if (!botToken || !chatId) return;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch {
    // silencioso
  }
}

// ── Construir mensaje de cita ──
export function buildAppointmentMessage({
  botName,
  visitorName,
  date,
  time,
  email,
  phone,
}: {
  botName: string;
  visitorName: string;
  date: string;
  time: string;
  email?: string | null;
  phone?: string | null;
}): string {
  const [y, m, d] = date.split("-");
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const dateDisplay = `${parseInt(d)} de ${months[parseInt(m) - 1]} ${y}`;

  const lines = [
    `📅 Nueva cita agendada — ${botName}`,
    ``,
    `👤 Nombre: ${visitorName}`,
    `📆 Fecha: ${dateDisplay}`,
    `🕐 Hora: ${time}`,
  ];
  if (email) lines.push(`📧 Email: ${email}`);
  if (phone) lines.push(`📱 Teléfono: ${phone}`);
  lines.push(``, `Ver en: https://nexobot.app/dashboard/appointments`);

  return lines.join("\n");
}
