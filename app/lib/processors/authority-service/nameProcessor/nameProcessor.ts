import "server-only"

import Processor from "../../processor"
import { drive_v3 } from "googleapis"

class NameProcessor extends Processor {
  constructor(weight: number) {
    super(weight)
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.name) {
      return 0
    }

    return 1
  }
}

const nameProcessor = new NameProcessor(0.5)

export default nameProcessor
