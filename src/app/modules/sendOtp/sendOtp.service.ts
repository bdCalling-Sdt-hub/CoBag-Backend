import twilio from 'twilio';
import AppError from '../../errors/AppError';
import { HttpStatusCode } from 'axios';

const accountSid = process.env.TWILIO_ACCOUNT_SID || '';
const authToken = process.env.TWILIO_AUTH_TOKEN || '';
const serviceSid = process.env.TWILIO_SERVICE_SID || '';
const client = twilio(accountSid, authToken);

export class OtpService {
    async sendOtp(phoneNumber: string): Promise<void> {
        console.log(phoneNumber)
        try {
            await client.verify.services(serviceSid).verifications.create({
                to: phoneNumber,
                channel: 'sms',
            });
        } catch (error: any) {
            console.error('Twilio sendOtp error:', error); // Log the Twilio error
            throw new Error(`Failed to send OTP: ${error.message || error}`);
        }
    }

    async verifyOtp(phoneNumber: string, otp: string): Promise<boolean> {
        try {
            const verificationCheck = await client.verify.services(serviceSid).verificationChecks.create({
                to: phoneNumber,
                code: otp,
            });

            if (verificationCheck.status === 'approved') {
                return true;
            } else {
                throw new AppError(HttpStatusCode.NotAcceptable, 'Failed to create user');
            }
        } catch (error: any) {
            console.error('Twilio verifyOtp error:', error); // Log the Twilio error
            throw new Error(`Failed to verify OTP: ${error.message || error}`);
        }
    }
}
