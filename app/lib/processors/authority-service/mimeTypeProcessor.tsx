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

    // Process based on MIME type
    return 1
  }
}

/*
The MIME type can prvoide some indicator of recency,
as documents are much more likely to be edited than images or videos
and needed 
*/
const mimeTypeProcessor = new MimeTypeProcessor(0.27)

export default mimeTypeProcessor
