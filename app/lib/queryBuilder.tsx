import { getGlobalFilters } from "./driveFilter"
import { ClientFilters } from "../schemas/filterSchema"

export async function buildDriveQuery(clientFilters: ClientFilters) {
  const globalFilters = getGlobalFilters(clientFilters)
  let currentQuery = ``
}
