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
    fields:
      "files(id,name,mimeType,trashed,size,capabilities,contentRestrictions)",
    orderBy: "quotaBytesUsed desc",
  })
  let files = fileList.data.files || []

  // user shouldn't be shown files they can't trash since its main action to review
  files = files.filter((file) =>
    file.capabilities ? !!file.capabilities.canTrash : false
  )

  // user likely shouldn't trash files with content restrictions, so filter them
  files = files.filter((file) => !("contentRestrictions" in file))

  return files
}
