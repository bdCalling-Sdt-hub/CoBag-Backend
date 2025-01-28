import { NextFunction, Request, Response } from "express";
import { promoCodeService } from "./promoCode.service";



const createPromoCode = async ( req: Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body;
        const result = await promoCodeService.createPromoCodeFromDB(payload);
        if (!result) {
            throw new Error("Promp Code Not Created Successfuly");
        }
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Promp Code Created successfully',
            data: result
          });
    } catch (error) {
        next()
    }
}

const getAllPromoCode = async (req: Request, res : Response, next : NextFunction) => {
    try {
        const result = await promoCodeService.getAllPromoCodeFromDB();
        if (!result) {
            throw new Error("No Result Found");   
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Promp Code Retrive successfully',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const updateProme = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body
        const {id} = req.params
        const result = await promoCodeService.updatePromoCode(id, payload);
        if (!result) {
            throw new Error("Update Not perform");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'update successfully Done',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

const getOnePromoCode = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const result = await promoCodeService.getOnePromoCodeFromDB(id);
        if (!result) {
            throw new Error("Update Not perform");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'update successfully Done',
            data: result
          });
    } catch (error) {
        next(error)
    }
}

export const promoCodeController = {
    createPromoCode,
    getAllPromoCode,
    updateProme,
    getOnePromoCode
}