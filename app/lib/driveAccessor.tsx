import "server-only"

import { OAuth2Client } from "google-auth-library"
import { google as googleApi } from "googleapis"
import { buildDriveQuery } from "./queryBuilder"
import { ClientFilters } from "../schemas/filterSchema"
import { getGlobalFilters } from "./driveFilter"

export async function getDriveFiles(
  oauthClient: OAuth2Client,
  clientFilters: ClientFilters
) {
  const drive = googleApi.drive({ version: "v3", auth: oauthClient })
  const globalFilters = getGlobalFilters(clientFilters)

  const fileList = await drive.files.list({
    pageSize: 3,
    q: buildDriveQuery(globalFilters),
    fields: "files(id, name, mimeType, trashed, size)",
  })
  console.log("Retrieved files:", fileList.data.files)
}
