import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { searchRouteValidation } from './sendKg.Validation';
import { sendKgController } from './sendKg.controller';


const router = express.Router();

router.post(
  '/create',
  validateRequest(searchRouteValidation.CreateSearchRouteValidationSchema),
  sendKgController.createSendKg
);

router.patch(
  '/update/:id',
  validateRequest(searchRouteValidation.UpdateSearchRouteValidationSchema),
  sendKgController.updateSendKg
);

export const sendKgRouter = router;
