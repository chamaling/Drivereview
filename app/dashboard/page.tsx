import { EmptyIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import ScanButton from "../components/ScanButton"
export default function Page() {
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
