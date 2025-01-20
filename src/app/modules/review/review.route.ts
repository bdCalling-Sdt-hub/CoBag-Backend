import exoress from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';
import { reviewController } from './review.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = exoress.Router()

router.post(
    "/create",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    validateRequest(reviewValidation.ReviewValidationSchema),
    reviewController.createReview
)
router.patch(
    "/update/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    validateRequest(reviewValidation.UpdateReviewValidationSchema),
    reviewController.updateReview
)
router.delete(
    "/delete/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    reviewController.deleteReview
)
router.get(
    "/read",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    reviewController.getAllReview
)
router.get(
    "/read/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    reviewController.getReviewById
)
router.get(
    "/avarege/:id",
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    reviewController.reviewAvaregeForSingleUser
)


export const reviewRouter = router;