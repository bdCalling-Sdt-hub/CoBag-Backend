import express from 'express'
import validateRequest from '../../../middlewares/validateRequest';
import { validateCoBagSky } from './coBagSky.validation';
import { coBagController } from './coBagSky.controller';
import { USER_ROLE } from '../../user/user.constant';
import auth from '../../../middlewares/auth';

const router = express.Router()

router.post(
    "/create",
    auth( USER_ROLE.admin, USER_ROLE.super_admin),
    validateRequest(validateCoBagSky.subscriptionSchema),
    coBagController.createSubscription
)
router.get(
    '/read',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    coBagController.getAllData
)
router.patch(
    '/update/:id',
    auth( USER_ROLE.admin,  USER_ROLE.super_admin),
    validateRequest(validateCoBagSky.updateSubscriptionSchema),
    coBagController.updateSubscription
)
router.delete(
    '/delete/:id',
    auth( USER_ROLE.admin, USER_ROLE.super_admin),
    coBagController.deleteSubscription
)

export const coBagSkyRouter = router;