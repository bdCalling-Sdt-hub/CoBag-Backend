import { TReview } from "./review.interface";
import ReviewModel from "./review.model";


const createReviewIntoDB = async (payload: TReview) => {

    const result = await ReviewModel.create(payload);
    if (!result) {
        throw new Error("Review Not Created");
    }
    return result

}

const getAllReviewFromDB = async () => {

    const result = await ReviewModel.find({});
    if (!result) {
        throw new Error("Didn't Get any Review");
    }
    return result

}


const updateReviewIntoDB = async (id: string, payload: Partial<TReview>) => {

    const result = await ReviewModel.findByIdAndUpdate(id, payload, { new: true });
    if (!result) {
        throw new Error("Didn't Update Review successfully");
    }
    return result

}


const reviewAvaregeForSingleUserFromDB = async (id: string) => {

    // Find all reviews for the given receiverId
    const reviews = await ReviewModel.find({ receiverId: id });

    // If no reviews are found, return an appropriate message or value
    if (reviews.length === 0) {
        return { message: 'No reviews found for this user', averageRating: 0 };
    }

    // Calculate the average rating
    const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
    const averageRating = totalRatings / reviews.length;

    // Return the average rating
    return { averageRating };

};



const deleteReview = async (id: string) => {

    const result = await ReviewModel.findByIdAndDelete(id)
    if (!result) {
        throw new Error("This Review Is Not Deleted");
    }
    return result

}

const getReviewByIdFromDB = async (id: string) => {

    // Use findById to query by MongoDB ObjectId
    const result = await ReviewModel.findById(id);

    if (!result) {
        throw new Error("Didn't Find Any Review");
    }

    return result;

};


export const reviewSercive = {
    createReviewIntoDB,
    getAllReviewFromDB,
    updateReviewIntoDB,
    deleteReview,
    reviewAvaregeForSingleUserFromDB,
    getReviewByIdFromDB
}