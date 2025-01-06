/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TUser } from './user.interface';
import { userService } from './user.service';
import { NextFunction, Request, Response } from 'express'; 
import UserModel from './user.model';
import AppError from '../../errors/AppError';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userData = req.body;
        console.log("controller")
        

        const result = await userService.createUserIntoDB(userData);

        if (!result) {
            throw new Error("User not created successfully");
        }

        const modifiedResult: Partial<TUser> = {
            _id: result?._id,  
            firstName: result?.firstName,
            lastName: result?.lastName,
            email: result?.email,
            phone: result?.phone,
            role: result?.role,
            createdAt: result?.createdAt,
            updatedAt: result?.updatedAt
          };

        res.status(201).json({
            success: true,
            statusCode: 201,
            message: 'User registered successfully',
            data: modifiedResult
        });
    } catch (error) {
        next(error); 
    }
};

const loginUser = catchAsync(async (req, res) => {
    console.log(req.body)
    const result = await userService.loginUser(req.body);
    const {email} = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    console.log(user)
    const accessToken = result;
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      token: accessToken,
      data: user
    });
  
  });

  const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie('authToken', { httpOnly: true, secure: true });
      res.status(200).json({
        statusCode: 200,
        success: true,
        message: "User logged out successfully",
      });
    } catch (error) {
      next(error)
    }
  }
export const userController = {
    createUser,
    loginUser, 
    logout
};
