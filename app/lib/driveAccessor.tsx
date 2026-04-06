import "server-only"
import * as z from "zod"

import { clientFiltersSchema, ClientFilters } from "../schemas/filterSchema"

export function validateClientFilters(filters: unknown): ClientFilters {
  const result = clientFiltersSchema.safeParse(filters)
  if (!result.success) {
    throw new Error("Invalid filters: " + result.error.message)
  }
  return result.data
}
