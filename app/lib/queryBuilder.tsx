import { GlobalFilters } from "./serverFilters"

export function buildDriveQuery(globalFilters: GlobalFilters) {
  const currQuery = `sharedWithMe=${globalFilters.shared}`
  return currQuery
}
