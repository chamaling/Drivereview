import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class StarredProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (file.starred) {
      return 0.5 // starred files should add to the score as they are more likely to be needed
    }

    return 0
  }
}

/*
Files that are starred are more likely to be needed,
however users may forget to star important files,
so it should have a moderate weight and not heavily penalize unstarred files
*/
const starredProcessor = new StarredProcessor(0.1)

export default starredProcessor
