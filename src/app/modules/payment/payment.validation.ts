import { z } from 'zod';

const PaymentSchema = z.object({
  body: z.object({
    amount: z.number().int().positive(), // Ensure it's a positive integer
    cobagProfit : z.number().int().positive(),
    senderId: z.string().optional(),
    travellerId: z.string().optional(),
    sellKgId: z.string().optional(),
    currency: z.string(),
    paymentMethodId: z.string().optional(),
    isSubscriptionPay : z.boolean().optional(),
    isTwentyPercent : z.boolean().optional(),
    isEightyPercent : z.boolean().optional(),
  }),
});

export const paymentValidation = {
  PaymentSchema,
};
