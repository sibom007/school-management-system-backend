"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authservice = void 0;
const http_status_1 = __importDefault(require("http-status"));
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelpers_1 = require("../../../helper/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const client_1 = require("@prisma/client");
const LoginIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: payload.email
        }
    });
    const currentpassword = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!currentpassword) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "Password is not match");
    }
    const token = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
    }, config_1.default.accesToken_secret, "30d");
    const refreshToken = jwtHelpers_1.jwtHelpers.generateToken({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role
    }, config_1.default.refreshToken_secret, "30d");
    return { token, userData, refreshToken, };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let decodedData;
    try {
        decodedData = jwtHelpers_1.jwtHelpers.verifyToken(token, 'abcdefghgijklmnop');
    }
    catch (err) {
        throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
    }
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: decodedData.email,
            status: client_1.UserStatus.ACTIVE
        }
    });
    const accessToken = jwtHelpers_1.jwtHelpers.generateToken({
        email: userData.email,
        role: userData.role
    }, config_1.default.accesToken_secret, "30d");
    return {
        accessToken,
    };
});
const ChangePassword = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE
        }
    });
    const iscurrectPassword = yield bcrypt_1.default.compare(payload.oldPassword, userData === null || userData === void 0 ? void 0 : userData.password);
    if (!iscurrectPassword) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Password incorrect!");
    }
    const hashedPassword = yield bcrypt_1.default.hash(payload.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            email: userData.email
        },
        data: {
            password: hashedPassword,
        }
    });
    return null;
});
exports.Authservice = {
    LoginIntoDB,
    refreshToken,
    ChangePassword,
};
