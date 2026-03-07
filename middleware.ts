import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const refreshToken = req.cookies.get("sb-refresh-token")?.value;

  const isLoggedIn = !!(accessToken && refreshToken);

  const { pathname } = req.nextUrl;

  // Redireccionamientos legacy para rutas antiguas
  if (pathname === "/login") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (pathname === "/signup") {
    return NextResponse.redirect(new URL("/auth/signup", req.url));
  }
  if (pathname === "/reset-password") {
    return NextResponse.redirect(new URL("/auth/reset", req.url));
  }

  // Rutas 100% públicas (landing pages, auth, api, checkout)
  const publicPrefixes = [
    "/",
    "/en",
    "/pt",
    "/fr",
    "/it",
    "/de",
    "/nl",
    "/ar",
    "/zh",
    "/ja",
    "/ru",
    "/ko",
    "/tr",
    "/id",
    "/auth",
    "/api",
    "/checkout",
    "/privacy",
    "/terms",
    "/widget",
  ];

  const isPublic = publicPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + "/")
  );

  // Si no está autenticado y la ruta no es pública → login
  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  // Si está autenticado y trata de entrar a /auth/* → dashboard
  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.svg|.*\\.jpg|.*\\.ico).*)",
  ],
};
