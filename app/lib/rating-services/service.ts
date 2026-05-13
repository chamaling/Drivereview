import "server-only"
import type Proccessor from "@/app/lib/processors/processor"
import { drive_v3 } from "googleapis"
import { MATCHED_PATH_HEADER } from "next/dist/lib/constants"

export default class RatingService {
  constructor(weight: number, processors: Proccessor[]) {
    if (weight < 0) {
      throw new Error("Weight must be a non-negative number")
    }

    this.weight = weight
    this.processors = processors
  }

  private weight: number
  private processors: Proccessor[]

  public aggregate(file: drive_v3.Schema$File): number {
    let accumulatedRating = 1
    let totalRating = 1

    for (const processor of this.processors) {
      const rating = processor.process(file)
      accumulatedRating += rating * processor.getWeight()
      totalRating += processor.getWeight()
    }

    accumulatedRating = Math.max(accumulatedRating, 0)

    return totalRating > 0
      ? Math.min((accumulatedRating / totalRating) * this.weight, 1)
      : 0
  }

  public getWeight(): number {
    return this.weight
  }
}
