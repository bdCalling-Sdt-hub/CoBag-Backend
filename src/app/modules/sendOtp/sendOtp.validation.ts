import { z } from 'zod';

export const sendOtpSchema = z.object({
    body : z.object({
        phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    })
});

export const verifyOtpSchema = z.object({
    body : z.object({
        phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
        otp: z.string().length(6, 'OTP must be 6 digits'),
    })
});