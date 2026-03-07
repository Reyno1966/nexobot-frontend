import { NextResponse } from "next/server";
import { getAuth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";

const BUCKET       = "logos";
const MAX_SIZE_MB  = 2;
const ALLOWED_TYPES = [
  "image/jpeg", "image/jpg", "image/png",
  "image/webp", "image/gif", "image/svg+xml",
];

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { userId } = auth;

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Solo se permiten imágenes JPG, PNG, WebP, GIF o SVG" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return NextResponse.json(
        { error: `La imagen no puede superar ${MAX_SIZE_MB}MB` },
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Crear bucket público si no existe
    await supabase.storage
      .createBucket(BUCKET, { public: true })
      .catch(() => {/* ya existe, ignorar */});

    // Nombre único por usuario
    const ext      = file.name.split(".").pop()?.toLowerCase() ?? "png";
    const filename = `${userId}/logo-${Date.now()}.${ext}`;

    const bytes  = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
    }

    const { data: { publicUrl } } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicUrl });

  } catch (err) {
    console.error("Logo upload error:", err);
    return NextResponse.json({ error: "Error interno al procesar la imagen" }, { status: 500 });
  }
}
