import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TLoginUser, TUser } from "./user.interface";
import UserModel from "./user.model"
import config from "../../config";
import { createToken } from "./user.utils";

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
    const user = await UserModel.findOne({email : userData.email})
    if (user) {
      throw new Error("User exiest");
    }
    const newUser = new UserModel(userData);
    return await newUser.save();
};

const loginUser = async (payload: TLoginUser) => {
   try {
    const {email, password} = payload;
    console.log(email)
    // checking if the user is exist
    const user = await UserModel.findOne({ email });
    console.log("user 1", user?.password)
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }
    console.log("user 2", user._id)
    //checking if the password is correct
  
    if (!(user?.password === password)) {
        throw new Error("password didn't matched")
    }
    if (!(user?.email === email)) {
        throw new Error("password didn't matched")
    }
  
    //create token and sent to the  client
  
    const jwtPayload = {
      userId: user?._id,
      role: user?.role,
    };
  
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string,
    );
  

  
    return accessToken;
   } catch (error) {
    return error
   }
  };
export const userService = {
    createUserIntoDB,
    loginUser, 
}