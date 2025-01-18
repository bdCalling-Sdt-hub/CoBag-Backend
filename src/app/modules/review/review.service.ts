import { TReview } from "./review.interface";
import ReviewModel from "./review.model";


const createReviewIntoDB = async(payload : TReview) => {
    try {
        const result = await ReviewModel.create(payload);
        if (!result) {
            throw new Error("Review Not Created");
        }
        return result
    } catch (error) {
        return error
    }
}

const getAllReviewFromDB = async() => {
    try {
        const result = await ReviewModel.find({});
        if (!result) {
            throw new Error("Didn't Get any Review");
        }
        return result
    } catch (error) {
        return error
    }
}


const updateReviewIntoDB = async (id : string, payload : Partial<TReview>) => {
    try {
        const result = await ReviewModel.findByIdAndUpdate(id, payload, {new : true});
        if (!result) {
            throw new Error("Didn't Update Review successfully");
        }
        return result
    } catch (error) {
        return error
    }
}


const reviewAvaregeForSingleUserFromDB = async (id: string) => {
    try {
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
    } catch (error) {
        // Handle any errors
        throw new Error('Error calculating average rating');
    }
};



const deleteReview = async(id : string) => {
    try {
        const result = await ReviewModel.findByIdAndDelete(id)
        if (!result) {
            throw new Error("This Review Is Not Deleted");
        }
        return result
    } catch (error) {
        return error
    }
}

const getReviewByIdFromDB = async (id: string) => {
    try {
        // Use findById to query by MongoDB ObjectId
        const result = await ReviewModel.findById(id);

        if (!result) {
            throw new Error("Didn't Find Any Review");
        }

        return result;
    } catch (error) {
        throw new Error( "An error occurred while retrieving the review.");
    }
};


export const reviewSercive = {
    createReviewIntoDB,
    getAllReviewFromDB,
    updateReviewIntoDB,
    deleteReview,
    reviewAvaregeForSingleUserFromDB,  
    getReviewByIdFromDB
}