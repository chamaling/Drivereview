import "server-only"

/*
 * DEV NOTE:
 * This is a basic in-memory session manager. I am using this for simplicity as it is
 * a personal project and not designed for scale. It would instead be best practice to use
 * a more robust solution like Redis in production.
 */
import { type Credentials } from "google-auth-library"
export type SessionID = string & { __brand: "SessionID" }

type Session = {
  tokens: Credentials
  expiresAt: number
}

type SessionStore = Map<SessionID, Session>

const sessions: SessionStore = new Map()

export function createSessionID(): SessionID {
  return crypto.randomUUID() as SessionID
}

export function addSession(newSessionId: SessionID, tokens: Credentials): void {
  const expiresAt = Date.now() + 60 * 60 * 1000 // 1 hour

  sessions.set(newSessionId, {
    tokens,
    expiresAt,
  })
}

function removeSession(sessionId: SessionID): void {
  sessions.delete(sessionId)
}

export function getSession(sessionId: SessionID): Session | undefined {
  const session = sessions.get(sessionId)
  if (!session) {
    return undefined
  }
  if (Date.now() >= session.expiresAt) {
    removeSession(sessionId)
    return undefined
  }
  return session
}
