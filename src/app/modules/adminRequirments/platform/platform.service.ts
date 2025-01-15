import { TPlatform } from "./platform.interface"
import PlatformModel from "./platform.model"


const createPlatformIntoDB = async(payload : TPlatform) => {
    try {
        const result = await PlatformModel.create(payload);
        if (!result) {
            throw new Error("Something Went Wrong");
        }
        return result
    } catch (error) {
        return error
    }
}


const  getAllDataFromDB = async() => {
    try {
        const result = await PlatformModel.find({});
        if (!result) {
            throw new Error("Didn't Get All Data From DB");
        }
        return result
    } catch (error) {
        return error
    }
}


const updatePlatfromFromDB = async(payload : TPlatform) => {
    try {
        const result = await PlatformModel.findOneAndUpdate({},{ $set:  payload }, {new : true})
        if (!result) {
            throw new Error("Update Unsuccessful ");
        }
        return result;
    } catch (error) {
       return error 
    }
}  
export const platformService = {
    createPlatformIntoDB,
    getAllDataFromDB,
    updatePlatfromFromDB
}
