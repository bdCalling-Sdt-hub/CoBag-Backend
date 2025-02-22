import { Schema, model } from 'mongoose';
import { TRoute } from './sellKG.interface';

const RouteSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    transportMode: { type: String, enum: ['plane', 'train', 'all'], required: true },
    Size: { type: String, enum: ['small', 'medium', 'large'] },
    transportType: { type: String, enum: ['direct', 'withCorrespondence'], required: true },
    ticket: { type: String },
    flightNumber: { type: String },
    isOrderComfirmed: { type: Boolean, default: false },
    departureCity: { type: String, required: true },
    arrivalCity: { type: String, required: true },
    departureDate: { type: String, required: true },
    arrivalDate: { type: String, required: true },
    departureTime: { type: String, required: true },
    arrivalTime: { type: String, required: true },
    handLuggage: { type: Number, default: 0 },
    maxpurchAmountAdvance: { type: Number, default: 0 },
    checkedBaggage: { type: Number, default: 0 },
    availableToBeCourier: { type: Boolean, default: false }, // Fixed Boolean type
    user: { type: Schema.Types.Mixed, default : {} },
    courierOptions: {
      maxPurchaseAmount: { type: Number, default: 0 },
      message: { type: String },
    },
    totalSpace : { type: Number, default: 0 }, 
    price : { type: Number, default: 0 }, 
    isTwentyPercent: { type: Boolean },
    isEightyPercent: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

const SellKgModel = model<TRoute>('Route', RouteSchema);

export default SellKgModel;