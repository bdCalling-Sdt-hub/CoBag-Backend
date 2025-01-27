import { NextFunction, Request, Response } from "express";
import { coBagSkyService } from "./coBagSky.service";
import catchAsync from "../../../utils/catchAsync";


const createSubscription = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body;
        const result = await coBagSkyService.createSubscription(payload);
        if (!result) {
            throw new Error("Subscription Didn't Created");
        }       
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const  getAllData = async (req  :Request, res: Response, next : NextFunction) => {
    try {
        const result = await coBagSkyService.getAllSubscriptionFromDB();
        if (!result) {
            throw new Error("Didn't Find Any Subscription");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Retrive All Subscription successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const updateSubscription  = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body
        const {id} = req.params;
        const result = await coBagSkyService.updateSubscriptionFromDB(id, payload);
        if (!result) {
            throw new Error("Didn't Update Subscriptiopn");
        } 
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update subsription successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const deleteSubscription = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params 
        const result = await coBagSkyService.deleteSubscriptionFromDB(id);
        if (!result) {
            throw new Error("Subscription Not Deleted Successfuly");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update subsription successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const getOneSubscription = catchAsync(async (req : Request, res : Response, next : NextFunction) => {
    const {id} = req.params;
    const result = await coBagSkyService.getOneSubscriptionFromDB(id);
    if (!result) {
        throw new Error("Subscription Not Deleted Successfuly");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Update subscription successfully',
        data: result
      });
})

 export const coBagController = {
    createSubscription,
    getAllData,
    updateSubscription,
    deleteSubscription,
    getOneSubscription
}

