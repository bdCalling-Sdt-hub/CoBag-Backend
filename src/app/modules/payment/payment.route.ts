import express from 'express';
import { createCheckoutSessionHandler, webhookHandler } from './payment.controller';

const router = express.Router();

router.post('/create-checkout-session', createCheckoutSessionHandler);
router.post('/webhook/stripe', express.raw({ type: 'application/json' }), webhookHandler);

export const paymentRoute = router;
