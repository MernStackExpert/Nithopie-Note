import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/lib/session";
import { cookies } from "next/headers";

export async function middleware(req) {
  const res = NextResponse.next();
  
  const cookieStore = await cookies();
  const session = await getIronSession(cookieStore, sessionOptions);
  
  const { pathname } = req.nextUrl;

  if ((pathname === "/login" || pathname === "/register") && session?.user) {
    return NextResponse.redirect(new URL("/work-space", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/login", "/register"], 
};