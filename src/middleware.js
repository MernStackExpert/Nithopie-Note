import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";

export async function middleware(req) {
  const res = NextResponse.next();
  const session = await getIronSession(req.cookies, sessionOptions);
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !session.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((pathname === "/login" || pathname === "/register") && session.user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};