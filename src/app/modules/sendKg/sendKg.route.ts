import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { searchRouteValidation } from './sendKg.Validation';
import { sendKgController } from './sendKg.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';


const router = express.Router();

router.post(
  '/create',
  auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
  validateRequest(searchRouteValidation.CreateSearchRouteValidationSchema),
  sendKgController.createSendKg
);

router.patch(
  '/update/:id',
  auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
  validateRequest(searchRouteValidation.UpdateSearchRouteValidationSchema),
  sendKgController.updateSendKg
);

export const sendKgRouter = router;
