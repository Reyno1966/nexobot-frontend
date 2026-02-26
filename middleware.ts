import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("sb-access-token")?.value;
  const refreshToken = req.cookies.get("sb-refresh-token")?.value;

  const isLoggedIn = accessToken && refreshToken;

  const publicPaths = [
    "/",
    "/auth/login",
    "/auth/signup",
    "/auth/reset-password",
    "/auth/update-password"
  ];

  const { pathname } = req.nextUrl;

  const isPublic = publicPaths.some((path) => pathname.startsWith(path));

  if (!isLoggedIn && !isPublic) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  if (isLoggedIn && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
