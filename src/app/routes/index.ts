import { Router } from 'express';
import { userRoutes } from '../modules/user/user.route';
import { openRoutes } from '../modules/open/open.route';
import { codeRoutes } from '../modules/vaCode/vaCode.route';
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
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
