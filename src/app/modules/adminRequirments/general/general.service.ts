import { TGeneral } from "./general.interface";
import GeneralModel from "./general.model";


const createGeneralFromDB = async(payload : TGeneral) => {
    
        const result = await GeneralModel.create(payload)
        if (!result) {
            throw new Error("Genarel Data not Created");
        }
        return result;
   
}
const updateGeneralFromDB = async (payload: Partial<TGeneral>) => {
  
        // Update the first document in the collection
        const result = await GeneralModel.findOneAndUpdate({},{ $set:  payload }, {new : true})
        if (!result) {
            throw new Error("General data not found or not updated.");
        }
        return result;
    
};


const getGeneralDataFromDb = async () => {
    
        const result = await GeneralModel.find({})
        if (!result) {
            throw new Error("Didn't Get Any Data");
        }
        return result
    
}
 
export const generalService = {
    createGeneralFromDB,
    updateGeneralFromDB,
    getGeneralDataFromDb
}