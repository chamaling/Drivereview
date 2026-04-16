import "server-only"
import { clientFiltersSchema, ClientFilters } from "../schemas/filterSchema"
import { serverFilters, type GlobalFilters } from "./serverFilters"

function validateClientFilters(filters: unknown): ClientFilters {
  const result = clientFiltersSchema.safeParse(filters)
  if (!result.success) {
    throw new Error("Invalid filters: " + result.error.message)
  }

  return result.data
}

export function getGlobalFilters(clientFilters: ClientFilters): GlobalFilters {
  return {
    ...serverFilters,
    ...clientFilters,
  }
}
