"use client"
import {
  scanDriveAction,
  type drivePriorityMap,
} from "../actions/scanDriveAction"
import { ChartContainer } from "@/components/ui/chart"
import { PieChart, Pie } from "recharts"
import {
  type ChartConfig,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { formatFileSize, convertMimeTypeToFileType } from "@/app/lib/fileHelper"
export default function SpaceAnalytics({ data }: { data: drivePriorityMap }) {
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

  const fileTypeCounts: Record<string, number> = {}

  data.all.forEach((file) => {
    const fileType = convertMimeTypeToFileType(file.mimeType || "")
    fileTypeCounts[fileType] =
      (fileTypeCounts[fileType] || 0) +
      (file.size ? parseInt(file.size, 10) : 0)
  })

  const [firstGreatest, secondGreatest, thirdGreatest] = Object.entries(
    fileTypeCounts
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const topThreeTotal = [firstGreatest, secondGreatest, thirdGreatest].reduce(
    (acc, entry) => acc + (entry ? entry[1] : 0),
    0
  )

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
    first_dist: {
      label: firstGreatest ? firstGreatest[0] : "N/A",
      color: "var(--chart-3)",
    },
    second_dist: {
      label: secondGreatest ? secondGreatest[0] : "N/A",
      color: "var(--chart-4)",
    },
    third_dist: {
      label: thirdGreatest ? thirdGreatest[0] : "N/A",
      color: "var(--chart-5)",
    },
  } satisfies ChartConfig

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

  const chartDistData = [
    {
      name: "first_dist",
      value: firstGreatest ? firstGreatest[1] : 0,
      fill: chartConfig.first_dist.color,
    },
    {
      name: "second_dist",
      value: secondGreatest ? secondGreatest[1] : 0,
      fill: chartConfig.second_dist.color,
    },
    {
      name: "third_dist",
      value: thirdGreatest ? thirdGreatest[1] : 0,
      fill: chartConfig.third_dist.color,
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
      <h3 className="mt-8">File Space Distribution</h3>
      <ChartContainer config={chartConfig} className="relative h-64 w-full">
        <PieChart responsive accessibilityLayer>
          <Pie
            data={chartDistData}
            dataKey="value"
            nameKey="name"
            strokeWidth={0}
            cornerRadius={4}
            paddingAngle={3}
            innerRadius="60%"
            animationBegin={0}
            animationDuration={800}
          />
          <ChartLegend
            className="flex-col items-center"
            content={<ChartLegendContent />}
          />
        </PieChart>

        <div className="absolute inset-0 bottom-1/3 flex flex-col items-center justify-center">
          <span className="text-base font-bold">
            {formatFileSize(topThreeTotal)}
          </span>

          <small className="text-muted-foreground">(Top 3 file types)</small>
        </div>
      </ChartContainer>
    </div>
  )
}
