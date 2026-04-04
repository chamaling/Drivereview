import { EmptyIcon } from "@phosphor-icons/react/dist/ssr"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="size-12 bg-transparent">
          <EmptyIcon className="size-full!" weight="fill" />
        </EmptyMedia>
        <EmptyTitle className="text-lg">No drive data</EmptyTitle>
        <EmptyDescription className="text-xs">
          Click the button below to scan your drive!
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="lg">Scan drive</Button>
      </EmptyContent>
    </Empty>
  )
}
