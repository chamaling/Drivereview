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

export type FileType = z.infer<typeof fileTypeEnum>
