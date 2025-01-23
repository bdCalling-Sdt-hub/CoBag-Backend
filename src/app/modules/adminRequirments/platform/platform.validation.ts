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
    missionPrice: z.number().nonnegative(),
    })
  });

  const UpdatePlatformSchema = z.object({
    body : z.object({
        purchaseKilosAirplane: z.number().optional(),
    train: z.object({
      small: z.number().nonnegative().optional(),
      medium: z.number().nonnegative().optional(),
      large: z.number().nonnegative().optional(),
    }).optional(),
    minimumPricePerTransaction: z.number().nonnegative().optional(),
    coBagCommission: z.number().nonnegative().optional(),
    missionPrice: z.number().nonnegative().optional(),
    })
  });


  export const platformValidation = {
    platformSchema,
    UpdatePlatformSchema
  }