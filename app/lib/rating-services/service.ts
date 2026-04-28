import "server-only"
import type Proccessor from "@/app/lib/processors/processor"
import { drive_v3 } from "googleapis"

export default abstract class RatingService {
  constructor(weight: number, processors: Proccessor[]) {
    this.weight = weight
    this.processors = processors
  }

  private weight: number
  private processors: Proccessor[]

  public aggregate(file: drive_v3.Schema$File): number {
    return 0
  }
}
