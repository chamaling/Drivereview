import "server-only"

import Processor from "../processor"
import { drive_v3 } from "googleapis"

class CreatedTimeProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.createdTime) {
      return 0
    }
    const createdTime = new Date(file.createdTime).getTime()
    const currentTime = Date.now()
    const ageInDays = (currentTime - createdTime) / (1000 * 60 * 60 * 24)

    if (ageInDays < 1) {
      return 0
    }

    // older files have higher authority, so use a logarithmic scale for higher scores
    // 3.65 is used to give a score of 1 for files that are 1 year old (with a division of 2)
    return Math.min(0, Math.log10(ageInDays / 3.65) / 2)
  }
}

const createdTimeProcessor = new CreatedTimeProcessor(0.5)

export default createdTimeProcessor
