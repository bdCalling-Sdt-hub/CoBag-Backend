import { z } from 'zod';

const PaymentSchema = z.object({
  body: z.object({
    amount: z.number().int().positive(), // Ensure it's a positive integer
    currency: z.string(),
    paymentMethodId: z.string(),
  }),
});

export const paymentValidation = {
  PaymentSchema,
};
