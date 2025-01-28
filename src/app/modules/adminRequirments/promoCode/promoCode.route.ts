import  express  from "express";
import validateRequest from "../../../middlewares/validateRequest";
import { PromoCodeSchema, promoCodeValidation } from "./promoCode.validation";
import { promoCodeController } from "./promoCode.controller";
import { USER_ROLE } from "../../user/user.constant";
import auth from "../../../middlewares/auth";


const router = express.Router();

router.post(
    "/create",
    auth( USER_ROLE.admin, USER_ROLE.super_admin),
    validateRequest(promoCodeValidation.PromoCodeSchema),
    promoCodeController.createPromoCode
)
router.get(
    "/read",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    promoCodeController.getAllPromoCode
)
router.patch(
    "/update/:id",
    auth( USER_ROLE.admin,  USER_ROLE.super_admin),
    validateRequest(promoCodeValidation.updatePromoCodeSchema),
    promoCodeController.updateProme
)
router.get(
    "/read/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    promoCodeController.getOnePromoCode
)


export const promoCodeRoute = router;
