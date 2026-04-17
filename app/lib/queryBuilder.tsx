import { GlobalFilters } from "./serverFilters"

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
  return now.toUTCString()
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
  return queries.join(" and ")
}
