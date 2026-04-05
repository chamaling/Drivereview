import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"

export default function FileTypeButton({
  fileType,
  src,
}: {
  fileType: string
  src: string
}) {
  return (
    <Checkbox
      key={fileType}
      id={fileType}
      nativeButton={true}
      render={(props) => (
        <Button
          {...props}
          className="flex size-16 flex-col items-center justify-center min-[420px]:size-24 data-checked:bg-primary! data-checked:text-primary-foreground"
          variant="outline"
        >
          <div className="relative size-6 min-[420px]:size-8">
            <Image src={src} alt={"Google Drive Icon for " + fileType} fill />
          </div>
          <span className="text-xs">{fileType}</span>
        </Button>
      )}
    />
  )
}
