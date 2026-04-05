import * as z from "zod"

export const clientFiltersSchema = z.object({
  "minimum-file-size": z.number(),
  "file-types": z.array(z.string()),
  "last-modified": z.string(),
})
