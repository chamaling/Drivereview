import { ColumnDef } from "@tanstack/react-table"
import { driveFile } from "@/app/actions/scanDriveAction"
import { formatFileSize } from "@/app/lib/fileHelper"

function convertRatingToTextHundredths(rating: number) {
  const percentage = (rating * 100).toFixed(0)
  return `${percentage}/100`
}

export const columns: ColumnDef<driveFile>[] = [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "size",
    accessorFn: (file) => `(${formatFileSize(parseInt(file.size || "0", 10))})`,
  },
  {
    accessorKey: "rating",
    accessorFn: (file) => convertRatingToTextHundredths(file.rating),
  },
]
