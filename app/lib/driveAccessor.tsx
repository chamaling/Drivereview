import "server-only"
import * as z from "zod"

import { fileTypeEnum, lastModifiedEnum } from "@/app/schemas/filterSchema"

export const clientFiltersSchema = z.object({
  "minimum-file-size": z
    .number()
    .min(1)
    .max(100 * 1024 * 1024 * 1024), // Max 100 GB
  "file-types": z
    .array(fileTypeEnum)
    .max(6)
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "File types must be unique.",
    }),
  "last-modified": lastModifiedEnum,
})
