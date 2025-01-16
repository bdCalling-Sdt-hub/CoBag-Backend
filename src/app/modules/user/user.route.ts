import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import fileUploadHandler from "../../middlewares/fileUploadHandler";


const router = express.Router()

// Define the upload folder
const UPLOADS_FOLDER_USER_DOCUMENTS = 'uploads/users';
const upload = fileUploadHandler(UPLOADS_FOLDER_USER_DOCUMENTS)

router.patch(
  '/update/:id',
  validateRequest(userValidation.UpdateUserValidationSchema),
  upload.fields([
    {
      name: "profileImage",
      maxCount: 1
    },
    {
      name: "ethanDocuments",
      maxCount:1
    },
    {
      name: "proofOfAddress",
      maxCount: 1
    },
    {
      name: "RIB",
      maxCount:1
    },
  ]),
  userController.updateUser
)
router.get(
  '/get-user/:id',
  userController.getOneUser
)
router.post(
  '/register',
  validateRequest(userValidation.UserSchema),
  userController.createUser
)
router.get(
  '/get-all-user',
  userController.getAllUser
)

router.post(
  '/login',
  validateRequest(userValidation.LoginValidationSchema),
  userController.loginUser,
);

router.post(
  '/logout',
  userController.logout,
);
router.patch(
  '/block/:id',
  userController.blockUser,
);
router.patch(
  '/suspend/:id',
  userController.suspendUser,
);
router.post(
  '/change-passs/:email',
  validateRequest(userValidation.ForgetPasswordValidationSchema),
  userController.forgetPassword,
);
router.post(
  '/reset-passs/:id',
  validateRequest(userValidation.ResetPasswordValidationSchema),
  userController.resetPassword,
);
router.post(
  '/make-admin',
  // validateRequest(userValidation.AdminCreateAdminSchema),
  userController.makeAdmin,
);








export const userRoutes = router;