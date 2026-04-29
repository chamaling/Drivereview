import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class TrashedProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (file.trashed) {
      return 0
    }

    return 1
  }
}

/*
Files that are in the trash are less likely to be needed,
so they should have a high weight and lower the score significantly
*/
const trashedProcessor = new TrashedProcessor(0.5)

export default trashedProcessor
