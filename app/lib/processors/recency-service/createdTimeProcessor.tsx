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
      return 1
    }

    return 1 / ageInDays
  }
}

/*
The time a file was created
is a strong indicator of recency,
so it should have a higher weight compared to other factors 
*/
const createdTimeProcessor = new CreatedTimeProcessor(0.5)

export default createdTimeProcessor
