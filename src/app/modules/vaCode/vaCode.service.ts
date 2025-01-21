import nodemailer from "nodemailer";
import IVerification from "./vaCode.interface";
import UserModel from "../user/user.model";
import verificationCodeModel from "./vaCode.model";
import { HttpStatusCode } from "axios";
import AppError from "../../errors/AppError";

const sendVerificationFromDB = async (payload: Partial<IVerification>) => {
    
        // Extract email from payload
        const { email } = payload;
        console.log(email)
        if (!email) {
            throw new Error("Invalid Email");
        }
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new Error("User Not Register In Database ");
        }
        // Generate a random 6-digit verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

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
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your Verification Code",
            text: `Your verification code is: ${verificationCode}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
         // Create the verification record in the database
         const verificationRecord = {
            email,
            verificationCode: verificationCode,
        };
        const result = await verificationCodeModel.create(verificationRecord)

        // Respond with success message
        
        return result;
};


const verifyFromDB = async (payload: { verificationCode: string }) => {
     // Destructure verificationCode from the payload
     const { verificationCode } = payload;

     // Log to debug the received data
     console.log("Received verificationCode:", verificationCode);

     // Query the database with the verificationCode
     const result = await verificationCodeModel.findOne({ verificationCode });
     // Check if no result is found
     if (!result) {
         // throw new AppError(HttpStatusCode.NotAcceptable, 'Failed to create user')
         throw new Error("Failed")
     }
     const remove = await verificationCodeModel.deleteMany({ verificationCode : verificationCode });
     console.log("Result For Service",result)
     return result;
};




export const   VaCodeService = {
    sendVerificationFromDB,
    verifyFromDB,
}
