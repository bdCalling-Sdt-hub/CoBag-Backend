import { z } from "zod";


// 1. Zod Schema Validation
const platformSchema = z.object({
    body : z.object({
        purchaseKilosAirplane: z.number().nonnegative(),
    train: z.object({
      small: z.number().nonnegative(),
      medium: z.number().nonnegative(),
      large: z.number().nonnegative(),
    }),
    minimumPricePerTransaction: z.number().nonnegative(),
    coBagCommission: z.number().nonnegative(),
    })
  });

  const UpdatePlatformSchema = z.object({
    body : z.object({
        purchaseKilosAirplane: z.number().optional(),
    train: z.object({
      small: z.number().nonnegative(),
      medium: z.number().nonnegative(),
      large: z.number().nonnegative(),
    }),
    minimumPricePerTransaction: z.number().nonnegative(),
    coBagCommission: z.number().nonnegative(),
    })
  });


  export const platformValidation = {
    platformSchema,
    UpdatePlatformSchema
  }