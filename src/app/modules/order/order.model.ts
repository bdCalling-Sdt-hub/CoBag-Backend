import { Schema, model } from 'mongoose';
import { TOrder } from './order.interface';
import crypto from 'crypto'; // Import the crypto module to generate the random string
// Function to generate a random 25-character string
function generateOrderSecret() {
    return crypto.randomBytes(16).toString('hex').slice(0, 25); // Generates 25 characters
  }

const OrderSchema: Schema = new Schema(
  {
    amount: { type: Number, required: true },
    fullAmount: { type: Number, required: true },
    cobagProfit : {type : Number, required : true},
    senderId: { type: Schema.Types.ObjectId, ref: 'User' }, // Sender ID
    travellerId: { type: Schema.Types.ObjectId, ref: 'User'}, // Receiver ID
    sellKgId: { type: Schema.Types.ObjectId, ref: 'Route'}, // Route / post ID
    isTwentyPercent: { type: Boolean },
    isEightyPercent: { type: Boolean },
    currency: { type: String, required: true },
    stripeSessionId: { type: String },
    stripePaymentIntentId: { type: String },
    orderSecret: { type: String, unique: true, default: generateOrderSecret },
    isSubscriptionPay : {type : Boolean},
    isOrderDelivered : {type : Boolean, default : false},
    status: { type: String, default: 'pending' }, // Default status
    orderStatus: { type: String, default: 'in_progress' }, // Default status
    stripeEvent: { type: Schema.Types.Mixed }, // Allows storing JSON objects
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const OrderModel = model<TOrder>('Order', OrderSchema);
export default OrderModel;