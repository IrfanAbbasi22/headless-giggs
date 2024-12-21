import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("user_token");

  if (req.nextUrl.pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/my-account", req.url));
  }

  if (!token && req.nextUrl.pathname.startsWith("/my-account")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Allow the request to continue for other routes
  return NextResponse.next();
}

// Secure all routes under `/my-account`
export const config = {
  matcher: ["/my-account/:path*", "/login"],
};
