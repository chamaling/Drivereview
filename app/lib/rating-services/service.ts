import "server-only"
import type Proccessor from "@/app/lib/processors/processor"
import { drive_v3 } from "googleapis"

export default interface RatingService {
  weight: number
  processors: Proccessor[]
  aggregate: (file: drive_v3.Schema$File) => Promise<number>
}
