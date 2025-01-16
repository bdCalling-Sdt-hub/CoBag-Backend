import mongoose, { Schema } from "mongoose";
import { TPromoCode } from "./promoCode.interface";

const PromoCodeSchema: Schema = new Schema({
    name: { type: String, required: true },
    promoCode: { type: String, required: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 },
    usageLimitPerUser: { type: Number, required: true, min: 1 },
    isActive: { type: Boolean , default : true},
    expirationDate: { type: Date, required: true },
  });
  
  const PromoCodeModel = mongoose.model<TPromoCode>('PromoCode', PromoCodeSchema);
  
  export default PromoCodeModel;