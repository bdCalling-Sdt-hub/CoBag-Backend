import  express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { codeValidation } from "./vaCode.vallidation";
import { VaCodeController } from "./vaCode.controller";


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









export const codeRoutes = router;