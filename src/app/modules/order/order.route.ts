import express from 'express';
import { orderController } from './order.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';


const router = express.Router();

router.get(
    '/',
    auth(USER_ROLE.super_admin),
    orderController.readOrders
)

router.get(
    '/get-all-order-under-user',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
    orderController.readOrderById
)

router.get(
    '/all-running-order',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
    orderController.allRunningOrder
)

router.get(
    '/T&S-orders/:queryPerams',
    auth(USER_ROLE.super_admin, USER_ROLE.admin, USER_ROLE.user),
    orderController.usersenderAndTravelerOrders
)


export const orderRoutes = router;