import exoress from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { reviewValidation } from './review.validation';
import { reviewController } from './review.controller';


const router = exoress.Router()

router.post(
    "/create",
    validateRequest(reviewValidation.ReviewValidationSchema),
    reviewController.createReview
)
router.patch(
    "/update/:id",
    validateRequest(reviewValidation.UpdateReviewValidationSchema),
    reviewController.updateReview
)
router.delete(
    "/delete/:id",
    reviewController.deleteReview
)
router.get(
    "/read",
    reviewController.getAllReview
)
router.get(
    "/read/:id",
    reviewController.getReviewById
)
router.get(
    "/avarege/:id",
    reviewController.reviewAvaregeForSingleUser
)


export const reviewRouter = router;