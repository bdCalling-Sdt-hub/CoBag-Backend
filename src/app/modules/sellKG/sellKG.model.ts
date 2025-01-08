import { Schema, model } from 'mongoose';
import { TRoute } from './sellKG.interface';

const RouteSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    transportMode: { type: String, enum: ['plane', 'train'], required: true },
    transportType: { type: String, enum: ['direct', 'withCorrespondence'], required: true },
    ticket: { type: String },
    flightNumber: { type: String },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureDate: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    handLuggage: { type: Number, default: 0 },
    checkedBaggage: { type: Number, default: 0 },
    
    courierOptions: {
      maxPurchaseAmount: { type: Number, default: 0 },
      message: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const SellKgModel = model<TRoute>('Route', RouteSchema);

export default SellKgModel;
