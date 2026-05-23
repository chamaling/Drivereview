import "server-only"

import { OAuth2Client } from "google-auth-library"
import { google as googleApi } from "googleapis"
import { buildDriveQuery } from "./queryBuilder"
import { ClientFilters } from "../schemas/filterSchema"
import { getGlobalFilters } from "./driveFilter"
import ratingManager from "./ratingManager"

export async function getDriveFiles(
  oauthClient: OAuth2Client,
  clientFilters: ClientFilters
) {
  const drive = googleApi.drive({ version: "v3", auth: oauthClient })
  const globalFilters = getGlobalFilters(clientFilters)
  console.log("Built query:", buildDriveQuery(globalFilters))
  const fileList = await drive.files.list({
    pageSize: 200,
    q: buildDriveQuery(globalFilters),
    fields:
      "files(id,name,mimeType,trashed,size,capabilities,contentRestrictions,createdTime,modifiedTime,starred)",
    orderBy: "quotaBytesUsed desc",
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  })
  let files = fileList.data.files || []

  // user shouldn't be shown files they can't trash since its main action to review
  files = files.filter((file) =>
    file.capabilities ? !!file.capabilities.canTrash : false
  )

  // user likely shouldn't trash files with content restrictions, so filter them
  // also filter out files smaller than the minimum file size filter
  files = files.filter(
    (file) =>
      !("contentRestrictions" in file) &&
      (file.size
        ? parseInt(file.size) > clientFilters["minimum-file-size"]
        : true)
  )

  // add rating to each file
  type fileGroups = "Needs Review" | "Low Priority" | "Potential Clutter"
  const filesWithRatings = files.map((file) => ({
    ...file,
    rating: ratingManager.getRating(file),
    group: "Needs Review" as fileGroups,
  }))

  const potentialClutter = []
  const lowPriority = []
  const needsReview = []

  for (const file of filesWithRatings) {
    if (!file.rating || file.rating >= 0.7) {
      needsReview.push(file)
    } else if (file.rating < 0.7 && file.rating >= 0.5) {
      lowPriority.push(file)
      file["group"] = "Low Priority"
    } else {
      potentialClutter.push(file)
      file["group"] = "Potential Clutter"
    }
  }

  potentialClutter.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  lowPriority.sort((a, b) => (b.rating || 0) - (a.rating || 0))
  needsReview.sort((a, b) => (b.rating || 0) - (a.rating || 0))

  return {
    potentialClutter,
    lowPriority,
    needsReview,
    all: filesWithRatings,
  }
}
