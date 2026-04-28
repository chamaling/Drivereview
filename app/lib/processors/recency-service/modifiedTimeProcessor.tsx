import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"
class ModifiedTimeProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.modifiedTime) {
      return 0
    }
    const modifiedTime = new Date(file.modifiedTime).getTime()
    const currentTime = Date.now()
    const ageInDays = (currentTime - modifiedTime) / (1000 * 60 * 60 * 24)

    if (ageInDays < 1) {
      return 1
    }

    return 1 / ageInDays ** 2
  }
}

/*
The time a file was last modified is a moderately strong indicator of recency,
due to the fact that users modify files shortly after creating them, and it
indicates activity, so it should have a moderate weight.
*/
const modifiedTimeProcessor = new ModifiedTimeProcessor(0.33)

export default modifiedTimeProcessor
