import * as React from "react"

import { Slider } from "@/components/ui/slider"
import { sliderValueToFileSize } from "@/app/lib/sliderHelper"

function formatFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes >= 1e9) {
    return (fileSizeInBytes / 1e9).toFixed(2) + " GB"
  } else {
    return (fileSizeInBytes / 1e6).toFixed(2) + " MB"
  }
}

export function MinimumFileSlider({
  value,
  setValue,
}: {
  value: number
  setValue: (value: number) => void
}) {
  function handleChange(newValue: number) {
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
