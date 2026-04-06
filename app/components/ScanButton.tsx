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
import { sliderValueToFileSize } from "@/app/lib/sliderHelper"
import {
  type FileType,
  fileTypeReducer,
  type FileButton,
} from "../reducers/fileTypeReducer"
import { useReducer } from "react"

const fileTypeOptions: FileButton[] = [
  { fileType: "Docs", src: "/google-docs.svg" },
  { fileType: "Sheets", src: "/google-sheets.svg" },
  { fileType: "Slides", src: "/google-slides.svg" },
  { fileType: "Image", src: "/google-image.svg" },
  { fileType: "Video", src: "/google-video.svg" },
  { fileType: "PDF", src: "/google-pdf.svg" },
]
const modifiedOptions = [
  "Last 30 days",
  "Last 90 days",
  "Last year",
  "Last 2 years",
  "All files",
]

export default function ScanButton() {
  const [open, setOpen] = useState(true)
  const [rangeValue, setRangeValue] = useState(sliderValueToFileSize(0))
  const [modifiedValue, setModifiedValue] = useState("Last 30 days")
  const [fileTypeState, dispatchFileType] = useReducer(fileTypeReducer, {})

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
            <MinimumFileSlider value={rangeValue} setValue={setRangeValue} />
          </Field>
          <FieldSet className="flex items-center justify-center">
            <FieldLegend variant="label">File Type</FieldLegend>
            <div className="grid w-3/4 grid-cols-3 justify-items-center gap-x-16 gap-y-4">
              {fileTypeOptions.map((option) => (
                <FileTypeButton
                  key={option.fileType}
                  fileType={option.fileType}
                  checked={!!fileTypeState[option.fileType]}
                  src={option.src}
                  dispatchToggle={dispatchFileType}
                />
              ))}
            </div>
          </FieldSet>
          <Field>
            <Label htmlFor="last-modified-1">Last Modified</Label>
            <Select
              value={modifiedValue}
              onValueChange={(value) => setModifiedValue(value as string)}
            >
              <SelectTrigger id="last-modified-1" className="w-full max-w-40">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {modifiedOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
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
