import express from 'express';
import { paymentController, webhookHandler } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { paymentValidation } from './payment.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
    '/create-checkout-session',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    validateRequest(paymentValidation.PaymentSchema),
    paymentController.createCheckoutSessionHandler
    );
router.post(
    '/webhook/stripe',
    // Stripe requires the raw body to construct the event
    express.raw({type: 'application/json'}),
    webhookHandler
);

router.get(
    "/monthly-progress",
    auth(USER_ROLE.super_admin,  USER_ROLE.user),
    paymentController.getMonthlyData
 )



export const paymentRoute = router;
