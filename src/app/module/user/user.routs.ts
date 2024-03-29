import express from 'express';
import { UserControllers } from './user.contorler';
import { userValidation } from './user.zodvalidation';
import validateRequest from '../../middlewares/validateRequest';


const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.createUser),
  UserControllers.createUser
);
router.get(
  '/donor-list',
  UserControllers.getdonorUser
);


export const UserRoutes = router;
