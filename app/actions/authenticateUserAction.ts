"use server"
import { actionClient } from "@/lib/actionClient"
import { z } from "zod"
import { cookies } from "next/headers"
import serverConfig from "@/lib/config/server"
import { addSession, createSessionID } from "@/lib/sessionManager"
import makeGoogleAuth from "@/lib/makeGoogleAuth"
export const authenticateUserAction = actionClient
  .inputSchema(
    z.object({
      code: z.string(),
    })
  )
  .action(async ({ parsedInput }) => {
    const { code } = parsedInput
    try {
      const oauth2Client = makeGoogleAuth()
      const { tokens } = await oauth2Client.getToken(code)
      const cookieStore = await cookies()
      const sessionId = createSessionID()

      cookieStore.set("session", sessionId, {
        httpOnly: true,
        secure: serverConfig.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60, // 1 hour
      })

      oauth2Client.setCredentials(tokens)
      addSession(sessionId, tokens)
    } catch {
      throw new Error("Authentication failed. Please try again.")
    }
  })
