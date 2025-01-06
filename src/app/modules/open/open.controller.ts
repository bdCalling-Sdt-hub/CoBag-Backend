/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const open = async (req : Request, res :Response, next: NextFunction) =>{
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "hello world!",
      });
}

export const openController = {
    open
} 