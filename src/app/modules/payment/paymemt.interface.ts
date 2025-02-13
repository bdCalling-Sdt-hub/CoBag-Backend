export interface TPayment {
  amount: number; // Amount in smallest currency unit
  senderId : string; // Who send money 
  reciverId : string; // who recive money
  sellKgId : string; // who recive money
  currency: string; // e.g., "usd"
  stripeSessionId?: number; // Stripe Checkout Session ID
  stripePaymentIntentId?: number; // Stripe PaymentIntent ID
  status: string; // Payment status (e.g., "pending", "succeeded")
  isTwentyPercent ?: boolean, 
  isEightyPercent ?: boolean,
  isSubscriptionPay?: boolean,
  cobagProfit : number,  
  stripeEvent: any;
}
