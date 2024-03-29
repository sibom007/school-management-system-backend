import { z } from "zod";

const createUser = z.object({
    donorId: z.string({
        required_error: 'donorId is required'
    }),
    phoneNumber: z.string({
        required_error: 'PhoneNumber is required'
    }),
    dateOfDonation: z.string({
        required_error: 'dateOfDonation is required'
    }),
    hospitalName: z.string({
        required_error: 'hospitalName is required'
    }),

    reason: z.string({
        required_error: 'hospitalName is required'
    }),
})

export const donorValidation = {
    createUser,
}

