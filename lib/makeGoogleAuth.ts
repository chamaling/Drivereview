import { OAuth2Client, type Credentials } from "google-auth-library"
import serverConfig from "@/lib/config/server"

export default function makeGoogleAuth(tokens?: Credentials) {
  const oauth2Client = new OAuth2Client(
    serverConfig.GOOGLE_CLIENT_ID,
    serverConfig.GOOGLE_CLIENT_SECRET
  )
  if (tokens) {
    oauth2Client.setCredentials(tokens)
  }
  return oauth2Client
}
