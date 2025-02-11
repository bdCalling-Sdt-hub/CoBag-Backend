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
      default: "",
    },
    address : {
      type : String,
      default : ""
    },
    ethanDocuments: {
      type: String,
    },
    isTraveler : { type : String, default : true},
    proofOfAddress: {
      type: String
    },
    RIB: {
      type: String
    },
    reviewAva : {
      type : Number,
      default : 0
    },
    reviewInt : {
      type : Number,
      default : 0
    },
    phone: { type: String, required: true },
    subscription: { type: Boolean, default: false },
    role: {
      type: String,
      enum: ["admin", "user", "super_admin"],
      default: "user",
    },
    referCode : {
      type : String,
      unique : true,
    },
    hasCompletedFirstTransaction : {type : Boolean, default : false},
    referredBy : { type: Schema.Types.ObjectId, ref: 'User' },
    sellKgId : { type: Schema.Types.ObjectId, ref: 'Route' },
    isBlocked: { type: Boolean, default: false }, // Added field
    isverified: { type: Boolean, default: false }, // Added field
    isSuspend: { type: Boolean, default: false }, // Added field
    isTwentyPercent: { type: Boolean },
    isSubscription : {type : Boolean},
  },
  {
    timestamps: true,
  }
);

const UserModel = model<TUser>('User', UserSchema);

export default UserModel;