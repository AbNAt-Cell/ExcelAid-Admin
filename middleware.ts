// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't need auth
const publicPaths = ["/", "/admin/login", "/_next", "/favicon.ico", "/images", "/api/public"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to public paths
  if (publicPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check auth token from cookies
  const token = req.cookies.get("token")?.value;

  if (!token) {
    // Redirect unauthenticated users to login page
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|api/public).*)"],
};
