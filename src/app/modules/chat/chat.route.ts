import  express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { messageValidatio } from "./chat.validation";
import { chatController } from "./chat.controller";


const router = express.Router()

router.post(
    '/send-message',
    validateRequest(messageValidatio.MessageVallidationmSchema),
    chatController.createMessage
)
router.get(
    '/messages/:userId1/:userId2',
    chatController.getMessage
)

export const messageRoutes = router;