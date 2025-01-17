import { TGeneral } from "./general.interface";
import GeneralModel from "./general.model";


const createGeneralFromDB = async(payload : TGeneral) => {
    try {
        const result = await GeneralModel.create(payload)
        if (!result) {
            throw new Error("Genarel Data not Created");
        }
        return result;
    } catch (error) {
        return error
    }
}
const updateGeneralFromDB = async (payload: Partial<TGeneral>) => {
    try {
        // Update the first document in the collection
        const result = await GeneralModel.findOneAndUpdate({},{ $set:  payload }, {new : true})
        if (!result) {
            throw new Error("General data not found or not updated.");
        }
        return result;
    } catch (error) {
        throw new Error("An error occurred while updating general data.");
    }
};


const getGeneralDataFromDb = async () => {
    try {
        const result = await GeneralModel.find({})
        if (!result) {
            throw new Error("Didn't Get Any Data");
        }
        return result
    } catch (error) {
        return error
    }
}
 
export const generalService = {
    createGeneralFromDB,
    updateGeneralFromDB,
    getGeneralDataFromDb
}