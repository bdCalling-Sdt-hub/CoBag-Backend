
import mongoose, { Schema, model, Document } from 'mongoose';

// Define the TypeScript type for the review
export interface TReview extends Document {
  senderId: mongoose.Types.ObjectId; // The ID of the sender
  receiverId: mongoose.Types.ObjectId; // The ID of the receiver
  text: string; // The review text
  ratings: number; // Rating value (1-5)
  createdAt?: Date; // Timestamp when the review was created
  updatedAt?: Date; // Timestamp when the review was last updated
}