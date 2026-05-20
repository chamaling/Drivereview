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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
export default function DriveTable({ data }: { data: driveFile[] }) {
  const [rowSelection, setRowSelection] = useState({})
  const [tab, setTab] = useState<driveFile["group"]>("Potential Clutter")

  const filteredData = useMemo(() => {
    return data.filter((file) => file.group === tab)
  }, [data, tab])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  })

  return (
    <div className="flex flex-col items-start">
      <div className="flex w-full justify-start">
        <Tabs value={tab} className="w-[400px]" onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="Potential Clutter">
              Potential Clutter
            </TabsTrigger>
            <TabsTrigger value="Low Priority">Low Priority</TabsTrigger>
            <TabsTrigger value="Needs Review">Needs Review</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button
          variant="ghost"
          className="ml-auto text-muted-foreground"
          onClick={() => table.toggleAllRowsSelected()}
        >
          Select All
        </Button>
      </div>
      <Table>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              className={row.getIsSelected() ? "bg-accent" : ""}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-8 flex w-full items-center justify-end space-x-12">
        <div className="flex flex-col items-center gap-y-2 text-sm text-muted-foreground">
          <span>
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} selected..
          </span>
          <span>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <div className="flex space-x-4 *:inline-block">
          <Button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            variant="secondary"
          >
            Previous
          </Button>
          <Button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            variant="secondary"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
