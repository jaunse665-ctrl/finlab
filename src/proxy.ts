import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return null; // Let the request proceed to the login page
  }

  if (!isLoggedIn) {
    let callbackUrl = req.nextUrl.pathname;
    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl)
    );
  }

  return null;
});

export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/lab/:path*", 
    "/courses/:path*", 
    "/achievements/:path*",
    "/datasets/:path*",
    "/forums/:path*",
    "/login"
  ],
};
