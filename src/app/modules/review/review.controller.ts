import { NextFunction, Request, Response } from "express";
import { reviewSercive } from "./review.service";


const createReview = async (req : Request, res: Response, next : NextFunction) => {
    try {
        const payload = req.body;
        const result = await reviewSercive.createReviewIntoDB(payload);
        if (!result) {
           throw new Error("Review Not Created");
        }
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'Review Created Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getAllReview = async (req : Request, res : Response, next : NextFunction) => {
 try {
    const result = await reviewSercive.getAllReviewFromDB();
    if (!result) {
        throw new Error("Didn't Get Any Data");
    }
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Review retrive Successfully',
        data: result
    });
 } catch (error) {
    next(error)
 }
}

const updateReview = async(req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params;
        const payload = req.body
        const result = await reviewSercive.updateReviewIntoDB(id, payload)
        if (!result) {
            throw new Error("Didn't Update This Review");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Review Update Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const reviewAvaregeForSingleUser = async(req: Request, res : Response, next : NextFunction ) => {
    try {
        const  {id} = req.params;
        const result = await reviewSercive.reviewAvaregeForSingleUserFromDB(id);
        if (!result) {
            throw new Error("Didnt Get Proper Data");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Review Avarege Get Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const deleteReview = async ( req : Request, res : Response, next : NextFunction) => {
    try {
        const {id} = req.params
        const result = await reviewSercive.deleteReview(id)
        if (!result) {
            throw new Error("Review Is't Delete Successfuly");
        }
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: 'Review Created Successfully',
            data: result
        });
    } catch (error) {
        next(error)
    }
}

const getReviewById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        // Fetch the review by ID
        const result = await reviewSercive.getReviewByIdFromDB(id);

        if (!result) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No Review Found",
            });
        }

        // Respond with the result
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Review Retrieved Successfully",
            data: result,
        });
    } catch (error) {
        // Pass the error to the next middleware
        next(error);
    }
};

export const reviewController = {
    createReview,
    getAllReview,
    updateReview,
    reviewAvaregeForSingleUser,
    deleteReview,
    getReviewById

}