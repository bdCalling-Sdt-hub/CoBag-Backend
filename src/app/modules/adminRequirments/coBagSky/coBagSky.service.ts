import { TSubscription } from "./coBagSky.interface"
import SubscriptionModel from "./coBagSky.model"


const createSubscription = async (payload: TSubscription) => {

    const result = await SubscriptionModel.create(payload);
    if (!result) {
        throw new Error("Subscription Create Failled");
    }
    return result;

}

const getAllSubscriptionFromDB = async () => {

    const result = await SubscriptionModel.find({});
    if (!result) {
        throw new Error("Didn't Find Any Subcription");
    }
    return result;

}
const updateSubscriptionFromDB = async (id: string, payload: Partial<TSubscription>) => {

    const result = SubscriptionModel.findByIdAndUpdate(id, payload, { new: true })
    if (!result) {
        throw new Error("Update Unsuccessful");
    }
    return result

}

const deleteSubscriptionFromDB = async (id: string) => {

    const result = await SubscriptionModel.findByIdAndDelete(id)
    if (!result) {
        throw new Error("Subscription Not Delete Succcessfuly");
    }
    return result
}

const getOneSubscriptionFromDB = async (id: string) => {
    const result = await SubscriptionModel.findById(id);
    return result;
} 
export const coBagSkyService = {
    createSubscription,
    getAllSubscriptionFromDB,
    updateSubscriptionFromDB,
    deleteSubscriptionFromDB,
    getOneSubscriptionFromDB
}