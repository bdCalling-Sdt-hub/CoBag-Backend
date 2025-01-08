import { z } from 'zod';

export const CreateSearchRouteValidationSchema = z.object({
  body: z.object({
    userId: z.string().min(1, 'User ID is required'), // Ensure userId is provided
    transportMode: z.enum(['plane', 'train', 'all'], { required_error: 'Transport mode is required' }),
    departureCity: z.string().min(1, 'Departure city is required'),
    arrivalCity: z.string().min(1, 'Arrival city is required'),
    desiredDate: z.object({
      startDate: z.string().min(1, 'Start date is required'), // Ensure start date is provided
      endDate: z.string().min(1, 'End date is required'), // Ensure end date is provided
    }),
    flexibleDates: z.boolean().default(false),
    packageWeight: z.number().min(0, 'Package weight must be at least 0'), // Minimum value for weight
  }),
});

export const UpdateSearchRouteValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(), // Optional for updates
    transportMode: z.enum(['plane', 'train', 'all']).optional(),
    departureCity: z.string().optional(),
    arrivalCity: z.string().optional(),
    desiredDate: z
      .object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
      })
      .optional(),
    flexibleDates: z.boolean().optional(),
    packageWeight: z.number().min(0).optional(),
  }),
});

export const searchRouteValidation = {
  CreateSearchRouteValidationSchema,
  UpdateSearchRouteValidationSchema,
};
