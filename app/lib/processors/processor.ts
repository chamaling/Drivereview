import "server-only"
import { drive_v3 } from "googleapis"

export default interface Processor {
  weight: number
  process: (file: drive_v3.Schema$File) => Promise<number>
}
