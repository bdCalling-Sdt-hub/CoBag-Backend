import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { openRoutes } from '../modules/open/open.route';
import { codeRoutes } from '../modules/vaCode/vaCode.route';
import { sellKgRoutes } from '../modules/sellKG/sellKG.route';
import { sendKgRouter } from '../modules/sendKg/sendKg.route';
import { messageRoutes } from '../modules/chat/chat.route';
import { paymentRoute } from '../modules/payment/payment.route';
const router = Router();

const moduleRoutes = [
 
  {
    path: '/',
    route: openRoutes,
  },
  {
    path: '/auth',
    route: userRoutes,
  },
  {
    path: '/reset-password',
    route: codeRoutes,
  },
  {
    path: '/sell-kg',
    route: sellKgRoutes,
  },
  {
    path: '/send-kg-route',
    route: sendKgRouter,
  },
  {
    path: '/chat',
    route: messageRoutes,
  },
  {
    path: '/payment',
    route: paymentRoute,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
