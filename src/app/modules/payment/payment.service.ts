import Stripe from 'stripe';
import PaymentModel from './payment.model';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export const createCheckoutSession = async (amount: number, currency: string) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency,
          product_data: { name: 'Sample Product' },
          unit_amount: amount,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.BASE_URL}/payment/cancel`,
  });

  // Save to database
  await PaymentModel.create({
    amount,
    currency,
    stripeSessionId: session.id,
    status: 'created',
  });

  return session;
};

export const handleWebhookEvent = async (event: Stripe.Event) => {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      await PaymentModel.findOneAndUpdate(
        { stripeSessionId: session.id },
        { status: 'succeeded' }
      );
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }
};
