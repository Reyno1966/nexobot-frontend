/**
 * Template HTML profesional para el email de recuperación de contraseña.
 * Diseño limpio, responsivo y con marca NexoBot.
 */
export function resetPasswordEmailHtml({
  resetUrl,
  email,
}: {
  resetUrl: string;
  email: string;
}): string {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Recupera tu contraseña — NexoBot</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f4f4f5;padding:40px 16px;">
    <tr>
      <td align="center">

        <!-- Contenedor principal -->
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation"
          style="max-width:560px;background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header azul con logo -->
          <tr>
            <td style="background-color:#2563eb;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:800;letter-spacing:-0.5px;">
                NexoBot
              </h1>
              <p style="margin:6px 0 0;color:#bfdbfe;font-size:13px;">
                Tu asistente inteligente de ventas
              </p>
            </td>
          </tr>

          <!-- Cuerpo del email -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <h2 style="margin:0 0 8px;color:#111827;font-size:22px;font-weight:700;">
                Recupera tu contraseña
              </h2>

              <p style="margin:0 0 24px;color:#6b7280;font-size:15px;line-height:1.6;">
                Hola, recibimos una solicitud para restablecer la contraseña de la cuenta asociada a
                <strong style="color:#374151;">${email}</strong>.
              </p>

              <p style="margin:0 0 28px;color:#6b7280;font-size:15px;line-height:1.6;">
                Haz clic en el botón de abajo para crear una nueva contraseña.
                Este enlace es válido por <strong style="color:#374151;">30 minutos</strong>.
              </p>

              <!-- Botón CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td align="center" style="padding:8px 0 32px;">
                    <a href="${resetUrl}"
                      style="display:inline-block;padding:14px 36px;background-color:#2563eb;color:#ffffff;text-decoration:none;border-radius:10px;font-size:16px;font-weight:600;letter-spacing:0.2px;">
                      Restablecer contraseña
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <hr style="border:none;border-top:1px solid #e5e7eb;margin:0 0 24px;" />

              <!-- Enlace alternativo -->
              <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:
              </p>
              <p style="margin:0 0 24px;word-break:break-all;">
                <a href="${resetUrl}" style="color:#2563eb;font-size:13px;">${resetUrl}</a>
              </p>

              <!-- Aviso de seguridad -->
              <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;border-radius:6px;padding:14px 16px;">
                <p style="margin:0;color:#92400e;font-size:13px;line-height:1.5;">
                  ⚠️ <strong>¿No pediste este cambio?</strong> Ignora este email y tu contraseña seguirá siendo la misma. Tu cuenta está segura.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 6px;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} NexoBot — Todos los derechos reservados.
              </p>
              <p style="margin:0;color:#9ca3af;font-size:12px;">
                Este email fue enviado automáticamente. Por favor no respondas a este correo.
              </p>
            </td>
          </tr>

        </table>
        <!-- Fin contenedor principal -->

      </td>
    </tr>
  </table>

</body>
</html>
`.trim();
}

/**
 * Versión texto plano del email (fallback para clientes que no soportan HTML).
 */
export function resetPasswordEmailText({
  resetUrl,
  email,
}: {
  resetUrl: string;
  email: string;
}): string {
  return `
NexoBot — Recuperar contraseña

Hola,

Recibimos una solicitud para restablecer la contraseña de la cuenta: ${email}

Usa el siguiente enlace para crear una nueva contraseña (válido por 30 minutos):

${resetUrl}

Si no solicitaste este cambio, ignora este mensaje. Tu cuenta está segura.

---
© ${new Date().getFullYear()} NexoBot — Este email fue enviado automáticamente.
`.trim();
}
