export interface TOrder {
    amount: number; // Amount in smallest currency unit
    senderId : string; // Who send money 
    travellerId : string; // who recive money
    sellKgId : string; // who recive money
    fullAmount : number;
    currency: string; // e.g., "usd"
    stripeSessionId?: number; // Stripe Checkout Session ID
    stripePaymentIntentId?: number; // Stripe PaymentIntent ID
    status: string; // Payment status (e.g., "pending", "succeeded")
    orderStatus : string;
    isTwentyPercent ?: boolean, 
    isOrderDelivered ?: boolean, 
    isEightyPercent ?: boolean,
    isSubscriptionPay?: boolean,
    cobagProfit : number,  
    stripeEvent: any;
  }
  