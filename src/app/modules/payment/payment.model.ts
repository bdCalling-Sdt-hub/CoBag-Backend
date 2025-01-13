import { Schema, model } from 'mongoose';
import { TPayment } from './paymemt.interface';

const PaymentSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    status: { type: String, default: 'pending' }, // Default status
  },
  {
    timestamps: true,
  }
);

const PaymentModel = model<TPayment>('Payment', PaymentSchema);
export default PaymentModel;
