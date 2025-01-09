import  express  from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";


const router = express.Router()

router.post(
    '/register',
    validateRequest(userValidation.UserSchema),
    userController.createUser
)
router.post(
    '/update/:id',
    validateRequest(userValidation.UpdateUserValidationSchema),
    userController.updateUser
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








export const userRoutes = router;