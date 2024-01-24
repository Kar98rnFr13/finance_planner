import { NextResponse } from "next/server";
import { auth } from "./firebase";

// const request = new NextRequest();

const protectedRoutes = ["/guest/user/dashboard"];

export default function routeProtectionMiddleware(request) {
  if (!auth.currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteUrl = new URL("/", request.nextUrl.origin);

    return NextResponse.redirect(absoluteUrl.toString());
  }
}
