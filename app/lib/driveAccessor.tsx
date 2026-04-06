import "server-only"

import { clientFiltersSchema, ClientFilters } from "../schemas/filterSchema"
import { OAuth2Client } from "google-auth-library"
import { google as googleApi } from "googleapis"
function validateClientFilters(filters: unknown): ClientFilters {
  const result = clientFiltersSchema.safeParse(filters)
  if (!result.success) {
    throw new Error("Invalid filters: " + result.error.message)
  }

  return result.data
}

export async function getDriveFiles(
  filters: ClientFilters,
  oauthClient: OAuth2Client
) {
  const validatedClientFilters = validateClientFilters(filters)
  const drive = googleApi.drive({ version: "v3", auth: oauthClient })

  const fileList = await drive.files.list({
    pageSize: 3,
    fields: "files(id, name, mimeType, modifiedTime)",
  })
  console.log("Retrieved files:", fileList.data.files)
}
