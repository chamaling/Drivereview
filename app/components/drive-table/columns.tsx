import { ColumnDef } from "@tanstack/react-table"
import { driveFile } from "@/app/actions/scanDriveAction"
import { formatFileSize } from "@/app/lib/fileHelper"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { convertMimeTypeToFileType } from "@/app/lib/fileHelper"

function convertRatingToTextHundredths(rating: number) {
  const percentage = (rating * 100).toFixed(0)
  return `${percentage}/100`
}

function convertRatingToTailwindColor(rating: number) {
  if (rating >= 0.8) {
    return "text-green-600"
  } else if (rating >= 0.6) {
    return "text-yellow-600"
  } else if (rating >= 0.4) {
    return "text-orange-600"
  } else {
    return "text-red-600"
  }
}
const fileTypeToIconMap: Record<string, string> = {
  Docs: "/google-docs.svg",
  Sheets: "/google-sheets.svg",
  Slides: "/google-slides.svg",
  Image: "/google-image.svg",
  PDF: "/google-pdf.svg",
  Video: "/google-video.svg",
}

export const columns: ColumnDef<driveFile>[] = [
  {
    id: "icon",
    cell: ({ row }) => {
      const file = row.original
      const fileType = convertMimeTypeToFileType(file.mimeType || "")
      const src = fileTypeToIconMap[fileType] || "/image.svg"

      return (
        <div className="relative size-5">
          <Image src={src} alt={"Google Drive Icon for " + fileType} fill />
        </div>
      )
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "name",
  },
  {
    accessorKey: "size",
    accessorFn: (file) => `(${formatFileSize(parseInt(file.size || "0", 10))})`,
  },
  {
    accessorKey: "rating",

    cell: ({ row }) => {
      const rating = row.original.rating
      return (
        <span className={`${convertRatingToTailwindColor(rating)} font-bold`}>
          {convertRatingToTextHundredths(rating)}
        </span>
      )
    },
  },
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
]
