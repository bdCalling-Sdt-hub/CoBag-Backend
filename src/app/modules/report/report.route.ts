import express from 'express';
import { reportController } from './report.controller';
import validateRequest from '../../middlewares/validateRequest';
import { reportValidation } from './report.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
    '/create',
    auth( USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
    validateRequest(reportValidation.reportSchema),
    reportController.createReport
)

router.get(
    '/read',
    auth( USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
    reportController.getAllReport
)

router.get(
    '/read/:id',
    auth( USER_ROLE.user, USER_ROLE.admin, USER_ROLE.super_admin),
    reportController.getOneReport
)

router.patch(
    '/update/:id',
    auth( USER_ROLE.user, USER_ROLE.admin),
    validateRequest(reportValidation.reportSchema),
    reportController.updateReport
)

router.delete(
    '/delete/:id',
    auth( USER_ROLE.user, USER_ROLE.admin),
    reportController.deleteReport
)
export const reportRoutes = router