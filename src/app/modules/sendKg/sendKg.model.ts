import { Schema, model } from 'mongoose';
import { TSendKg } from './sendKg.interface';

const SendKgSchema = new Schema<TSendKg>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    transportMode: { type: String, enum: ['plane', 'train', 'all'], required: true },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    desiredDate: {
      startDate: { type: String, required: true }, // e.g., "mm/dd/yyyy"
      endDate: { type: String, required: true }, // e.g., "mm/dd/yyyy"
    },
    flexibleDates: { type: Boolean, default: false },
    packageWeight: { type: Number, required: true, min: 0 }, // Minimum weight is 0
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const SendKgModel = model<TSendKg>('SendKg', SendKgSchema);

export default SendKgModel;
