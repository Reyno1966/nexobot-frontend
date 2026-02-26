import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 }
      );
    }

    // Cliente Supabase
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Login
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Credenciales incorrectas" },
        { status: 401 }
      );
    }

    // Guardar tokens en cookies
    const cookieStore = cookies();

    cookieStore.set("sb-access-token", data.session.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    cookieStore.set("sb-refresh-token", data.session.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
    });

    return NextResponse.json(
      {
        message: "Inicio de sesión exitoso",
        user: data.user,
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("Error en login:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
