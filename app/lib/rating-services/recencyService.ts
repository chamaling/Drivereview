import RatingService from "./service"
import createdTimeProcessor from "../processors/recency-service/createdTimeProcessor"
import modifiedTimeProcessor from "../processors/recency-service/modifiedTimeProcessor"

const recencyService = new RatingService(0.25, [
  createdTimeProcessor,
  modifiedTimeProcessor,
])

export default recencyService
