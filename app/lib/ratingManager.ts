import authorityService from "./rating-services/authorityService"
import recencyService from "./rating-services/recencyService"
import generalService from "./rating-services/generalService"
import { drive_v3 } from "googleapis"

class RatingManager {
  private services = [authorityService, recencyService, generalService]
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
      } else if (service === generalService) {
        serviceName = "generalService"
      }
      console.log(
        `Rating from ${serviceName} for file ${file.name}: ${rating} with weight ${service.getWeight()}`
      )
    }
    return totalWeight > 0 ? Math.min(totalRating / totalWeight, 1) : 0
  }
}

const ratingManager = new RatingManager()
export default ratingManager
