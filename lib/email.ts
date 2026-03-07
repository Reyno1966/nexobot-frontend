import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// ── Alerta al 80% de mensajes del plan ──
export async function sendLimitAlertEmail({
  to,
  botName,
  planName,
  messagesUsed,
  messagesLimit,
}: {
  to: string;
  botName: string;
  planName: string;
  messagesUsed: number;
  messagesLimit: number;
}) {
  if (!process.env.RESEND_API_KEY) return; // Omitir si no está configurado

  const percentage = Math.round((messagesUsed / messagesLimit) * 100);
  const remaining  = messagesLimit - messagesUsed;

  try {
    await resend.emails.send({
      from: "NexoBot <no-reply@nexobot.app>",
      to:   [to],
      subject: `⚠️ Tu bot "${botName}" ha usado el ${percentage}% de sus mensajes`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <!-- Header -->
          <div style="background:linear-gradient(to right,#2CC5C5,#F5A623);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">NexoBot</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Tu asistente inteligente</p>
          </div>
          <!-- Body -->
          <div style="background:#fafafa;padding:32px;">
            <h2 style="color:#111;margin:0 0 12px;font-size:20px;">⚠️ Límite de mensajes al ${percentage}%</h2>
            <p style="color:#555;line-height:1.6;">
              Tu bot <strong>"${botName}"</strong> ha consumido el <strong>${percentage}%</strong>
              de su cuota mensual en el plan <strong>${planName}</strong>.
            </p>

            <!-- Barra de progreso -->
            <div style="background:#e5e7eb;border-radius:999px;height:14px;margin:20px 0 8px;overflow:hidden;">
              <div style="background:linear-gradient(to right,#2CC5C5,#F5A623);width:${percentage}%;height:100%;border-radius:999px;"></div>
            </div>
            <p style="color:#888;font-size:13px;margin:0 0 24px;">
              Mensajes restantes: <strong style="color:#111;">${remaining.toLocaleString()}</strong> de ${messagesLimit.toLocaleString()}
            </p>

            <a href="https://nexobot.app/dashboard/billing"
              style="display:inline-block;background:linear-gradient(to right,#2CC5C5,#F5A623);color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
              Mejorar mi plan →
            </a>

            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;" />
            <p style="color:#aaa;font-size:12px;margin:0;">
              Este mensaje fue enviado automáticamente por
              <a href="https://nexobot.app" style="color:#2CC5C5;text-decoration:none;">nexobot.app</a>.
              Si no deseas recibir estas alertas, actualiza tu plan Premium para tener mensajes ilimitados.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    // No interrumpir el flujo principal si falla el email
    console.error("Email send error:", err);
  }
}
