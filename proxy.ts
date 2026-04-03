import { NextRequest, NextResponse } from "next/server"
import { type SessionID } from "@/lib/sessionManager"
import path from "node:path"

const publicRoutes = ["/"]

export default function proxy(request: NextRequest) {
  const sessionId = request.cookies.get("session")?.value as SessionID
  const { pathname } = request.nextUrl

  if (!publicRoutes.includes(pathname)) {
    if (!sessionId) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  if (sessionId && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
