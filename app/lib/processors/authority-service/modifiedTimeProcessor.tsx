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
    if (!file.createdTime) {
      return 0
    }
    const modifiedTime = new Date(file.modifiedTime).getTime()
    const currentTime = Date.now()
    const createdTime = new Date(file.createdTime).getTime()

    const ageSinceCreationInDays =
      (currentTime - createdTime) / (1000 * 60 * 60 * 24)
    const ageSinceModificationInDays =
      (currentTime - modifiedTime) / (1000 * 60 * 60 * 24)

    const creationModificationElapse =
      ageSinceCreationInDays - ageSinceModificationInDays

    if (creationModificationElapse < 1) {
      return 0
    }

    // files modified more recently after creation are more likely
    // to be relevant so use a logarithmic scale
    return Math.max(Math.log10(creationModificationElapse) / 2, 1)
  }
}

/*
The time a file was last modifeid is a moderate indicator of authority,
so it should have a moderate weight
*/
const modifiedTimeProcessor = new ModifiedTimeProcessor(0.33)

export default modifiedTimeProcessor
