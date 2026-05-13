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

    // older files are more likely to be needed so subtract from them the least
    return Math.min(Math.max(-1 / ageInDays ** 1.5 / 2, -0.5), 0)
  }
}

/*
The time a file was created is a strong indicator of authority,
so it should have high weight and give higher scores to older files
*/
const createdTimeProcessor = new CreatedTimeProcessor(0.35)

export default createdTimeProcessor
