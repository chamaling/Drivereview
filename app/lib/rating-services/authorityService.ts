import RatingService from "./service"
import createdTimeProcessor from "../processors/authority-service/createdTimeProcessor"
import modifiedTimeProcessor from "../processors/authority-service/modifiedTimeProcessor"
import starredProcessor from "../processors/authority-service/starredProcessor"
import mimeTypeProcessor from "../processors/authority-service/mimeTypeProcessor"
import nameProcessor from "../processors/authority-service/nameProcessor/nameProcessor"

const authorityService = new RatingService(0.65, [
  createdTimeProcessor,
  modifiedTimeProcessor,
  starredProcessor,
  mimeTypeProcessor,
  nameProcessor,
])

export default authorityService
