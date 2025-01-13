import { Request, Response } from 'express';
import { createCheckoutSession, handleWebhookEvent } from './payment.service';
import Stripe from 'stripe';

export const createCheckoutSessionHandler = async (req: Request, res: Response) => {
  const { amount, currency } = req.body;

  try {
    const session = await createCheckoutSession(amount, currency);
    res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const webhookHandler = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

  let event: Stripe.Event;

  try {
    event = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2022-11-15',
    }).webhooks.constructEvent(req.body, sig, signingSecret);

    console.log(req.body,event)
    await handleWebhookEvent(event);
    res.status(200).send({ success: true });
  } catch (error: any) {
    console.error('Webhook signature verification failed:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};


const paymentService = {
  createCheckoutSessionHandler,
  webhookHandler
}
