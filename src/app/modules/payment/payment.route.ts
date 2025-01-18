import express from 'express';
import { paymentController, webhookHandler } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { paymentValidation } from './payment.validation';

const router = express.Router();

router.post(
    '/create-checkout-session',
    validateRequest(paymentValidation.PaymentSchema),
    paymentController.createCheckoutSessionHandler
    );
router.post(
    '/webhook/stripe',
    // Stripe requires the raw body to construct the event
    express.raw({type: 'application/json'}),
    webhookHandler
);

export const paymentRoute = router;
