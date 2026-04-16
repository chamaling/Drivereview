import "server-only"
import { actionClient } from "./actionClient"
import { getSession, type SessionID } from "./sessionManager"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import makeGoogleAuth from "./makeGoogleAuth"

export const authClient = actionClient.use(async ({ next }) => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get("session")?.value as SessionID

  if (!sessionId) {
    redirect("/")
  }

  const session = getSession(sessionId)
  if (!session) {
    redirect("/api/logout")
  }

  const oauthClient = makeGoogleAuth(session.tokens)

  return next({
    ctx: {
      oauthClient,
    },
  })
})
