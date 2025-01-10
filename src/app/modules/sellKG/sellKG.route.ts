import  express  from "express";
import { sellKgController } from "./sellKG.controller";
import validateRequest from "../../middlewares/validateRequest";
import { sellKgRouteValidation } from "./sellKG.validation";
// import { upload } from "../../config/multar";
import fileUploadHandler from "../../middlewares/fileUploadHandler";

const router = express.Router()

const UPLOADS_FOLDER = 'uploads/ticket';
const upload = fileUploadHandler(UPLOADS_FOLDER);

router.post(
    "/create",
    upload.single('ticket'),
    validateRequest(sellKgRouteValidation.CreateRouteValidationSchema),
    sellKgController.createSell
)
router.post(
    "/search",
    validateRequest(sellKgRouteValidation.SearchRouteValidationSchema) ,
    sellKgController.searchRoute
)
router.post(
    "/search/courier",
    sellKgController.availableForCourier
)
router.get(
    "/get-all",
    sellKgController.getAllSellKg
)
router.patch(
    "/update/:id",
    validateRequest(sellKgRouteValidation.UpdateRouteValidationSchema) ,
    sellKgController.updateSellKg
)
router.delete(
    "/sell-kg/:id",
    sellKgController.deleteFromDB
)




export const sellKgRoutes = router;