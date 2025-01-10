import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TForgetPassword, TLoginUser, TResetPassword, TUser } from "./user.interface";
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

const getAllUserFromDB =async () => {
  try {
    const result = UserModel.find({});
    if (!result) {
      throw new Error("No User Found");
    } 
    return result;
  } catch (error) {
    return error
  }
} 

const updateUserFromDB = async(payload : Partial<TUser>, id : string) => {
 try {
  const result = await UserModel.findByIdAndUpdate(
    { _id: id },
    { $set: payload }, // Use $set to update specific fields
    { new: true } // Return the updated document
  );
    if (!result) {
      throw new Error("Profile Not Updated Successfully");
    }
    return result;
 } catch (error) {
  return error
 }
}

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

  const blockUserfromDB = async (id : string) =>{
    try {
      console.log(id);
      const result = await UserModel.find({_id: id});
      if (result) {
        console.log("result :" , result);
        // Update the isBlocked field to true
        const updatedResult = await UserModel.findByIdAndUpdate({_id: id},  { isBlocked: true  }, {new : true});
        console.log("Updated Result:", updatedResult);
        return updatedResult;
      }
      
    } catch (error) {
      return error;
    }
  };
  const suspendUserfromDB = async (id : string) =>{
    try {
      console.log(id);
      const result = await UserModel.find({_id: id});
      if (result) {
        console.log("result :" , result);
        // Update the isBlocked field to true
        const updatedResult = await UserModel.findByIdAndUpdate({_id: id},  { isSuspend: true  }, {new : true});
        console.log("Updated Result:", updatedResult);
        return updatedResult;
      }
      
    } catch (error) {
      return error;
    }
  };

  const forgetPasswordFromDB = async (payload : TForgetPassword, email : string) => {
    try {
      const newPassword = payload.newPassword;
      const confirmNewPassword = payload.confirmNewPassword;

      if (newPassword === confirmNewPassword) {
        const user = await UserModel.findOne({ email: email });
        if (user) {
          user.password = newPassword; // Update the password field
          await user.save(); // Save the updated user
          console.log("Password updated successfully for:", user);
          return user;
        } else {
          throw new Error("User not found");
        }
      } else {
        throw new Error("Both fields are not the same");
      }
    } catch (error) {
      return error;
    }
  };
  const resetPasswordFromDB = async(payload : TResetPassword, id : string) => {
    try {
      const newPassword = payload.newPassword;
      const confirmNewPassword = payload.confirmNewPassword;
      const user = await UserModel.findById({_id : id});
      if (!user) {
        throw new Error("User Not found");
      }
      if (!(user.password === payload.oldPassword)) {
        throw new Error("Old Password Not Matched");
      } 
      if (!(newPassword === confirmNewPassword)) {
        throw new Error("New password and confirm new password not matched");
      }
      user.password = newPassword;
      await user.save(); 
      return user;
    } catch (error) {
      throw error;
    }
  }
export const userService = {
    createUserIntoDB,
    loginUser, 
    updateUserFromDB,
    getAllUserFromDB,
    blockUserfromDB,
    suspendUserfromDB,
    forgetPasswordFromDB,
    resetPasswordFromDB
}