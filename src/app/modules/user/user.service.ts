import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TForgetPassword, TLoginUser, TResetPassword, TUser } from "./user.interface";
import UserModel from "./user.model"
import config from "../../config";
import { createToken } from "./user.utils";
import nodemailer from "nodemailer";

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const user = await UserModel.findOne({ email: userData.email })
  if (user) {
    throw new Error("User exiest");
  }
  const newUser = new UserModel(userData);
  return await newUser.save();
};

const getAllUserFromDB = async () => {
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

const getOneUserByIdFromDB = async (id: string) => {
  try {
    const result = await UserModel.findById({ _id: id });
    if (!result) {
      throw new Error("User ID Get Successfully");
    }
    return result;
  } catch (error) {
    return error
  }
}

const updateUserFromDB = async (id: string, payload: Partial<TUser>,) => {

  // console.log( "pAYLOAD" ,payload)

  try {
    const result = await UserModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    // console.log("User Service" , result)
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
    const { email, password } = payload;
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

const blockUserfromDB = async (id: string) => {
  try {
    console.log(id);
    const result = await UserModel.find({ _id: id });
    if (result) {
      console.log("result :", result);
      // Update the isBlocked field to true
      const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isBlocked: true }, { new: true });
      console.log("Updated Result:", updatedResult);
      return updatedResult;
    }

  } catch (error) {
    return error;
  }
};
const suspendUserfromDB = async (id: string) => {
  try {
    console.log(id);
    const result = await UserModel.find({ _id: id });
    if (result) {
      console.log("result :", result);
      // Update the isBlocked field to true
      const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isSuspend: true }, { new: true });
      console.log("Updated Result:", updatedResult);
      return updatedResult;
    }

  } catch (error) {
    return error;
  }
};

const forgetPasswordFromDB = async (payload: TForgetPassword, email: string) => {
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
const resetPasswordFromDB = async (payload: TResetPassword, id: string) => {
  try {
    const newPassword = payload.newPassword;
    const confirmNewPassword = payload.confirmNewPassword;
    const user = await UserModel.findById({ _id: id });
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

const makeAdminFromDB = async (payload: Partial<TUser>) => {
  try {
    const { email, password, message } = payload;
    const result = await UserModel.create(payload)
    if (!result) {
      throw new Error("Admin Not Created");
    } else {
      const user = await UserModel.findOne({ email });
      if (!user) {
        throw new Error("User Not Register In Database Yet for send mail His Cradential ");
      }
      // Configure Nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: 'sayedhasan973@gmail.com', //sayedhasan973@gmail.com
          pass: 'xssp ebum kdxf eyvf',//xssp ebum kdxf eyvf
        },
      });

      // Email options
      const mailOptions = {
        from: 'sayedhasan973@gmail.com',
        to: email,
        subject: "CoBag Official",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
            <h2 style="color: #4CAF50; text-align: center;">Welcome to CoBag!</h2>
            <p style="font-size: 16px; color: #333;">Congratulations! You have been promoted to an <strong>Admin</strong> on <strong>CoBag</strong>. Below are your credentials to access your account:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Password</td>
                <td style="padding: 8px; border: 1px solid #ddd;">${password}</td>
              </tr>
            </table>
            <p style="font-size: 16px; color: #333;">${message}</p>
            <p style="font-size: 16px; color: #333;">For your security, we recommend changing your password upon first login.</p>
            <p style="text-align: center; margin-top: 30px;">
              <a href="https://cobag.com/login" style="background-color: #4CAF50; color: #fff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">Login to CoBag</a>
            </p>
            <hr style="border: 0; border-top: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #888; text-align: center;">If you did not request this, please contact us immediately at support@cobag.com.</p>
          </div>
        `,
      };
      
      // Send the email
      await transporter.sendMail(mailOptions);
    }

    return result
  } catch (error) {
    return error
  }
}

export const userService = {
  createUserIntoDB,
  loginUser,
  updateUserFromDB,
  getAllUserFromDB,
  blockUserfromDB,
  getOneUserByIdFromDB,
  suspendUserfromDB,
  forgetPasswordFromDB,
  resetPasswordFromDB,
  makeAdminFromDB,
}