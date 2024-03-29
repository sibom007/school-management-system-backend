"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonorRoutes = void 0;
const express_1 = __importDefault(require("express"));
const donor_contorler_1 = require("./donor.contorler");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const donor_validation_1 = require("./donor.validation");
const router = express_1.default.Router();
router.post('/donation-request', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), (0, validateRequest_1.default)(donor_validation_1.donorValidation.createUser), donor_contorler_1.Donorcontorler.createRequestADonor);
router.get('/donation-request', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), donor_contorler_1.Donorcontorler.GetRequestofDonor);
router.put('/donation-request/:requestId', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), donor_contorler_1.Donorcontorler.UpdateRequestofDonor);
exports.DonorRoutes = router;
