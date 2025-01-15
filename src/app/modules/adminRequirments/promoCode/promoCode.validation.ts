import { z } from 'zod';

export const PromoCodeSchema = z.object({
    body : z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        promoCode: z.string().min(1, { message: 'Promo code is required' }),
        discountPercentage: z
          .number()
          .min(0, { message: 'Discount percentage cannot be negative' })
          .max(100, { message: 'Discount percentage cannot exceed 100' }),
        usageLimitPerUser: z
          .number()
          .int()
          .positive({ message: 'Usage limit per user must be a positive integer' }),
        expirationDate: z.string().refine(
          (date) => !isNaN(new Date(date).getTime()),
          { message: 'Invalid expiration date format' }
        ),
    })
});
 
export const promoCodeValidation = {
    PromoCodeSchema,
}  