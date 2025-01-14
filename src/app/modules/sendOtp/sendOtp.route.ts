import { Router } from 'express';
import { sendOtpController, verifyOtpController } from './sendOtp.controller';

const router = Router();

router.post('/otp', sendOtpController);
router.post('/verify', verifyOtpController);

export const otpRoute = router;