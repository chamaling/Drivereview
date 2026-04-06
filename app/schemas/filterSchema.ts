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
    .record(fileTypeEnum, z.boolean().optional())
    .refine(
      (record) => Object.values(record).some((value) => value === true),
      "At least one file type must be selected."
    ),
  "last-modified": lastModifiedEnum,
})

export type ClientFilters = z.infer<typeof clientFiltersSchema>
export type FileType = z.infer<typeof fileTypeEnum>
