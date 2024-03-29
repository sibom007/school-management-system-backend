"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_contorler_1 = require("./auth.contorler");
const router = express_1.default.Router();
router.post('/login', auth_contorler_1.AuthControllers.LoginUser);
router.post('/refresh-token', auth_contorler_1.AuthControllers.refreshToken);
router.post('/change-password', auth_contorler_1.AuthControllers.changepassword);
exports.AuthRoutes = router;
