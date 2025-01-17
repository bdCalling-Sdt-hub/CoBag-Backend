import express from 'express';
import { generalValidation } from './general.validation';
import validateRequest from '../../../middlewares/validateRequest';
import { generalController } from './general.controller';
import fileUploadHandler from '../../../middlewares/fileUploadHandler';

const router = express.Router();
const UPLOADS_FOLDER = 'uploads/logo';
const upload = fileUploadHandler(UPLOADS_FOLDER);
router.post(
  '/create',
  upload.single('PlatformLogo'),
  validateRequest(generalValidation.CreateGeneralValidationSchema),
  generalController.createGeneral
);

router.patch(
  '/update',
  upload.single('PlatformLogo'),
  validateRequest(generalValidation.UpdateGeneralValidationSchema),
  generalController.updateGeneral
);

router.get(
    '/read',
    generalController.getGeneralData
)

export const generalRouter = router;
