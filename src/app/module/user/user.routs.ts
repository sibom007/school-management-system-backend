import express from 'express';
import { UserControllers } from './user.contorler';
import { userValidation } from './user.zodvalidation';
import validateRequest from '../../middlewares/validateRequest';
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUser),
  UserControllers.createUser
);
router.get("/get-user", auth(), UserControllers.GetUserById);
router.get("/get-users", auth(), UserControllers.GetUsers);
router.patch("/update-change-role", auth(), UserControllers.ChangeUserRoles);
router.patch("/update-change-status", auth(), UserControllers.UserStatusChange);

export const UserRoutes = router;
