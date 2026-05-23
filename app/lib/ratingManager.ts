import authorityService from "./rating-services/authorityService"
import recencyService from "./rating-services/recencyService"
import { drive_v3 } from "googleapis"

class RatingManager {
  private services = [authorityService, recencyService]
  public getRating(file: drive_v3.Schema$File): number {
    let totalRating = 0
    let totalWeight = 0

    for (const service of this.services) {
      const rating = service.aggregate(file)
      totalRating += rating
      totalWeight += service.getWeight()

      let serviceName = "authorityService"
      if (service === recencyService) {
        serviceName = "recencyService"
      }

      if (file.trashed) {
        totalRating -= 0.5
      }
      if (file.starred) {
        totalRating += 0.5
      }
    }

    return totalWeight > 0 ? Math.min(totalRating / totalWeight, 1) : 0
  }
}

const ratingManager = new RatingManager()
export default ratingManager
