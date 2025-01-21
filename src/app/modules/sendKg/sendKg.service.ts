import {  TSendKg } from "./sendKg.interface"
import SendKgModel from "./sendKg.model"

const createSendKgIntoDB = async(payload : TSendKg) => {
    
        const result = await SendKgModel.create(payload);
        if (!result) {
            throw new Error("Send KG Post Create Unsuccessfully");
        }
        return result;
  
}

const updateSendKgIntoDB = async(payload : Partial<TSendKg>, id : string) => {
   
        const result = await SendKgModel.findByIdAndUpdate(id, {payload}, {new : true})
        if (!result) {
            throw new Error("Update Error Send KG Route  ");
        }
        return result
   
}



export const sendKgService = {
    createSendKgIntoDB,
    updateSendKgIntoDB
} 
