import { NextFunction, Request, Response } from "express";
import { sellKgService } from "./sellKG.service";
import { TRoute } from "./sellKG.interface";


const createSell = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body;
        if (req.file) {
            payload.profileImage = `/uploads/ticket/${req.file.filename}`;
          }
        console.log(req.file);
        const result = await sellKgService.createSellFromDB( req.body);
        if (!result) {
            throw new Error("User Not Created Successfully");
        }
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Sell Kg Created Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllSellKg = async(req : Request, res : Response, next : NextFunction) =>{
    try {
        const result = await sellKgService.getAllSellKgFromDB()
        if (!result) {
            throw new Error("No Data Avilable");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Sell Kg Created Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const updateSellKg = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body
        const id = req.params
        const result = await sellKgService.updateSellKgFromDB(id, payload);
        if (!result) {
            throw new Error("Failled to Update in DB");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Update Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const deleteFromDB = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params;
        const result = await sellKgService.deleteSellFromDB(id) 
        if (!result) {
            throw new Error("Sell Post Not Delete Successfuly");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Deleted Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const searchRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const result = await sellKgService.searchRouteFromDB(payload);
      if (!result) {
        throw new Error("Route Not Found");
      }
      res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Search Result',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
  

const availableForCourier = async (req  : Request, res : Response, next : NextFunction) => {
    try {
        const payload = req.body;
        const result = await sellKgService.getAvailableForCourier(payload)
        if (!result) {
            throw new Error("No Route Found");
        }  
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Search Result Found',
            data: result
        });
    } catch (error) {
        next(error)
    }
} 
export const  sellKgController = {
    createSell,
    getAllSellKg,
    updateSellKg,
    deleteFromDB,
    searchRoute,
    availableForCourier
} 