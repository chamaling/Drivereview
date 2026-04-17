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
    throw new Error("Invalid search parameters.")
  }
  const userFilters = parsedSearchParams.data as Parameters<
    typeof scanDriveAction
  >[0]

  if (true) {
    const result = await scanDriveAction(userFilters)
    return <p>Testing</p>
  }

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
