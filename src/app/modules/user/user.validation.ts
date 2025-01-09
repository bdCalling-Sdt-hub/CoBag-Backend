import { z } from 'zod';

const UserSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    phone: z.string().min(1, "Phone number is required"),
    role: z.enum(["admin", "user", "super_admin"]).default("user"),
    subscription: z.boolean().optional(),
    isBlocked: z.boolean().default(false), // Added field 
    isSuspend: z.boolean().default(false), // Added field 
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});

const UpdateUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1, "First name is required").optional(),
    lastName: z.string().min(1, "Last name is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 6 characters long").optional(),
    phone: z.string().min(1, "Phone number is required").optional(),
    role: z.enum(["admin", "user", "super_admin"]).optional(),
    subscription: z.boolean().optional(),
    isBlocked: z.boolean().optional(), // Added field
    isSuspend: z.boolean().optional(), // Added field
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }).partial(),
});

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "Email is required." }).email("Invalid email address"),
    password: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});
const ForgetPasswordValidationSchema = z.object({
  body: z.object({
    newPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    confirmNewPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});
const ResetPasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    newPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
    confirmNewPassword: z.string({ required_error: "Password is required." }).min(6, "Password must be at least 6 characters long"),
  }),
});


export const userValidation = {
    UserSchema,
    LoginValidationSchema,
    UpdateUserValidationSchema,
    ForgetPasswordValidationSchema,
    ResetPasswordValidationSchema
};
