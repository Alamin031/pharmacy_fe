import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Auth routes are always accessible
  if (pathname.startsWith("/(auth)") || pathname === "/login") {
    return NextResponse.next();
  }

  // Allow root and home
  if (pathname === "/" || pathname === "/home") {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
