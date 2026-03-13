import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Devuelve el inventario del usuario como texto formateado
 * para inyectar al system prompt del bot.
 *
 * - Solo incluye productos con stock > 0 y status != inactive
 * - Si no hay productos, devuelve "" (bot funciona sin contexto de inventario)
 */
export async function getInventoryContext(
  userId: string,
  supabase: SupabaseClient
): Promise<string> {
  try {
    const { data: products } = await supabase
      .from("products")
      .select("name, price, currency, stock, unit")
      .eq("user_id", userId)
      .neq("status", "inactive")
      .gt("stock", 0)
      .order("name")
      .limit(30);

    if (!products || products.length === 0) return "";

    const lines = products.map((p) => {
      const unit = p.unit || "unidades";
      const precio = `$${Number(p.price).toFixed(2)}`;
      return `- ${p.name} (stock: ${p.stock} ${unit}, precio: ${precio})`;
    });

    return (
      `\n\nInventario disponible hoy:\n` +
      lines.join("\n") +
      `\nSi preguntan por algo que no está en la lista, di que no está disponible.`
    );
  } catch {
    return "";
  }
}
