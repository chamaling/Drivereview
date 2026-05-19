import { ColumnDef } from "@tanstack/react-table"
import { driveFile } from "@/app/actions/scanDriveAction"

export const columns: ColumnDef<driveFile>[] = [
  {
    accessorKey: "name",
  },
  {
    accessorKey: "size",
    accessorFn: (file) => `(${file.size})`,
  },
  {
    accessorKey: "rating",
  },
]
