import express from 'express';
import { paymentService, webhookHandler } from './payment.controller';

const router = express.Router();

router.post('/create-checkout-session', paymentService.createCheckoutSessionHandler);
router.post(
    '/webhook/stripe',
    // Stripe requires the raw body to construct the event
    express.raw({type: 'application/json'}),
    webhookHandler
);

export const paymentRoute = router;
