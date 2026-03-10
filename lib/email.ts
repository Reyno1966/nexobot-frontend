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

// ── Nuevo visitante / lead en el bot ──
export async function sendNewLeadEmail({
  to,
  botName,
}: {
  to: string;
  botName: string;
}) {
  if (!process.env.RESEND_API_KEY) return;
  const now = new Date().toLocaleString("es-ES", { dateStyle: "medium", timeStyle: "short" });
  try {
    await resend.emails.send({
      from: "NexoBot <no-reply@nexobot.app>",
      to:   [to],
      subject: `💬 Nuevo visitante en tu bot "${botName}"`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(to right,#2CC5C5,#F5A623);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">NexoBot</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Tu asistente inteligente</p>
          </div>
          <div style="background:#fafafa;padding:32px;">
            <h2 style="color:#111;margin:0 0 12px;font-size:20px;">💬 Nuevo visitante en tu bot</h2>
            <p style="color:#555;line-height:1.6;">
              Un visitante ha iniciado una nueva conversación con tu bot <strong>"${botName}"</strong>.
            </p>
            <p style="color:#888;font-size:13px;margin:4px 0 24px;">${now}</p>
            <a href="https://nexobot.app/dashboard"
              style="display:inline-block;background:linear-gradient(to right,#2CC5C5,#F5A623);color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
              Ver en el dashboard →
            </a>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;" />
            <p style="color:#aaa;font-size:12px;margin:0;">
              Recibes este email porque tienes notificaciones de nuevos leads activadas en
              <a href="https://nexobot.app" style="color:#2CC5C5;text-decoration:none;">nexobot.app</a>.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send error (new lead):", err);
  }
}

// ── Nueva cita agendada ──
export async function sendAppointmentEmail({
  to,
  botName,
  visitorName,
  date,
  time,
  email,
  phone,
  service,
}: {
  to: string;
  botName: string;
  visitorName: string;
  date: string;        // YYYY-MM-DD
  time: string;        // HH:MM
  email?: string | null;
  phone?: string | null;
  service?: string | null;
}) {
  if (!process.env.RESEND_API_KEY) return;

  const [y, m, d] = date.split("-");
  const months = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  const dateDisplay = `${parseInt(d)} de ${months[parseInt(m) - 1]} ${y}`;

  try {
    await resend.emails.send({
      from: "NexoBot <no-reply@nexobot.app>",
      to:   [to],
      subject: `📅 Nueva cita agendada en "${botName}" — ${dateDisplay} ${time}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(to right,#2CC5C5,#F5A623);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">NexoBot</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Tu asistente inteligente</p>
          </div>
          <div style="background:#fafafa;padding:32px;">
            <h2 style="color:#111;margin:0 0 16px;font-size:20px;">📅 Nueva cita agendada</h2>
            <p style="color:#555;line-height:1.6;margin:0 0 20px;">
              Un visitante acaba de agendar una cita a través de tu bot <strong>"${botName}"</strong>.
            </p>
            <div style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-bottom:24px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#888;font-size:13px;width:120px;">Nombre</td><td style="padding:8px 0;color:#111;font-weight:600;">${visitorName}</td></tr>
                <tr><td style="padding:8px 0;color:#888;font-size:13px;border-top:1px solid #f3f4f6;">Fecha</td><td style="padding:8px 0;color:#111;font-weight:600;border-top:1px solid #f3f4f6;">${dateDisplay}</td></tr>
                <tr><td style="padding:8px 0;color:#888;font-size:13px;border-top:1px solid #f3f4f6;">Hora</td><td style="padding:8px 0;color:#111;font-weight:600;border-top:1px solid #f3f4f6;">${time}</td></tr>
                ${email ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;border-top:1px solid #f3f4f6;">Email</td><td style="padding:8px 0;color:#111;border-top:1px solid #f3f4f6;">${email}</td></tr>` : ""}
                ${phone ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;border-top:1px solid #f3f4f6;">Teléfono</td><td style="padding:8px 0;color:#111;border-top:1px solid #f3f4f6;">${phone}</td></tr>` : ""}
                ${service ? `<tr><td style="padding:8px 0;color:#888;font-size:13px;border-top:1px solid #f3f4f6;">Servicio</td><td style="padding:8px 0;color:#111;border-top:1px solid #f3f4f6;">${service}</td></tr>` : ""}
              </table>
            </div>
            <a href="https://nexobot.app/dashboard/appointments"
              style="display:inline-block;background:linear-gradient(to right,#2CC5C5,#F5A623);color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
              Ver cita en el dashboard →
            </a>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;" />
            <p style="color:#aaa;font-size:12px;margin:0;">
              Este mensaje fue enviado automáticamente por
              <a href="https://nexobot.app" style="color:#2CC5C5;text-decoration:none;">nexobot.app</a>.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send error (appointment):", err);
  }
}

// ── Límite de mensajes alcanzado al 100% ──
export async function sendLimitReachedEmail({
  to,
  botName,
  planName,
  messagesLimit,
}: {
  to: string;
  botName: string;
  planName: string;
  messagesLimit: number;
}) {
  if (!process.env.RESEND_API_KEY) return;
  try {
    await resend.emails.send({
      from: "NexoBot <no-reply@nexobot.app>",
      to:   [to],
      subject: `🚨 Tu bot "${botName}" alcanzó el límite de mensajes`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
          <div style="background:linear-gradient(to right,#ef4444,#f97316);padding:28px 32px;">
            <h1 style="color:#fff;margin:0;font-size:26px;font-weight:900;letter-spacing:-0.5px;">NexoBot</h1>
            <p style="color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Tu asistente inteligente</p>
          </div>
          <div style="background:#fafafa;padding:32px;">
            <h2 style="color:#111;margin:0 0 12px;font-size:20px;">🚨 Límite de mensajes alcanzado</h2>
            <p style="color:#555;line-height:1.6;">
              Tu bot <strong>"${botName}"</strong> ha consumido los <strong>${messagesLimit.toLocaleString()} mensajes</strong>
              incluidos en tu plan <strong>${planName}</strong> este mes.
            </p>
            <p style="color:#555;line-height:1.6;margin-top:8px;">
              El bot ha pausado sus respuestas hasta el próximo ciclo. Mejora tu plan para restablecer el servicio de inmediato.
            </p>
            <div style="background:#fee2e2;border-radius:999px;height:14px;margin:20px 0 6px;overflow:hidden;">
              <div style="background:linear-gradient(to right,#ef4444,#f97316);width:100%;height:100%;border-radius:999px;"></div>
            </div>
            <p style="color:#dc2626;font-size:13px;font-weight:700;margin:0 0 24px;">100% — Límite alcanzado</p>
            <a href="https://nexobot.app/dashboard/billing"
              style="display:inline-block;background:linear-gradient(to right,#2CC5C5,#F5A623);color:#fff;padding:14px 28px;border-radius:999px;text-decoration:none;font-weight:700;font-size:15px;">
              Mejorar mi plan ahora →
            </a>
            <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0 16px;" />
            <p style="color:#aaa;font-size:12px;margin:0;">
              Este mensaje fue enviado automáticamente por
              <a href="https://nexobot.app" style="color:#2CC5C5;text-decoration:none;">nexobot.app</a>.
            </p>
          </div>
        </div>
      `,
    });
  } catch (err) {
    console.error("Email send error (limit reached):", err);
  }
}
