import  express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { codeValidation } from "./vaCode.vallidation";
import { VaCodeController } from "./vaCode.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";


const router = express.Router()

router.post(
    '/send-verification',
    validateRequest(codeValidation.verificationCodeSchema),
    VaCodeController.sendVerification
)
router.post(
    '/proses-verification',
    VaCodeController.verifyController
)
// router.post(
//     '/proses-email-verification',
//     auth(USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
//     VaCodeController.verifyEmailController
// )









export const codeRoutes = router;