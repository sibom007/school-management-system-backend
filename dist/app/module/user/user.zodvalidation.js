"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUser = zod_1.default.object({
    password: zod_1.default.string({
        required_error: "Password is required"
    }),
    User: zod_1.default.object({
        name: zod_1.default.string({
            required_error: 'Name is required'
        }),
        email: zod_1.default.string({
            required_error: 'Email is required'
        }).email('Invalid email'),
        status: zod_1.default.enum(["ACTIVE", "BlOCKED"]).optional(),
        bloodType: zod_1.default.enum(["A_POSITIVE",
            "B_POSITIVE",
            "A_NEGATIVE",
            "B_NEGATIVE",
            "AB_POSITIVE",
            "AB_NEGATIVE",
            "O_POSITIVE",
            "O_NEGATIVE"]),
        location: zod_1.default.string(),
        availability: zod_1.default.boolean().default(true),
    })
});
exports.userValidation = {
    createUser,
};
