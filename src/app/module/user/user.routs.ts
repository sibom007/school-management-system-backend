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
export const UserRoutes = router;
