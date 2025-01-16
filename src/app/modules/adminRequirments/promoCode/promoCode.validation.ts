import { z } from 'zod';

export const PromoCodeSchema = z.object({
    body : z.object({
        name: z.string().min(1, { message: 'Name is required' }),
        promoCode: z.string().min(1, { message: 'Promo code is required' }),
        isActive: z.boolean().optional(),
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
 
const updatePromoCodeSchema = z.object({
  body: z.object({
      name: z.string().min(1, { message: 'Name is required' }).optional(),
      promoCode: z.string().min(1, { message: 'Promo code is required' }).optional(),
      isActive: z.boolean().optional(),
      discountPercentage: z
        .number()
        .min(0, { message: 'Discount percentage cannot be negative' })
        .max(100, { message: 'Discount percentage cannot exceed 100' })
        .optional(),
      usageLimitPerUser: z
        .number()
        .int()
        .positive({ message: 'Usage limit per user must be a positive integer' })
        .optional(),
      expirationDate: z.string().refine(
        (date) => !isNaN(new Date(date).getTime()),
        { message: 'Invalid expiration date format' }
      ).optional(),
  })
});
 
export const promoCodeValidation = {
    PromoCodeSchema,
    updatePromoCodeSchema,
}  