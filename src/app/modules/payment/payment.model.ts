import { Schema, model } from 'mongoose';
import { TPayment } from './paymemt.interface';

const PaymentSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User' }, // Sender ID
    receiverId: { type: Schema.Types.ObjectId, ref: 'User'}, // Receiver ID
    sellKgId: { type: Schema.Types.ObjectId, ref: 'Route'}, // Route / post ID
    isTwentyPercent: { type: Boolean },
    isEightyPercent: { type: Boolean },
    currency: { type: String, required: true },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    isSubscriptionPay : {type : Boolean},
    status: { type: String, default: 'pending' }, // Default status
    stripeEvent: { type: Schema.Types.Mixed }, // Allows storing JSON objects
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const PaymentModel = model<TPayment>('Payment', PaymentSchema);
export default PaymentModel;