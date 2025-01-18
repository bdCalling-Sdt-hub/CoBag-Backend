import { z } from 'zod';

const PaymentSchema = z.object({
  body: z.object({
    amount: z.number().int().positive(), // Ensure it's a positive integer
    senderId: z.string().optional(),
    receiverId: z.string().optional(),
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
