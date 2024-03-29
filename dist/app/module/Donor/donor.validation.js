"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donorValidation = void 0;
const zod_1 = require("zod");
const createUser = zod_1.z.object({
    donorId: zod_1.z.string({
        required_error: 'donorId is required'
    }),
    phoneNumber: zod_1.z.string({
        required_error: 'PhoneNumber is required'
    }),
    dateOfDonation: zod_1.z.string({
        required_error: 'dateOfDonation is required'
    }),
    hospitalName: zod_1.z.string({
        required_error: 'hospitalName is required'
    }),
    reason: zod_1.z.string({
        required_error: 'hospitalName is required'
    }),
});
exports.donorValidation = {
    createUser,
};
