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
import { Field, FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { MinimumFileSlider } from "./MinimumFileSlider"
import { useState } from "react"
import FileTypeButton from "./FileTypeButton"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const fileTypes = [
  { fileType: "Docs", src: "/google-docs.svg" },
  { fileType: "Sheets", src: "/google-sheets.svg" },
  { fileType: "Slides", src: "/google-slides.svg" },
  { fileType: "Image", src: "/google-image.svg" },
  { fileType: "Video", src: "/google-video.svg" },
  { fileType: "PDF", src: "/google-pdf.svg" },
]
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
          <FieldSet className="flex items-center justify-center">
            <FieldLegend variant="label">File Type</FieldLegend>
            <div className="grid w-3/4 grid-cols-3 justify-items-center gap-x-16 gap-y-4">
              {fileTypes.map(({ fileType, src }) => (
                <FileTypeButton key={fileType} fileType={fileType} src={src} />
              ))}
            </div>
          </FieldSet>
          <Field>
            <Label htmlFor="last-modified-1">Last Modified</Label>
            <Select>
              <SelectTrigger id="last-modified-1" className="w-full max-w-40">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Last 30 days">Last 30 days</SelectItem>
                  <SelectItem value="Last 90 days">Last 90 days</SelectItem>
                  <SelectItem value="Last year">Last year</SelectItem>
                  <SelectItem value="Last 2 years">Last 2 years</SelectItem>
                  <SelectItem value="All files">All files</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
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
