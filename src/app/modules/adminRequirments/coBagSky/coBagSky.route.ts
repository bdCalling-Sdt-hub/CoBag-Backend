import express from 'express'
import validateRequest from '../../../middlewares/validateRequest';
import { validateCoBagSky } from './coBagSky.validation';
import { coBagController } from './coBagSky.controller';

const router = express.Router()

router.post(
    "/create",
    validateRequest(validateCoBagSky.subscriptionSchema),
    coBagController.createSubscription
)
router.get(
    '/read',
    coBagController.getAllData
)
router.patch(
    '/update/:id',
    validateRequest(validateCoBagSky.updateSubscriptionSchema),
    coBagController.updateSubscription
)
router.delete(
    '/delete/:id',
    coBagController.deleteSubscription
)

export const coBagSkyRouter = router;