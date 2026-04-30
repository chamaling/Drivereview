import RatingService from "./service"
import trashedProcessor from "../processors/general-service/trashedProcessor"
import sizeProcessor from "../processors/general-service/sizeProcessor"

const generalService = new RatingService(0.5, [trashedProcessor, sizeProcessor])

export default generalService
