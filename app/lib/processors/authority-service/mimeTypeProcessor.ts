import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class MimeTypeProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.mimeType) {
      return 0
    }
    const mimeType = file.mimeType

    switch (mimeType) {
      case "application/vnd.google-apps.document":
      case "application/vnd.google-apps.spreadsheet":
      case "application/vnd.google-apps.presentation":
        // documents are likely to be edited or necessary, so they get a higher score
        return 1
      case "image/jpeg":
      case "image/png":
      case "video/mp4":
        // images and videos are less likely so they get a lower score
        return 0.5
      default:
        // other file types are even less likely to be needed, so they get a lower score
        return 0.25
    }
  }
}

/*
The MIME type can prvoide some indicator of recency,
as documents are much more likely to be edited than images or videos
and needed 
*/
const mimeTypeProcessor = new MimeTypeProcessor(0.25)

export default mimeTypeProcessor
