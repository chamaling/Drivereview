import "server-only"
import * as z from "zod"

export const serverFiltersSchema = z.object({
  trashed: z.boolean(),
  shared: z.boolean(),
  contentRestrictions: z.enum(["none", "readOnly", "readWrite"]),
  owners: z.array(z.string()),
  capabilities: z.array(z.string()),
})

export type ServerFilters = z.infer<typeof serverFiltersSchema>
