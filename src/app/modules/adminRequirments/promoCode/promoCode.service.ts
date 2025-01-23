import { TPromoCode } from "./promoCode.interface"
import PromoCodeModel from "./promoCode.model"


const createPromoCodeFromDB = async (payload : TPromoCode) => {
  // Take current date
  const currentDate = new Date();

  // Check if expirationDate is provided in payload
  if (payload.expirationDate && new Date(payload.expirationDate) < currentDate) {
      // If the expiration date is in the past, set isActive to false
      payload.isActive = false;
  } else {
      // Otherwise, ensure isActive is true by default
      payload.isActive = payload.isActive !== undefined ? payload.isActive : true;
  }

  // Create the promo code in the database
  const result = await PromoCodeModel.create(payload);
  if (!result) {
      throw new Error("Promo Code not Created");
  }

  return result;
};


const getAllPromoCodeFromDB = async () => {
    
      const currentDate = new Date();
  
      // Find and update expired promo codes in a single query
      await PromoCodeModel.updateMany(
        { expirationDate: { $lt: currentDate }, isActive: true },
        { isActive: false }
      );
  
      // Fetch only active promo codes
      const activePromoCodes = await PromoCodeModel.find({});
  
      if (!activePromoCodes || activePromoCodes.length === 0) {
        throw new Error("No active promo codes exist.");
      }
  
      return activePromoCodes;
   
  };
  
const updatePromoCode = async( id : string, payload : TPromoCode) => {
   
        const result = await PromoCodeModel.findByIdAndUpdate(id, payload, {new : true});
        if (!result) {
            throw new Error("Update Unsuccessful");
        }
        return result;
    
}
export const promoCodeService = {
    createPromoCodeFromDB,
    getAllPromoCodeFromDB,
    updatePromoCode,
} 