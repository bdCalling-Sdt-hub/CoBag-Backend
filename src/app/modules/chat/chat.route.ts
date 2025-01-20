import  express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { messageValidatio } from "./chat.validation";
import { chatController } from "./chat.controller";
import { USER_ROLE } from "../user/user.constant";
import auth from "../../middlewares/auth";


const router = express.Router()

router.post(
    '/send-message',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    validateRequest(messageValidatio.MessageVallidationmSchema),
    chatController.createMessage
)
router.get(
    '/messages/:userId1/:userId2',
    auth( USER_ROLE.admin, USER_ROLE.user, USER_ROLE.supar_admin),
    chatController.getMessage
)

export const messageRoutes = router;