import "server-only"
import { getEnv, requireEnv } from "./shared"
export const serverConfig = {
  GOOGLE_CLIENT_SECRET: requireEnv("GOOGLE_CLIENT_SECRET"),
  NODE_ENV: getEnv("NODE_ENV", "development"),
}

export default serverConfig
