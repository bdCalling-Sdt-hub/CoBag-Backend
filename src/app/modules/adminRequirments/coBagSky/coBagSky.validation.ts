import { z } from 'zod';

const subscriptionSchema = z.object({
  body : z.object({
    title: z.string().min(1, { message: "Title is required" }),
  subscriptionFee: z.number().min(0, { message: "Subscription fee must be a positive number" }),
  benefit1: z.string().optional(),
  benefit2: z.string().optional(),
  benefit3: z.string().optional(),
  benefit4: z.string().optional(),
  benefit5: z.string().optional(),
  })
});
const updateSubscriptionSchema = z.object({
  body : z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
  subscriptionFee: z.number().min(0, { message: "Subscription fee must be a positive number" }).optional(),
  benefit1: z.string().optional(),
  benefit2: z.string().optional(),
  benefit3: z.string().optional(),
  benefit4: z.string().optional(),
  benefit5: z.string().optional(),
  })
});

export const validateCoBagSky = {
    subscriptionSchema,
    updateSubscriptionSchema
}