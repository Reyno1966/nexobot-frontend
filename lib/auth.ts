/**
 * Helper de autenticación con auto-refresh de token
 * Resuelve el problema de tokens expirados (Supabase expira el access token cada 1 hora)
 */
import { cookies } from "next/headers";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface AuthResult {
  supabase: SupabaseClient;
  userId: string;
}

export async function getAuth(): Promise<AuthResult | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("sb-access-token")?.value;
  const refreshToken = cookieStore.get("sb-refresh-token")?.value;

  if (!accessToken && !refreshToken) return null;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${accessToken}` } } }
  );

  // Intento 1: usar el access token actual
  if (accessToken) {
    const { data, error } = await supabase.auth.getUser();
    if (!error && data?.user) {
      return { supabase, userId: data.user.id };
    }
  }

  // Intento 2: renovar token con refresh token
  if (refreshToken) {
    const refreshSupabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: refreshData, error: refreshError } =
      await refreshSupabase.auth.refreshSession({ refresh_token: refreshToken });

    if (!refreshError && refreshData?.session) {
      // Guardar los nuevos tokens en las cookies
      cookieStore.set("sb-access-token", refreshData.session.access_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });
      cookieStore.set("sb-refresh-token", refreshData.session.refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });

      // Crear nuevo cliente con el token fresco
      const freshSupabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          global: {
            headers: {
              Authorization: `Bearer ${refreshData.session.access_token}`,
            },
          },
        }
      );

      return { supabase: freshSupabase, userId: refreshData.session.user.id };
    }
  }

  return null;
}
