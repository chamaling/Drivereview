import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class SizeProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.size) {
      return 0
    }
    const sizeInMB = parseInt(file.size) / (1024 * 1024)

    // Larger files are more efficient to delete, so they should have a lower score
    if (sizeInMB < 1) {
      return 1
    } else if (sizeInMB < 100) {
      return 0.5
    } else {
      return 0
    }
  }
}

/*
The file size as a general metric is robust in
identifying if a file is worth to delete,
as users are more likely to delete large files than small files,
so it should have a higher weight
*/
const sizeProcessor = new SizeProcessor(0.5)

export default sizeProcessor
