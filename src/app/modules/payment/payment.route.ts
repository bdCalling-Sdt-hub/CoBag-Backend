import express from 'express';
import { paymentService } from './payment.controller';

const router = express.Router();

router.post('/webhook', paymentService.webhookHandler);
router.post('/create-checkout-session', paymentService.createCheckoutSessionHandler);

export const paymentRoute = router;
