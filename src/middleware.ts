import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isLoginPage = nextUrl.pathname === "/admin/login";
  const isApiRoute = nextUrl.pathname.startsWith("/api");
  const isPublicFile = nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/);

  // Allow API routes and public files
  if (isApiRoute || isPublicFile) {
    return NextResponse.next();
  }

  // Set pathname header for layout detection
  const response = NextResponse.next();
  response.headers.set('x-pathname', nextUrl.pathname);

  // Allow public routes (non-admin)
  if (!isAdminRoute) {
    return response;
  }

  // Redirect to dashboard if logged in and on login page
  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/admin/dashboard", nextUrl));
  }

  // Redirect to login if not logged in and on admin route
  if (!isLoggedIn && isAdminRoute && !isLoginPage) {
    return NextResponse.redirect(new URL("/admin/login", nextUrl));
  }

  return response;
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};