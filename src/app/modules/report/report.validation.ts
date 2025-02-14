import { z } from 'zod';

// Zod schema for validating report data
const reportSchema = z.object({
  body : z.object({
    userId: z.string().min(1, 'User ID is required'),
    description: z.string().min(1, 'Description is required'),
    status: z.enum(['In progress', 'Resolved']),
    date: z.string(),
  })
});

export const reportValidation = {
  reportSchema,
};