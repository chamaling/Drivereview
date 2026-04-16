import "server-only"
import { clientFiltersSchema, ClientFilters } from "../schemas/filterSchema"
import { serverFilters, type GlobalFilters } from "./serverFilters"

export function getGlobalFilters(clientFilters: ClientFilters): GlobalFilters {
  return {
    ...serverFilters,
    ...clientFilters,
  }
}
