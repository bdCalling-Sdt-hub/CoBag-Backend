import { USER_ROLE } from "./user.constant";

export type TUser = {
    _id?:string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    role: 'admin' | 'user' | 'super_admin';
    subscription : boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type TLoginUser = {
    email: string;
    password: string;
  };

  export type TUserRole = keyof typeof USER_ROLE;
  
