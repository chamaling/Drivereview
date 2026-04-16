import "server-only"

import { OAuth2Client } from "google-auth-library"
import { google as googleApi } from "googleapis"

import { getGlobalFilters } from "./driveFilter"
import { ClientFilters } from "../schemas/filterSchema"

export async function buildDriveQuery(clientFilters: ClientFilters) {
  const globalFilters = getGlobalFilters(clientFilters)
}
export async function getDriveFiles(oauthClient: OAuth2Client) {
  const drive = googleApi.drive({ version: "v3", auth: oauthClient })

  const fileList = await drive.files.list({
    pageSize: 3,
    fields: "files(id, name, mimeType, modifiedTime)",
  })
  console.log("Retrieved files:", fileList.data.files)
}
