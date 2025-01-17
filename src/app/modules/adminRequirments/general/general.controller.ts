import { NextFunction, Request, Response } from 'express';
import { generalService } from './general.service';

const createGeneral = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const payload = req.body
        console.log(req.file)
        if (req.file) {
            payload.PlatformLogo = `/uploads/PlatformLogo/${req.file.filename}`;
          }
        const result = await generalService.createGeneralFromDB(payload);
        res.status(201).json({
            success: true,
            message: 'Search route created successfully',
            data: result,
          });
    } catch (error) {
        next(error)
    }
}


const updateGeneral = async (req: Request, res: Response, next : NextFunction) => {
    try {
        const payload = req.body
        console.log(req.file)
        if (req.file) {
            
            payload.PlatformLogo = `/uploads/PlatformLogo/${req.file.filename}`;
          }
        const result = await generalService.updateGeneralFromDB(payload)
        if (!result) {
            return res.status(404).send({ error: 'General configuration not found' });
        }
        res.status(200).json({
            success: true,
            message: 'General Update successfully',
            data: result,
          });
    } catch (error) {
        next(error)
    }
}

const getGeneralData = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const result = await generalService.getGeneralDataFromDb();
        if (!result) {
            throw new Error("Didn't Get General Data ");
        }
        res.status(200).json({
            success: true,
            message: 'General Data Get successfully',
            data: result,
          });
    } catch (error) {
        next(error)
    }
}

export const generalController = {
    createGeneral,
    updateGeneral,
    getGeneralData
} 
