import  express  from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { PromoCodeSchema, promoCodeValidation } from "./promoCode.validation";
import { promoCodeController } from "./promoCode.controller";


const router = express.Router();

router.post(
    "/create",
    validateRequest(promoCodeValidation.PromoCodeSchema),
    promoCodeController.createPromoCode
)
router.get(
    "/read",
    promoCodeController.getAllPromoCode
)
router.patch(
    "/update/:id",
    validateRequest(promoCodeValidation.updatePromoCodeSchema),
    promoCodeController.updateProme
)

export const promoCodeRoute = router;
