"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { MinimumFileSlider } from "./MinimumFileSlider"
import { useState } from "react"
export default function ScanButton() {
  const [open, setOpen] = useState(true)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button>Scan drive</Button>} />
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Filter your Drive</DialogTitle>
          <DialogDescription>
            Select the criteria for which files you want to scan.
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="file-size-1">Minimum File Size</Label>
            <MinimumFileSlider />
          </Field>
          <Field>
            <Label htmlFor="file-type-1">File Type</Label>
          </Field>
          <Field>
            <Label htmlFor="last-modified-1">Last Modified</Label>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button type="submit">Scan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
