import express from 'express';
import { generalValidation } from './general.validation';
import validateRequest from '../../../middlewares/validateRequest';
import { generalController } from './general.controller';
import fileUploadHandler from '../../../middlewares/fileUploadHandler';
import { USER_ROLE } from '../../user/user.constant';
import auth from '../../../middlewares/auth';

const router = express.Router();
const UPLOADS_FOLDER = 'uploads/logo';
const upload = fileUploadHandler(UPLOADS_FOLDER);
router.post(
  '/create',
  auth( USER_ROLE.admin, USER_ROLE.super_admin),
  upload.single('PlatformLogo'),
  validateRequest(generalValidation.CreateGeneralValidationSchema),
  generalController.createGeneral
);

router.patch(
  '/update',
  auth( USER_ROLE.admin,  USER_ROLE.super_admin),
  upload.single('PlatformLogo'),
  validateRequest(generalValidation.UpdateGeneralValidationSchema),
  generalController.updateGeneral
);

router.get(
    '/read',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.super_admin),
    generalController.getGeneralData
)

export const generalRouter = router;
