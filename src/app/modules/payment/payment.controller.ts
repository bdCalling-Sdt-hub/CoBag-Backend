import {  NextFunction, Request, Response } from 'express';
import { createCheckoutSession } from './payment.service';
import Stripe from 'stripe';
import stripe from 'stripe';
import PaymentModel from './payment.model';

export const createCheckoutSessionHandler = async (req: Request, res: Response, next : NextFunction) => {
  const { amount, currency } = req.body;

  try {
    console.log("body controller: ===== ",req.body)    
    const session = await createCheckoutSession(amount, currency);
    res.status(200).json({ success: true, sessionId: session.id, url: session.url });
  } catch (error: any) {
    console.error('Error creating checkout session:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const webhookHandler = async (req: Request, res: Response, next: NextFunction) => {
  const sig = req.headers['stripe-signature'] as string;
  const signingSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, signingSecret);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const paymentData = {
        amount: session.amount_total != null ? session.amount_total / 100 : 0,
        currency: session.currency || 'unknown',
        stripeSessionId: session.id || '',
        stripePaymentIntentId: session.payment_intent as string || '',
        status: 'completed',
        stripeEvent: event, // Store as JSON object
      };

      console.log('Saving Payment Data:', paymentData);

      try {
        const payment = new PaymentModel(paymentData);
        await payment.save();
        console.log('Payment saved successfully:', payment);
      } catch (dbError) {
        console.error('Database save error:', dbError);
        res.status(500).json({ error: 'Database save error' });
        return;
      }
    } else {
      console.warn(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).send(`Webhook Error: ${err}`);
  }
};


export const paymentService = {
  createCheckoutSessionHandler,
  webhookHandler
}
