import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return NextResponse.json(
        { error: "Token y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1) Buscar token válido
    const { data: tokenRow, error: tokenError } = await supabase
      .from("password_reset_tokens")
      .select("auth_user_id, expires_at")
      .eq("token", token)
      .single();

    if (tokenError || !tokenRow) {
      return NextResponse.json(
        { error: "Token inválido" },
        { status: 400 }
      );
    }

    // 2) Verificar expiración
    if (new Date(tokenRow.expires_at) < new Date()) {
      return NextResponse.json(
        { error: "El token ha expirado" },
        { status: 400 }
      );
    }

    // 3) Actualizar contraseña en Supabase Auth
    const { error: updateError } = await supabase.auth.admin.updateUserById(
      tokenRow.auth_user_id,
      { password }
    );

    if (updateError) {
      console.error("Error al actualizar contraseña:", updateError);
      return NextResponse.json(
        { error: "Error al actualizar contraseña" },
        { status: 500 }
      );
    }

    // 4) Borrar token usado
    await supabase
      .from("password_reset_tokens")
      .delete()
      .eq("token", token);

    return NextResponse.json({ message: "Contraseña actualizada correctamente" });
  } catch {
    console.error("Error inesperado en reset/confirm");
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
