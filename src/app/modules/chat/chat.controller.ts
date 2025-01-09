import { NextFunction, Request, Response } from "express";
import { chatService } from "./chat.service";


const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        console.log(payload)
        // Save message to DB
        const message = await chatService.createMessageFromBD(payload)
        const eventName = "new-message"
        const messageEvent = `${eventName}::${payload.receiverId}`

        // Emit event to Socket.IO
        // @ts-ignore
        io.emit(messageEvent, {
            success: true,
            statusCode: 200,
            message: 'Message sent successfully',
            data: message
        })

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Message sent successfully',
            data: message
        });
    } catch (error) {
        next(error)
    }
};


const getMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId1, userId2 } = req.params;

        const message = await chatService.getUserSeparateMessageFromDB(userId1, userId2);

        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "This User's all message  Successfully",
            data: message
        });
    } catch (error) {
        next(error)
    }
};

export const chatController = {
    createMessage,
    getMessage
}