import { TPromoCode } from "./promoCode.interface"
import PromoCodeModel from "./promoCode.model"


const createPromoCodeFromDB = async (payload : TPromoCode) => {
    try {
        const result = await PromoCodeModel.create(payload);
        if (!result) {
            throw new Error("Promo Code not Created");
        }
        return result;
    } catch (error) {
        return error
    }
}

const getAllPromoCodeFromDB = async () => {
    try {
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
    } catch (error) {
      console.error("Error in getAllPromoCodeFromDB:", error);
      throw new Error("Failed to fetch promo codes.");
    }
  };
  
const updatePromoCode = async( id : string, payload : TPromoCode) => {
    try {
        const result = await PromoCodeModel.findByIdAndUpdate(id, payload, {new : true});
        if (!result) {
            throw new Error("Update Unsuccessful");
        }
        return result;
    } catch (error) {
        return error
    }
}
export const promoCodeService = {
    createPromoCodeFromDB,
    getAllPromoCodeFromDB,
    updatePromoCode,
} 