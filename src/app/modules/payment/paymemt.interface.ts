export interface TPayment {
  amount: number; // Amount in smallest currency unit
  currency: string; // e.g., "usd"
  stripeSessionId?: string; // Stripe Checkout Session ID
  stripePaymentIntentId?: string; // Stripe PaymentIntent ID
  status: string; // Payment status (e.g., "pending", "succeeded")
  stripeEvent: any;
}
