"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_contorler_1 = require("./user.contorler");
const user_zodvalidation_1 = require("./user.zodvalidation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(user_zodvalidation_1.userValidation.createUser), user_contorler_1.UserControllers.createUser);
router.get('/donor-list', user_contorler_1.UserControllers.getdonorUser);
router.put('/my-profile', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), user_contorler_1.UserControllers.updateUserProfile);
router.get('/my-profile', (0, auth_1.default)(client_1.Role.USER, client_1.Role.ADMIN), user_contorler_1.UserControllers.getUserProfile);
exports.UserRoutes = router;
