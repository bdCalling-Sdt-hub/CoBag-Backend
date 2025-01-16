import { TSubscription } from "./coBagSky.interface"
import SubscriptionModel from "./coBagSky.model"


const createSubscription = async (payload : TSubscription) => {
    try {
        const result = await SubscriptionModel.create(payload);
        if (!result) {
            throw new Error("Subscription Create Failled");
        }
        return result;
    } catch (error) {
        return error
    }
}

const getAllSubscriptionFromDB = async () => {
    try {
        const result = await SubscriptionModel.find({});
        if (!result) {
            throw new Error("Didn't Find Any Subcription");
        }
        return result;
    } catch (error) {
        return error
    }
}
const updateSubscriptionFromDB = async(id : string ,payload : Partial<TSubscription>) => {
    try {
        const result = SubscriptionModel.findByIdAndUpdate(id , payload, {new : true})
        if (!result) {
            throw new Error("Update Unsuccessful");
        }
        return result
    } catch (error) {
        return error
    }
}

const deleteSubscriptionFromDB = async (id  : string) => {
    try {
        const result = await SubscriptionModel.findByIdAndDelete(id)
        if (!result) {
            throw new Error("Subscription Not Delete Succcessfuly");
        }
        return result
    } catch (error) {
        return error
    }
}
export const coBagSkyService = {
    createSubscription,
    getAllSubscriptionFromDB,
    updateSubscriptionFromDB,
    deleteSubscriptionFromDB
}