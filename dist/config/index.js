"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    accesToken_secret: process.env.ACCESTOKEN_SECRET,
    accesToken_secret_exparein: process.env.ACCESTOKEN_SECRET_EXPAREIN,
    refreshToken_secret: process.env.REFRESHTOKEN_SECRET,
    refreshToken_secret_exparein: process.env.REFRESHTOKEN_SECRET_EXPAREIN,
    node_prosses: process.env.NODE_PROSSES,
    port: process.env.PORT,
    cloud_name: process.env.COLUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
};
