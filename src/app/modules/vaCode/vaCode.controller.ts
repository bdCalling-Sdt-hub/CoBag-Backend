import { NextFunction, Request, Response } from "express";
import { VaCodeService } from "./vaCode.service";
import AppError from "../../errors/AppError";
import { HttpStatusCode } from "axios";


const sendVerification = async(req : Request, res : Response, next : NextFunction) => {
    try {
        let email;
        if (req.body) {
             email = req.body
        } else if (req.params) {
             email = req.params;
        }
        // console.log("controller")
        
        const result = VaCodeService.sendVerificationFromDB(email);
        if (!result) {
            throw new Error("Something went wrong");
        }
        res.status(200).json({
            success: true,
            statusCode: 201,
            message: 'email sent',
            data: result
        });
    } catch (error) {
        next()
    }
}

const verifyController = async (req : Request, res : Response, next : NextFunction) => {
    try {
        const code = req.body;
        console.log("controller",code)
        const result = await VaCodeService.verifyFromDB(code);
        if (!result) {
            throw new AppError(HttpStatusCode.NotAcceptable, 'Failed to Send Code')
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'valid user',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

export const VaCodeController = {
    sendVerification,
    verifyController
}