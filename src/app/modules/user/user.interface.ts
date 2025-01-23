import { USER_ROLE } from "./user.constant";

export type TUser = {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    profileImage: string;
    ethanDocuments: string;
    proofOfAddress: string;
    RIB: string;
    phone: string;
    reviewAva: number;
    reviewInt: number;
    message?: string;
    role: "admin" | "user" | "super_admin";
    subscription: boolean;
    isBlocked: boolean; // Added field
    isverified: boolean; // Added field
    isSuspend: boolean; // Added field
    isTwentyPercent ?: boolean, 
    isSubscription?: boolean,  
    createdAt?: Date;
    updatedAt?: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
};
export type TForgetPassword = {
    newPassword: string;
    confirmNewPassword: string;
};
export type TResetPassword = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

  export type TUserRole = keyof typeof USER_ROLE;
  
