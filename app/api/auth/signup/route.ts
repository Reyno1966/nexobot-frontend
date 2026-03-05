import { NextResponse } from "next/server";
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

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // usamos SERVICE ROLE aquí
    );

    // 1) Crear usuario en Supabase Auth
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // opcional: lo marcamos como confirmado
    });

    if (error || !data.user) {
      return NextResponse.json(
        { error: error?.message || "Error al crear usuario en Auth" },
        { status: 400 }
      );
    }

    // 2) Guardar usuario en tu tabla "users"
    const { error: insertError } = await supabase.from("users").insert({
      auth_user_id: data.user.id,
      email,
    });

    if (insertError) {
      return NextResponse.json(
        { error: "Usuario creado en Auth, pero error al guardar en users" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Usuario creado correctamente",
        user: {
          id: data.user.id,
          email: data.user.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error en signup:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
