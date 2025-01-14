// 6. controllers/otpController.ts - Define the controllers
import { Request, Response } from 'express';
import { OtpService } from './sendOtp.service';

const otpService = new OtpService();

export const sendOtpController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const number = data.phoneNumber;
        const result = await otpService.sendOtp(number);
        res.status(200).json({ message: 'OTP sent successfully', result });
    } catch (error: any) {
        console.error('Error in sendOtpController:', error); // Log the error
        res.status(400).json({ error: error.message || 'Failed to send OTP' });
    }
};

export const verifyOtpController = async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const result = await otpService.verifyOtp(data.phoneNumber, data.otp);
        res.status(200).json({ message: 'OTP verified successfully', result });
    } catch (error: any) {
        console.error('Error in verifyOtpController:', error); // Log the error
        res.status(400).json({ error: error.message || 'Failed to verify OTP' });
    }
};

