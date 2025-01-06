import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import catchAsync from '../utils/catchAsync';
import UserModel from '../modules/user/user.model';
import { TUserRole } from '../modules/user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const rawToken = req.headers.authorization;
    const token = rawToken?.split(' ')[1];
    // checking if the token is missing
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    // checking if the given token is valid

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;


    const { role, userId } = decoded;
    console.log("from auth", role, userId)

    // checking if the user is exist
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      return res.status(401).send({
        "success": false,
        "statusCode": 401,
        "message": "You have no access to this route",
      });

    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
