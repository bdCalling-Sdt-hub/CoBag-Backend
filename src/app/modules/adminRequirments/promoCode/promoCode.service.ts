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

const getAllPromoCodeFromDB = async() => {
    try {
        const result = await PromoCodeModel.find({});
        if (!result) {
            throw new Error("No Promo Code Exiest");
        }
        return result
    } catch (error) {
        return error
    }
}


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