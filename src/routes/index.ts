import { Router } from 'express';
import { AuthRoutes } from '../app/module/Auth/auth.routs';
import { UserRoutes } from '../app/module/user/user.routs';




const router = Router();

const moduleRoutes = [
  {
    path: "/Auth",
    route: AuthRoutes,
  },
  {
    path: "/",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
