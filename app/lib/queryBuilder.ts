import "server-only"
import { GlobalFilters } from "./serverFilters"
import { convertFileTypeToMimeType } from "./fileHelper"

function convertLastModifiedStringtoUTCTimestamp(
  lastModified: GlobalFilters["last-modified"]
): string {
  const now = new Date()
  if (lastModified === "Last 30 days") {
    now.setDate(now.getDate() - 30)
  } else if (lastModified === "Last 90 days") {
    now.setDate(now.getDate() - 90)
  } else if (lastModified === "Last year") {
    now.setFullYear(now.getFullYear() - 1)
  } else if (lastModified === "Last 2 years") {
    now.setFullYear(now.getFullYear() - 2)
  } else {
    return ""
  }
  return now.toISOString()
}

function convertFileTypesArrayToQueryString(
  fileTypes: GlobalFilters["file-types"]
): string {
  if (!fileTypes || Object.keys(fileTypes).length === 0) {
    return ""
  }

  const fileTypeQuery = Object.entries(fileTypes)
    .map(([key, value]) => {
      if (value) {
        const mimeType = convertFileTypeToMimeType(
          key as keyof typeof fileTypes
        )
        return `mimeType=${mimeType}`
      }
      return null
    })
    .filter((query) => query !== null)
    .join(" or ")

  return fileTypeQuery ? `(${fileTypeQuery})` : ""
}

export function buildDriveQuery(globalFilters: GlobalFilters) {
  const currQuery = `'me' in owners`
  const queries: string[] = [currQuery]

  const lastModifiedString = convertLastModifiedStringtoUTCTimestamp(
    globalFilters["last-modified"]
  )
  if (lastModifiedString) {
    queries.push(`modifiedTime > '${lastModifiedString}'`)
  }

  const fileTypesString = convertFileTypesArrayToQueryString(
    globalFilters["file-types"]
  )
  if (fileTypesString) {
    queries.push(fileTypesString)
  }

  return queries.join(" and ")
}
