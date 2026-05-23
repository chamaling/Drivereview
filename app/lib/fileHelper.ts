import { ClientFilters } from "../schemas/filterSchema"
export function formatFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes >= 1e9) {
    return (fileSizeInBytes / 1e9).toFixed(2) + " GB"
  } else {
    return (fileSizeInBytes / 1e6).toFixed(2) + " MB"
  }
}

export function convertFileTypeToMimeType(
  fileType: keyof ClientFilters["file-types"]
): string {
  switch (fileType) {
    case "Docs":
      return "'application/vnd.google-apps.document'"
    case "Sheets":
      return "'application/vnd.google-apps.spreadsheet'"
    case "Slides":
      return "'application/vnd.google-apps.presentation'"
    case "Image":
      return "'image/'"
    case "PDF":
      return "'application/pdf'"
    case "Video":
      return "'video/'"
  }
}

export function convertMimeTypeToFileType(
  mimeType: ReturnType<typeof convertFileTypeToMimeType>
): string {
  switch (mimeType) {
    case "application/pdf":
      return "PDF"
    case "application/vnd.google-apps.document":
      return "Docs"
    case "application/vnd.google-apps.spreadsheet":
      return "Sheets"
    case "application/vnd.google-apps.presentation":
      return "Slides"
  }
  if (mimeType.startsWith("image/")) {
    return "Image"
  }
  if (mimeType.startsWith("video/")) {
    return "Video"
  }
  return "Other"
}

export function convertFileTypeToHexColor(fileType: string): string {
  switch (fileType) {
    case "Docs":
      return "#4285F4"
    case "Sheets":
      return "#34A853"
    case "Slides":
      return "#FBBC05"
    case "Image":
      return "#EA4335"
    case "PDF":
      return "#FF6D01"
    case "Video":
      return "#8E24AA"
    default:
      return "#9E9E9E"
  }
}
