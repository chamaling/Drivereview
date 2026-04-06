"use client"
import { ZodError } from "zod"

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
import { fileTypeReducer, type FileButton } from "../reducers/fileTypeReducer"
import { useReducer } from "react"
import { clientFiltersSchema } from "../schemas/filterSchema"
import { scanDriveAction } from "@/app/actions/scanDriveAction"
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
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    const data = {
      "minimum-file-size": rangeValue,
      "last-modified": modifiedValue,
      "file-types": fileTypeState,
    }

    try {
      const validatedData = clientFiltersSchema.parse(data)
      await scanDriveAction(validatedData)
    } catch (error) {
      if (error instanceof ZodError) {
        const firstError = error.issues[0]
        setError(firstError.message)
      } else {
        setError("An unexpected error occurred. Please try again.")
      }
    }
  }
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
        <FieldGroup aria-describedby={error ? "form-error" : undefined}>
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
          {error && (
            <p className="text-sm text-red-500" id="form-error">
              {error}
            </p>
          )}
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleClick}>Scan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
