import "server-only"
import { drive_v3 } from "googleapis"

export default abstract class Processor {
  constructor(weight: number) {
    if (weight < 0) {
      throw new Error("Weight must be a non-negative number")
    }
    this.weight = weight
  }

  private weight: number
  abstract process(file: drive_v3.Schema$File): number
}
