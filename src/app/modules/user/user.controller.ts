/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { TUser } from './user.interface';
import { userService } from './user.service';
import { NextFunction, Request, Response } from 'express';
import UserModel from './user.model';
import AppError from '../../errors/AppError';
import { error } from 'console';

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userData = req.body;
    // console.log("controller")


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

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = userService.getAllUserFromDB();
    if (!result) {
      throw new Error("Didn't Find Any User");
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Get All User successfully',
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const getOneUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const result = await userService.getOneUserByIdFromDB(id);
    if (!result) {
      throw new Error("Get a Single User");
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User Get successfully',
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const payload = req.body;
    const files = req.files as {
      profileImage?: { filename: string }[];
      ethanDocuments?: { filename: string }[];
      proofOfAddress?: { filename: string }[];
      RIB?: { filename: string }[];
    };

    if (files?.profileImage && files.profileImage[0]?.filename) {
      payload.profileImage = `/uploads/users/${files.profileImage[0].filename}`;
    }

    if (files?.ethanDocuments && files.ethanDocuments[0]?.filename) {
      payload.ethanDocuments = `/uploads/users/${files.ethanDocuments[0].filename}`;
    }

    if (files?.proofOfAddress && files.proofOfAddress[0]?.filename) {
      payload.proofOfAddress = `/uploads/users/${files.proofOfAddress[0].filename}`;
    }

    if (files?.RIB && files.RIB[0]?.filename) {
      payload.RIB = `/uploads/users/${files.RIB[0].filename}`;
    }
    const result = await userService.updateUserFromDB(id, payload);
    if (!result) {
      throw new Error("Update Unsuccessful");
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Update User successfully',
      data: result
    });
  } catch (error) {
    return error
  }
}

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body);
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
  }
  // console.log(user)
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

const blockUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await userService.blockUserfromDB(id)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User Blocked successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}
const suspendUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const result = await userService.suspendUserfromDB(id)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "User Blocked successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.params;
    const payload = req.body;
    const result = await userService.forgetPasswordFromDB(payload, email)
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "password Update successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const result = await userService.resetPasswordFromDB(payload, id);
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "password Reset successfully",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

const makeAdmin = async (req : Request, res : Response, next : NextFunction) => {
  try {
    const payload = req.body;
    const result = await userService.makeAdminFromDB(payload)
    if (!result) {
      throw new Error("Make Admin Failed");
    }
    res.status(200).json({
      statusCode: 200,
      success: true,
      message: "Make Admin successfully Done",
      data: result
    });
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
  loginUser,
  getAllUser,
  updateUser,
  logout,
  blockUser,
  suspendUser,
  forgetPassword,
  resetPassword,
  getOneUser,
  makeAdmin
};
