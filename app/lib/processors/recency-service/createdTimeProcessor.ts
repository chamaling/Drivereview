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

    return Math.min(ageInDays * -(1 / 14), -0.5) // Cap the score at -0.5 for files older than 14 days
  }
}

/*
The time a file was created
is a strong indicator of recency,
so it should have a higher weight compared to other factors 
*/
const createdTimeProcessor = new CreatedTimeProcessor(0.5)

export default createdTimeProcessor
