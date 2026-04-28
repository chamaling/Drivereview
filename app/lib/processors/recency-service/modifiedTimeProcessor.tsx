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
const modifiedTimeProcessor = new ModifiedTimeProcessor(0.33)

export default modifiedTimeProcessor
