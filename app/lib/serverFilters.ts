import "server-only"
import { ClientFilters } from "@/app/schemas/filterSchema"

export const serverFilters = {
  shared: false,
  contentRestrictions: "none",
  capabilities: [],
}

export type ServerFilters = typeof serverFilters

export type GlobalFilters = typeof serverFilters & ClientFilters
