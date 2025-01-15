
import  express  from "express"
import validateRequest from "../../../middlewares/validateRequest"
import { platformValidation } from "./platform.validation"
import { platformService } from "./platform.service"
import { platformController } from "./platform.controller"

const router = express.Router()

router.post(
    "/create",
    validateRequest(platformValidation.platformSchema),
    platformController.createPlatform
)
router.get(
    "/read",
    platformController.getAllPlatformData
)
router.patch(
    "/update",
    validateRequest(platformValidation.UpdatePlatformSchema),
    platformController.updatePlatform
)



export const platformRoute = router