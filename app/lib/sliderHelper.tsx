/*Users may have files that range from MB to GB, so we need a clean logarithmic mapping
 * so the user feels they have good control
 */
export function sliderValueToFileSize(sliderValue: number): number {
  const minFileSize = 1e6 // 1 MB
  const maxFileSize = 1e11 // 100 GB

  const logMin = Math.log10(minFileSize)
  const logMax = Math.log10(maxFileSize)

  const logValue = logMin + (logMax - logMin) * (sliderValue / 100)
  const fileSize = Math.pow(10, logValue)
  return snapFileSize(fileSize)
}

export function snapFileSize(bytes: number): number {
  if (bytes >= 1e10) {
    // snap to nearest 5 GB
    return Math.round(bytes / 5e9) * 5e9
  }

  if (bytes >= 1e9) {
    // snap to nearest 0.1 GB
    return Math.round(bytes / 1e8) * 1e8
  }

  if (bytes >= 1e7) {
    // snap to nearest 10 MB
    return Math.round(bytes / 1e7) * 1e7
  }

  // snap to nearest 1 MB
  return Math.round(bytes / 1e6) * 1e6
}
