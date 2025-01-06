import { z } from "zod";

const verificationCodeSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email address"),
  }),
});

export const codeValidation = {
    verificationCodeSchema
};