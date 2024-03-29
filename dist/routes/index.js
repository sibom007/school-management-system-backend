"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routs_1 = require("../app/module/Auth/auth.routs");
const user_routs_1 = require("../app/module/user/user.routs");
const donor_routs_1 = require("../app/module/Donor/donor.routs");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/',
        route: auth_routs_1.AuthRoutes,
    },
    {
        path: '/',
        route: user_routs_1.UserRoutes,
    },
    {
        path: '/',
        route: donor_routs_1.DonorRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
