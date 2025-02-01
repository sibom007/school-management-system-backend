import express from 'express';
import { AuthControllers } from "./auth.contorler";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/login", AuthControllers.LoginUser);

router.post("/change-password", AuthControllers.changepassword);
router.post("/logout", auth(), AuthControllers.Logout);

export const AuthRoutes = router;
