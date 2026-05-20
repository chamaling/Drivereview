import { EmptyIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import ScanButton from "../components/ScanButton"
import * as z from "zod"
import { scanDriveAction } from "../actions/scanDriveAction"
import SpaceAnalytics from "../components/SpaceAnalytics"
import DriveTable from "../components/drive-table/DriveTable"

const searchParamsSchema = z.union([
  z
    .object({
      "minimum-file-size": z.string(),
      "last-modified": z.string(),
      "file-types": z.string(),
    })
    .strict()
    .transform((data) => ({
      "minimum-file-size": parseInt(data["minimum-file-size"], 10),
      "last-modified": data["last-modified"],
      "file-types": JSON.parse(data["file-types"]),
    })),
  z.object({}).strict(),
])

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>
}) {
  const resolvedSearchParams = await searchParams
  const parsedSearchParams = searchParamsSchema.safeParse(resolvedSearchParams)

  if (!parsedSearchParams.success) {
    throw new Error(
      "The link you followed has invalid data. Go back to home and try again."
    )
  }
  const userFilters = parsedSearchParams.data as Parameters<
    typeof scanDriveAction
  >[0]
  const scanResult =
    Object.keys(userFilters).length > 0
      ? await scanDriveAction(userFilters)
      : null
  const data = scanResult ? scanResult.data : null

  if (!data || data.all.length === 0) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="my-auto flex flex-col items-center justify-center">
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon" className="size-12 bg-transparent">
                <EmptyIcon className="size-full!" weight="fill" />
              </EmptyMedia>
              <EmptyTitle className="text-lg">No drive data</EmptyTitle>
              <EmptyDescription className="text-xs">
                Click the button below to scan your drive!
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
          <ScanButton />
        </div>
      </div>
    )
  }

  if (!data) {
    throw new Error(
      "Failed to scan drive with provided filters. Please go back and try again."
    )
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex w-full items-center justify-around">
        <DriveTable data={data.all} />
        <SpaceAnalytics data={data} />
      </div>

      <ScanButton rescan initOpen={false} />
    </div>
  )
}
