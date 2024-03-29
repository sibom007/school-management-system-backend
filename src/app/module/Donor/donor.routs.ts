import express from 'express';
import { Donorcontorler } from './donor.contorler';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { donorValidation } from './donor.validation';



const router = express.Router();

router.post(
    '/donation-request',
    auth(Role.USER, Role.ADMIN),
    validateRequest(donorValidation.createUser),
    Donorcontorler.createRequestADonor
);
router.get(
    '/donation-request',
    auth(Role.USER, Role.ADMIN),
    Donorcontorler.GetRequestofDonor
);
router.put(
    '/donation-request/:requestId',
    auth(Role.USER, Role.ADMIN),
    Donorcontorler.UpdateRequestofDonor
);



export const DonorRoutes = router;
