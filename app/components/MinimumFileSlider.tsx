"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"

function snapFileSize(bytes: number): number {
  if (bytes >= 1e9) {
    // snap to nearest 0.1 GB
    return Math.round(bytes / 1e8) * 1e8
  }

  // snap to nearest 1 MB
  return Math.round(bytes / 1e6) * 1e6
}

/*Users may have files that range from MB to GB, so we need a clean logarithmic mapping
 * so the user feels they have good control
 */
function sliderValueToFileSize(sliderValue: number): number {
  const minFileSize = 1e6 // 1 MB
  const maxFileSize = 1e11 // 100 GB

  const logMin = Math.log10(minFileSize)
  const logMax = Math.log10(maxFileSize)

  const logValue = logMin + (logMax - logMin) * (sliderValue / 100)
  const fileSize = Math.pow(10, logValue)
  return snapFileSize(fileSize)
}
function formatFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes >= 1e9) {
    return (fileSizeInBytes / 1e9).toFixed(2) + " GB"
  } else {
    return (fileSizeInBytes / 1e6).toFixed(2) + " MB"
  }
}

export function MinimumFileSlider() {
  const [value, setValue] = React.useState(sliderValueToFileSize(0))

  function handleChange(newValue: number) {
    console.log(newValue)
    setValue(sliderValueToFileSize(newValue))
  }

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div>
        <span className="text-sm text-muted-foreground">
          {formatFileSize(value)}
        </span>
      </div>

      <Slider
        id="slider-demo-temperature"
        step={0.1}
        min={0}
        max={100}
        onValueChange={(newValue) => handleChange(newValue as number)}
      />
    </div>
  )
}
