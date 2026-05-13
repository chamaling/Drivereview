import "server-only"

import Processor from "../../processor"
import { drive_v3 } from "googleapis"
import Slice from "./slices/slice"
import fileSlice from "./slices/fileSlice"
import financeSlice from "./slices/financeSlice"
import healthSlice from "./slices/healthSlice"
import identitySlice from "./slices/identitySlice"

class NameProcessor extends Processor {
  private slices: Slice[] = []
  constructor(weight: number, slices?: Slice[]) {
    super(weight)
    if (slices) {
      this.slices = slices
    }
  }

  process(file: drive_v3.Schema$File): number {
    if (!file.name) {
      return 0
    }

    if (!this.slices) {
      return 1
    }
    let infFound = false
    let sliceWeight = 1

    for (const slice of this.slices) {
      const proessedWeight = slice.process(file.name)
      if (proessedWeight === Infinity) {
        infFound = true
        break
      }

      sliceWeight = Math.min(sliceWeight, proessedWeight)
    }

    if (infFound) {
      return Infinity
    }

    return sliceWeight
  }
}

/*
The name of a file can be a strong indicator of authority, especially if it contains certain keywords,
so it should have high weight and give higher scores to files with authoritative keywords in their names
*/
const nameProcessor = new NameProcessor(0.25, [
  fileSlice,
  financeSlice,
  healthSlice,
  identitySlice,
])

export default nameProcessor
