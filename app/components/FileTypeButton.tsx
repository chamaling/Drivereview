import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
export default function FileTypeButton({
  fileType,
  src,
}: {
  fileType: string
  src?: string
}) {
  return (
    <Checkbox
      key={fileType}
      id={fileType}
      nativeButton={true}
      render={(props) => (
        <Button
          {...props}
          className="size-20 text-xs data-checked:bg-blue-500"
          variant="outline"
        >
          {fileType}
        </Button>
      )}
    />
  )
}
