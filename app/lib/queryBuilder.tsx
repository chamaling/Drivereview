import { GlobalFilters } from "./serverFilters"

export function buildDriveQuery(globalFilters: GlobalFilters) {
  const currQuery = `'me' in owners`
  return currQuery
}
