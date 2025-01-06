import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';


const UserSchema: Schema = new Schema(
    {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      phone: { type: String, required: true },
      subscription: { type: Boolean, default: false },
      role: {
        type: String,
        enum: ["admin", "user", "super_admin"],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  );





const UserModel = model<TUser>('User', UserSchema);

export default UserModel;
