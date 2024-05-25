import express from 'express';
import { UserControllers } from './user.contorler';
import { userValidation } from './user.zodvalidation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';


const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidation.createUser),
  UserControllers.createUser
);
router.get("/donor-list", UserControllers.getdonorUser);
router.put(
  "/my-profile",
  auth(Role.USER, Role.ADMIN),
  UserControllers.updateUserProfile
);
router.get(
  "/my-profile",
  auth(Role.USER, Role.ADMIN),
  UserControllers.getUserProfile
);
router.get(
  "/donner-details/:id",
  // auth(Role.USER, Role.ADMIN),
  UserControllers.getSingleDonner
);
router.get("/All_user", auth(Role.ADMIN), UserControllers.GetAllUser);
router.put(
  "/updateUser-status/:id",
  auth(Role.ADMIN),
  UserControllers.UpdateUserStatus
);
router.put(
  "/updateUser-role/:id",
  auth(Role.ADMIN),
  UserControllers.UpdateUserRoleStatus
);


export const UserRoutes = router;
