import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const UserSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      default: '/uploads/users/user.png'
    },
    ethanDocuments: {
      type: String,
      default: '/uploads/ethanDocuments/user.png'
    },
    proofOfAddress: {
      type: String,
      default: '/uploads/proofOfAddress/user.png'
    },
    RIB: {
      type: String,
      default: '/uploads/RIB/user.png'
    },
    phone: { type: String, required: true },
    subscription: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "user", "super_admin"],
      default: "user",
    },
    isBlocked: { type: Boolean, default: false }, // Added field
    isSuspend: { type: Boolean, default: false }, // Added field
  },
  {
    timestamps: true,
  }
);

const UserModel = model<TUser>('User', UserSchema);

export default UserModel;