"use client"
import { columns } from "./columns"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table"
import { driveFile } from "@/app/actions/scanDriveAction"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
export default function DriveTable({ data }: { data: driveFile[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })
  return (
    <>
      <Tabs defaultValue="" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="Potential Clutter">Potential Clutter</TabsTrigger>
          <TabsTrigger value="Low Priority">Low Priority</TabsTrigger>
          <TabsTrigger value="Needs Review">Needs Review</TabsTrigger>
        </TabsList>
      </Tabs>
      <Table>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}
