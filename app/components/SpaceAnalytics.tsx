"use client"
import { scanDriveAction } from "../actions/scanDriveAction"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie } from "recharts"
import {
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { formatFileSize } from "@/app/lib/fileHelper"

const chartConfig = {
  potential_clutter: {
    label: "Potential Clutter",
    color: "var(--chart-1)",
  },
  low_priority: {
    label: "Low Priority",
    color: "var(--chart-2)",
  },
  needs_review: {
    label: "Needs Review",
    color: "var(--chart-3)",
  },
  firstDist: {
    color: "blue",
  },
  secondDist: {
    color: "green",
  },
  thirdDist: {
    color: "purple",
  },
} satisfies ChartConfig
export default function SpaceAnalytics({
  data,
}: {
  data: NonNullable<Awaited<ReturnType<typeof scanDriveAction>>["data"]>
}) {
  const lowLength = data.lowPriority.length
  const reviewLength = data.needsReview.length
  const clutterLength = data.potentialClutter.length
  const total = lowLength + reviewLength + clutterLength

  if (total === 0) {
    return <p>No data to display.</p>
  }

  const lowSize = data.lowPriority.reduce(
    (acc, file) => (file.size ? acc + parseInt(file.size, 10) : acc),
    0
  )
  const reviewSize = data.needsReview.reduce(
    (acc, file) => (file.size ? acc + parseInt(file.size, 10) : acc),
    0
  )
  const clutterSize = data.potentialClutter.reduce(
    (acc, file) => (file.size ? acc + parseInt(file.size, 10) : acc),
    0
  )

  const totalSize = lowSize + reviewSize + clutterSize

  const lowSizePercent = ((lowSize / totalSize) * 100).toFixed(2)
  const reviewSizePercent = ((reviewSize / totalSize) * 100).toFixed(2)
  const clutterSizePercent = ((clutterSize / totalSize) * 100).toFixed(2)

  const chartData = [
    {
      name: "low_priority",
      value: parseFloat(lowSizePercent),
      fill: chartConfig.low_priority.color,
    },
    {
      name: "needs_review",
      value: parseFloat(reviewSizePercent),
      fill: chartConfig.needs_review.color,
    },
    {
      name: "potential_clutter",
      value: parseFloat(clutterSizePercent),
      fill: chartConfig.potential_clutter.color,
    },
  ]

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h3>Likely Space to Save</h3>
      <ChartContainer config={chartConfig} className="relative h-64 w-full">
        <PieChart responsive accessibilityLayer>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
            cornerRadius={4}
            paddingAngle={3}
            innerRadius="60%"
            animationBegin={0}
            animationDuration={800}
          />
          <ChartLegend className="flex-col" content={<ChartLegendContent />} />
        </PieChart>
        <div className="absolute inset-0 bottom-1/3 flex items-center justify-center">
          <span className="text-base font-bold">
            {formatFileSize(totalSize)}
          </span>
        </div>
      </ChartContainer>
    </div>
  )
}
