import { z } from 'zod';

const CreateRouteValidationSchema = z.object({
  body: z.object({
    userId: z.string(), // Ensure userId is present
    transportMode: z.enum(['plane', 'train', 'all'], { required_error: 'Transport mode is required' }),
    size: z.enum(['small', 'medium', 'large']).optional(),
    transportType: z.enum(['direct', 'withCorrespondence'], { required_error: 'Transport type is required' }),
    ticket: z.string().optional(),
    flightNumber: z.string().optional(),
    departureCity: z.string().min(1, 'Departure city is required'),
    arrivalCity: z.string().min(1, 'Arrival city is required'),
    departureDate: z.string().min(1, 'Departure date is required'),
    arrivalDate: z.string().min(1, 'Arrival date is required'),
    departureTime: z.string().min(1, 'Departure time is required'),
    arrivalTime: z.string().min(1, 'Arrival time is required'),
    availableToBeCourier: z.string().optional(),
    maxpurchAmountAdvance: z.string(),
    handLuggage: z.string().min(0).optional(),
    checkedBaggage: z.string().min(0).optional(),
    totalSpace : z.number().optional(),
    price : z.number().optional(),
    isTwentyPercent : z.boolean().optional(),
    isEightyPercent : z.boolean().optional(),
    courierOptions: z
      .object({
        maxPurchaseAmount: z.string().min(0).optional(),
        message: z.string().optional(),
      })
      .optional(),
  }),
});

const UpdateRouteValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(), // Optional during updates
    transportMode: z.enum(['plane', 'train', 'all']).optional(),
    transportType: z.enum(['direct', 'withCorrespondence']).optional(),
    ticket: z.string().optional(),
    flightNumber: z.string().optional(),
    departureCity: z.string().optional(),
    arrivalCity: z.string().optional(),
    departureDate: z.string().optional(),
    arrivalDate: z.string().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
    handLuggage: z.number().min(0).optional(),
    checkedBaggage: z.number().min(0).optional(),
    courierOptions: z
      .object({
        maxPurchaseAmount: z.number().min(0).optional(),
        message: z.string().optional(),
      })
      .optional(),
  }),
});

const SearchRouteValidationSchema = z.object({
  body: z.object({
    userId: z.string().optional(),
    transportMode: z.enum(['plane', 'train','all']).optional(),
    transportType: z.enum(['direct', 'withCorrespondence']).optional(),
    ticket: z.string().optional(),
    flightNumber: z.string().optional(),
    departureCity: z.string().optional(),
    arrivalCity: z.string().optional(),
    departureDate: z.string().optional(),
    arrivalDate: z.string().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
    handLuggage: z.number().min(0).optional(),
    checkedBaggage: z.number().min(0).optional(),
    courierOptions: z
      .object({
        maxPurchaseAmount: z.number().min(0).optional(),
        message: z.string().optional(),
      })
      .optional(),
  }),
});

export const sellKgRouteValidation = {
  CreateRouteValidationSchema,
  UpdateRouteValidationSchema,
  SearchRouteValidationSchema,
};