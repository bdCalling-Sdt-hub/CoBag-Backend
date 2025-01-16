import { TSubscription } from "./coBagSky.interface";
import { Schema, model } from 'mongoose';
// Define the Mongoose schema
const SubscriptionSchema: Schema = new Schema<TSubscription>(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      subscriptionFee: {
        type: Number,
        required: true,
        min: 0,
      },
      benefit1: {
        type: String,
        trim: true,
      },
      benefit2: {
        type: String,
        trim: true,
      },
      benefit3: {
        type: String,
        trim: true,
      },
      benefit4: {
        type: String,
        trim: true,
      },
      benefit5: {
        type: String,
        trim: true,
      },
    },
    {
      timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
  );
  
  // Create the model
  const SubscriptionModel = model<TSubscription>('Subscription', SubscriptionSchema);
  
  export default SubscriptionModel;