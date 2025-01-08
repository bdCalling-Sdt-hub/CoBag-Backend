import {  TSendKg } from "./sendKg.interface"
import SendKgModel from "./sendKg.model"

const createSendKgIntoDB = async(payload : TSendKg) => {
    try {
        const result = await SendKgModel.create(payload);
        if (!result) {
            throw new Error("Send KG Post Create Unsuccessfully");
        }
        return result;
    } catch (error) {
       return error 
    }
}

const updateSendKgIntoDB = async(payload : Partial<TSendKg>, id : string) => {
    try {
        const result = await SendKgModel.findByIdAndUpdate(id, {payload}, {new : true})
        if (!result) {
            throw new Error("Update Error Send KG Route  ");
        }
        return result
    } catch (error) {
        return error
    }
}



export const sendKgService = {
    createSendKgIntoDB,
    updateSendKgIntoDB
} 
