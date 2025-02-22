import { NextFunction, Request, Response } from "express";
import { chatService } from "./chat.service";


const createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        // Validate payload
        if (!payload.senderId || !payload.receiverId || !payload.text) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: 'Invalid payload',
            });
        }

        // Save message to DB
        const message = await chatService.createMessageFromBD(payload);
        if (!message) {
            throw new Error("Message was not sent");
        }

        const eventName = "new-message";
        const messageEvent = `${eventName}::${payload.receiverId}`;

        // Emit event to Socket.IO
         // @ts-ignore
        io.emit(messageEvent, {
            success: true,
            statusCode: 200,
            message: 'Message sent successfully',
            data: message,
        });

        // Emit notification to the receiver
        const receiverSocketId = payload.receiverId;
        const eventNameNotification = "new-notifiaction";
        const notificationEvent = `${eventNameNotification}::${receiverSocketId}`;
         // @ts-ignore
        io.emit(notificationEvent, {
            from: payload.senderId,
            message,
            timestamp: new Date().toISOString(),
        });

        // Respond to the client
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Message sent successfully',
            data: message,
        });
    } catch (error) {
        console.error("Error creating message:", error); // Log the error for debugging
        next(error); // Pass the error to the error-handling middleware
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