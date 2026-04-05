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
          className="flex size-24 flex-col items-center justify-center data-checked:bg-blue-500"
          variant="outline"
        >
          <Image
            src={src}
            alt={"Google Drive Icon for " + fileType}
            width={24}
            height={24}
          />
          <span className="text-xs">{fileType}</span>
        </Button>
      )}
    />
  )
}
