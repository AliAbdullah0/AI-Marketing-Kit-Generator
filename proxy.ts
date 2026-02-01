import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get("better-auth.session_token")
  const pathname = request.nextUrl.pathname
  console.log("token:",cookie)

  if (cookie && ( pathname.startsWith("/signup") || pathname.startsWith("/login"))) {
    return NextResponse.redirect(new URL("/start", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/signup","/login"],
}
