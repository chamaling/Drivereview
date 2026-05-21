import RatingService from "./service"
import createdTimeProcessor from "../processors/authority-service/createdTimeProcessor"
import modifiedTimeProcessor from "../processors/authority-service/modifiedTimeProcessor"
import mimeTypeProcessor from "../processors/authority-service/mimeTypeProcessor"
import nameProcessor from "../processors/authority-service/nameProcessor/nameProcessor"
import sizeProcessor from "../processors/authority-service/sizeProcessor"
const authorityService = new RatingService(0.7, [
  createdTimeProcessor,
  modifiedTimeProcessor,
  mimeTypeProcessor,
  nameProcessor,
  sizeProcessor,
])

export default authorityService
