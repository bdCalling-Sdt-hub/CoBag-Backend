import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { TForgetPassword, TLoginUser, TResetPassword, TUser } from "./user.interface";
import UserModel from "./user.model"
import config from "../../config";
import { createToken } from "./user.utils";
import nodemailer from "nodemailer";
import ReviewModel from "../review/review.model";
import crypto from "crypto";
// const createUserIntoDB = async (userData: TUser) => {
//   const user = await UserModel.findOne({ email: userData.email })


//   if (user) {
//     throw new Error("User exiest");

//   }
//   console.log(user)


//   const newUser = await UserModel.create(userData)

//   // Create the JWT payload
//   const jwtPayload = {
//     userId: newUser._id,
//     role: newUser.role,
//   };

//   // Generate access token
//   const accessToken = createToken(
//     jwtPayload,
//     config.jwt_access_secret as string,
//     config.jwt_access_expires_in as string,
//   );

//   return {
//     token: accessToken,
//     data : newUser
//   }
// };



const generateReferralCode = () => {
  return crypto
    .randomBytes(6) // 6 bytes = 12 hex characters
    .toString("hex")
    .toUpperCase()
    .replace(/[IO]/g, "X") // Avoid characters that look similar
    .slice(0, 12); // Ensure it's exactly 12 characters
};

const createUserIntoDB = async (userData: TUser) => {
  const user = await UserModel.findOne({ email: userData.email });

  if (user) {
    throw new Error("User exists");
  }

  const referralCode = generateReferralCode();
  userData.referCode = referralCode;

  const referredBy = userData.referredBy;
  console.log("referredBy" , referredBy)
  if (referredBy) {
    const referredByUser = await UserModel.findOne({ referCode: referredBy });
    console.log("referredByUser" , referredByUser)
    if (referredByUser) {
      userData.referredBy = referredByUser._id ;
    }
  }
  const newUser = await UserModel.create(userData);

  // Create the JWT payload
  const jwtPayload = {
    userId: newUser._id,
    role: newUser.role,
  };

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    token: accessToken,
    data: newUser,
  };
};

const getAllUserFromDB = async () => {

  const result = UserModel.find({});
  if (!result) {
    throw new Error("No User Found");
  }
  return result;
}

const getOneUserReviewByIdFromDB = async (id: string) => {

  const result = await UserModel.findById({ _id: id });
   // Find all reviews for the given receiverId
   const reviews = await ReviewModel.find({ _id: id });
   const user = await UserModel.findById({ _id: id })

   // If no reviews are found, return an appropriate message or value
   if (reviews.length === 0) {
       return { message: 'No reviews found for this user', averageRating: 0 };
   }

   // Calculate the average rating
   const totalRatings = reviews.reduce((sum, review) => sum + review.ratings, 0);
   const averageRating = totalRatings / reviews.length;
   if (user) {
       user.reviewInt = reviews.length;
       user.reviewAva = averageRating
       await user.save();
   }

  if (!result) {
    throw new Error("User ID Get Successfully");
  }
  return result;
}

const updateUserFromDB = async (id: string, payload: Partial<TUser>,) => {

  // console.log( "pAYLOAD" ,payload)


  const result = await UserModel.findByIdAndUpdate(id, payload, { new: true})
  // console.log("User Service" , result)
  if (!result) {
    throw new Error("Profile Not Updated Successfully");
  }
  return result;
}

const loginUser = async (payload: TLoginUser) => {
  const { email, password } = payload;

  if (!email || !password) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Email and password are required!');
  }

  // Check if the user exists
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found!');
  }

  // Validate the password (basic string comparison)
  if (user.password !== password) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password!');
  }

  // Create the JWT payload
  const jwtPayload = {
    userId: user._id,
    role: user.role,
  };

  // Generate access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // Return the generated access token
  return accessToken;
};





const blockUserfromDB = async (id: string) => {

  console.log(id);
  const result = await UserModel.find({ _id: id });
  if (result) {
    console.log("result :", result);
    // Update the isBlocked field to true
    const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isBlocked: true }, { new: true });
    console.log("Updated Result:", updatedResult);
    return updatedResult;
  } else {
    throw new Error("User Not Blocked Successfully");
  }

};
const suspendUserfromDB = async (id: string) => {
  console.log(id);
  const result = await UserModel.find({ _id: id });
  if (result) {
    console.log("result :", result);
    // Update the isBlocked field to true
    const updatedResult = await UserModel.findByIdAndUpdate({ _id: id }, { isSuspend: true }, { new: true });
    console.log("Updated Result:", updatedResult);
    return updatedResult;
  }


};

const forgetPasswordFromDB = async (payload: TForgetPassword, email: string) => {

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

};
const resetPasswordFromDB = async (payload: TResetPassword, id: string) => {

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

}

const makeAdminFromDB = async (payload: Partial<TUser>) => {
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

}


const getAllAdminsFromDB = async () => {
  const result = await UserModel.find({ role: "admin", isBlocked: false });
  return result;
};
const getAllBlockedAdminsFromDB = async () => {
  const result = await UserModel.find({ role: "admin", isBlocked: true });
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await UserModel.findByIdAndDelete(id);
  return result
}



const getOneUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  return result
}

const verifyUserFromDB = async (id: string) => {
  const result = await UserModel.findById(id);
  if (!result) {
    throw new Error("Not Found");
  }
  result.isverified = true;
  await result.save();
  return result
}
export const userService = {
  createUserIntoDB,
  loginUser,
  updateUserFromDB,
  getAllUserFromDB,
  blockUserfromDB,
  getOneUserReviewByIdFromDB,
  suspendUserfromDB,
  forgetPasswordFromDB,
  resetPasswordFromDB,
  makeAdminFromDB,
  getAllAdminsFromDB,
  getAllBlockedAdminsFromDB,
  deleteAdminFromDB,
  getOneUserFromDB,
  verifyUserFromDB
}