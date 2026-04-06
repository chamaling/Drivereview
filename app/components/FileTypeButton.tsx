import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { Dispatch } from "react"
import type { FileTypeAction } from "@/app/reducers/fileTypeReducer"
import type { FileType } from "@/app/schemas/filterSchema"

export default function FileTypeButton({
  fileType,
  src,
  checked = false,
  dispatchToggle,
}: {
  fileType: FileType
  src: string
  checked?: boolean
  dispatchToggle: Dispatch<FileTypeAction>
}) {
  return (
    <Checkbox
      key={fileType}
      id={fileType}
      nativeButton={true}
      value={fileType}
      checked={checked}
      onCheckedChange={() =>
        dispatchToggle({ type: "TOGGLE_FILE_TYPE", payload: fileType })
      }
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
