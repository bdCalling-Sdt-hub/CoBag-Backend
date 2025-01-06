import { Schema, model } from 'mongoose';
import IVerification from './vaCode.interface';

const verificationCodeSchema: Schema = new Schema(
  {
    email: { type: String },
    verificationCode: { type: String },
    createdAt: { type: Date, default: Date.now, expires: 3600 }, // TTL set to 1 hour (3600 seconds)
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const verificationCodeModel = model<IVerification>('verificationCode', verificationCodeSchema);

export default verificationCodeModel;
