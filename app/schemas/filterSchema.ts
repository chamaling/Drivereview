import * as z from "zod"
export const fileTypeEnum = z.enum([
  "Docs",
  "Sheets",
  "Slides",
  "Video",
  "PDF",
  "Image",
])
export const lastModifiedEnum = z.enum([
  "Last 30 days",
  "Last 90 days",
  "Last year",
  "Last 2 years",
  "All files",
])

export const clientFiltersSchema = z.object({
  "minimum-file-size": z
    .number("Minimum file size must be a number.")
    .min(1, "Minimum file size must be at least 1 byte.")
    .max(
      100 * 1024 * 1024 * 1024,
      "Maximum file size must be less than 100 GB."
    ), // Max 100 GB
  "file-types": z
    .array(fileTypeEnum, "File types must be an array of valid file types.")
    .min(1, "File types must contain at least 1 type.")
    .max(6, "File types cannot contain more than 6 types.")
    .refine((arr) => new Set(arr).size === arr.length, {
      message: "File types must be unique.",
    }),
  "last-modified": lastModifiedEnum,
})

export type ClientFilters = z.infer<typeof clientFiltersSchema>
