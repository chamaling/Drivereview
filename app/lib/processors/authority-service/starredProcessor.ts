import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class StarredProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.starred) {
      // unstarred files should not be heavily penalized, as users may forget to star important files
      return 0.5
    }

    return 1
  }
}

/*
Files that are starred are more likely to be needed,
however users may forget to star important files,
so it should have a moderate weight and not heavily penalize unstarred files
*/
const starredProcessor = new StarredProcessor(0.25)

export default starredProcessor
