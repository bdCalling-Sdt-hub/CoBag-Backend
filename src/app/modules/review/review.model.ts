import { model, Schema } from "mongoose";
import { TReview } from "./review.interface";

const ReviewSchema = new Schema<TReview>(
    {
      senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
      receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
      text: { type: String, required: true }, // Review text
      ratings: { type: Number, required: true, min: 1, max: 5 }, // Ratings between 1 and 5
    },
    {
      timestamps: true, // Automatically add createdAt and updatedAt fields
    }
  );
  
  // Create the model
  const ReviewModel = model<TReview>('Review', ReviewSchema);
  
  export default ReviewModel;