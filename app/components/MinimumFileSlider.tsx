"use client"

import * as React from "react"

import { Slider } from "@/components/ui/slider"

export function MinimumFileSlider() {
  const [value, setValue] = React.useState(0.5)

  return (
    <div className="mx-auto grid w-full max-w-xs gap-3">
      <div>
        <span className="text-sm text-muted-foreground">{value} GB</span>
      </div>

      <Slider
        id="slider-demo-temperature"
        value={value}
        onValueChange={(value) => setValue(value as number)}
        min={0}
        max={100}
        step={0.1}
      />
    </div>
  )
}
