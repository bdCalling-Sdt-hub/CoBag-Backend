import  express  from "express";
import { sellKgController } from "./sellKG.controller";
import validateRequest from "../../middlewares/validateRequest";
import { sellKgRouteValidation } from "./sellKG.validation";
// import { upload } from "../../config/multar";
import fileUploadHandler from "../../middlewares/fileUploadHandler";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router()

const UPLOADS_FOLDER = 'uploads/ticket';
const upload = fileUploadHandler(UPLOADS_FOLDER);

router.post(
    "/create",
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user ),
    upload.single('ticket'),
    validateRequest(sellKgRouteValidation.CreateRouteValidationSchema),
    sellKgController.createSell
)
router.post(
    "/search",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    validateRequest(sellKgRouteValidation.SearchRouteValidationSchema) ,
    sellKgController.searchRoute
)
router.post(
    "/search/courier",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    sellKgController.availableForCourier
)
router.get(
    "/get-all",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    sellKgController.getAllSellKg
)
router.patch(
    "/update/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    validateRequest(sellKgRouteValidation.UpdateRouteValidationSchema) ,
    sellKgController.updateSellKg
)
router.delete(
    "/sell-kg/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    
    sellKgController.deleteFromDB
)




export const sellKgRoutes = router;