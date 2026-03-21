import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { getAuth } from "@/lib/auth";

/**
 * POST /api/products/upload-image
 * Sube una imagen de producto a Supabase Storage (bucket: product-images).
 * Devuelve la URL pública de la imagen.
 *
 * Body: multipart/form-data con campo "file" (imagen)
 * Response: { url: string }
 */
export async function POST(req: Request) {
  const auth = await getAuth();
  if (!auth) return NextResponse.json({ error: "No autorizado" }, { status: 401 });

  const { userId } = auth;

  // Admin client para bypasear RLS en Storage
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Formato de solicitud inválido" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
  }

  // Validar tipo y tamaño (máx 5 MB)
  const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
  if (!validTypes.includes(file.type)) {
    return NextResponse.json({ error: "Tipo de archivo no permitido. Usa JPG, PNG, GIF o WebP." }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "La imagen no puede superar 5 MB." }, { status: 400 });
  }

  // Ruta: {userId}/{timestamp}.{ext}
  const ext  = file.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const path = `${userId}/${Date.now()}.${ext}`;

  const bytes  = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(path, buffer, {
      contentType: file.type,
      upsert:      true,
    });

  if (uploadError) {
    console.error("[upload-image]", uploadError);
    return NextResponse.json({ error: "Error al subir la imagen. Intenta de nuevo." }, { status: 500 });
  }

  const { data: { publicUrl } } = supabase.storage
    .from("product-images")
    .getPublicUrl(path);

  return NextResponse.json({ url: publicUrl });
}
