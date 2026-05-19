export function formatFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes >= 1e9) {
    return (fileSizeInBytes / 1e9).toFixed(2) + " GB"
  } else {
    return (fileSizeInBytes / 1e6).toFixed(2) + " MB"
  }
}
