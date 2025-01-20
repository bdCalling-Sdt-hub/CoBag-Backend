
import  express  from "express"
import validateRequest from "../../../middlewares/validateRequest"
import { platformValidation } from "./platform.validation"
import { platformService } from "./platform.service"
import { platformController } from "./platform.controller"
import auth from "../../../middlewares/auth"
import { USER_ROLE } from "../../user/user.constant"

const router = express.Router()

router.post(
    "/create",
    auth( USER_ROLE.admin, USER_ROLE.supar_admin),
    validateRequest(platformValidation.platformSchema),
    platformController.createPlatform
)
router.get(
    "/read",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    platformController.getAllPlatformData
)
router.patch(
    "/update",
    auth( USER_ROLE.admin,  USER_ROLE.supar_admin),
    validateRequest(platformValidation.UpdatePlatformSchema),
    platformController.updatePlatform
)



export const platformRoute = router