import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomUUID } from "crypto";
import { resend, EMAIL_FROM } from "@/lib/resend";
import {
  resetPasswordEmailHtml,
  resetPasswordEmailText,
} from "@/lib/emails/resetPasswordEmail";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "El email es obligatorio" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1) Buscar usuario por email — respuesta genérica para no filtrar existencia
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("auth_user_id")
      .eq("email", email)
      .single();

    // Respuesta genérica (seguridad: no revelar si el email existe)
    const genericResponse = NextResponse.json({
      message: "Si el correo existe, recibirás un enlace de recuperación en los próximos minutos.",
    });

    if (userError || !user) {
      return genericResponse;
    }

    // 2) Eliminar tokens anteriores para este usuario (evitar tokens obsoletos)
    await supabase
      .from("password_reset_tokens")
      .delete()
      .eq("auth_user_id", user.auth_user_id);

    // 3) Crear nuevo token con expiración de 30 minutos
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 30);

    const { error: insertError } = await supabase
      .from("password_reset_tokens")
      .insert({
        auth_user_id: user.auth_user_id,
        token,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error("Error al crear token de reset:", insertError);
      return NextResponse.json(
        { error: "Error interno al procesar la solicitud" },
        { status: 500 }
      );
    }

    // 4) Construir URL de reset
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset/${token}`;

    // 5) Enviar email con Resend
    const { error: emailError } = await resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Recupera tu contraseña — NexoBot",
      html: resetPasswordEmailHtml({ resetUrl, email }),
      text: resetPasswordEmailText({ resetUrl, email }),
    });

    if (emailError) {
      console.error("Error al enviar email de reset:", emailError);
      // Limpiamos el token si el email falló para evitar tokens huérfanos
      await supabase
        .from("password_reset_tokens")
        .delete()
        .eq("token", token);

      return NextResponse.json(
        { error: "No se pudo enviar el email. Por favor intenta de nuevo." },
        { status: 500 }
      );
    }

    return genericResponse;
  } catch {
    console.error("Error inesperado en reset:");
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
