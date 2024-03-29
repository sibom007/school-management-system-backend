import { Router } from 'express';
import { AuthRoutes } from '../app/module/Auth/auth.routs';
import { UserRoutes } from '../app/module/user/user.routs';
import { DonorRoutes } from '../app/module/Donor/donor.routs';



const router = Router();

const moduleRoutes = [
    {
        path: '/',
        route: AuthRoutes,
    },
    {
        path: '/',
        route: UserRoutes,
    },
    {
        path: '/',
        route: DonorRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
