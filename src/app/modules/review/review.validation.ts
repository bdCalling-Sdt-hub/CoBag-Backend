import { z } from 'zod';

const ReviewValidationSchema = z.object({
  body : z.object({
    senderId: z.string().min(1, "Sender ID is required"), // Ensure it's a non-empty string
  receiverId: z.string().min(1, "Receiver ID is required"), // Ensure it's a non-empty string
  text: z.string().min(1, "Review text is required"), // Ensure the text is provided
  ratings: z
    .number()
    .min(1, "Ratings must be at least 1")
    .max(5, "Ratings cannot exceed 5"), // Ensure ratings are between 1 and 5
  })
});
const UpdateReviewValidationSchema = z.object({
    body: z.object({
        senderId: z.string().optional(), // Optional for updates
        receiverId: z.string().optional(), // Optional for updates
        text: z.string().optional(), // Optional for updates
        ratings: z
          .number()
          .min(1, "Ratings must be at least 1")
          .max(5, "Ratings cannot exceed 5")
          .optional(), // Optional for updates
      }),
});

export const reviewValidation = {
    ReviewValidationSchema,
    UpdateReviewValidationSchema
} 
