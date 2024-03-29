import express from 'express';
import { Donorcontorler } from './donor.contorler';
import auth from '../../middlewares/auth';
import { Role } from '@prisma/client';



const router = express.Router();

router.post(
    '/donation-request',
    auth(Role.DONOR),
    Donorcontorler.createRequestADonor
);



export const DonorRoutes = router;
