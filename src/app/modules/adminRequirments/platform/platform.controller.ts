import { NextFunction, Request, Response } from "express";
import { platformService } from "./platform.service";


const createPlatform = async(req : Request, res: Response, next : NextFunction) => {
    try {
        const payload = req.body;
        console.log("payload" ,payload)
        const result = await platformService.createPlatformIntoDB(payload);
        if (!result) {
            throw new Error("Something went wrong from DB");
        }
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Platform created successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const getAllPlatformData = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result =  await platformService.getAllDataFromDB();
        if (!result) {
            throw new Error("Didn't get data from DB");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Data Retrive Successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const updatePlatform = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body;
        const result = await platformService.updatePlatfromFromDB(payload);
        if (!result) {
            throw new Error("Update Not Occure");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update Successfully Done',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

export const platformController = {
    createPlatform,
    getAllPlatformData,
    updatePlatform
}