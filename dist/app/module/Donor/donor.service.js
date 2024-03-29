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
exports.DonorRequestservice = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const DonorRequestIntoDB = (payloadUser, Payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payloadUser.email
        }
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    console.log(user);
    const result = yield prisma_1.default.request.create({
        data: {
            phoneNumber: Payload.phoneNumber,
            hospitalName: Payload.hospitalName,
            hospitalAddress: Payload.hospitalAddress,
            reason: Payload.reason,
            dateOfDonation: Payload.dateOfDonation,
            requestStatus: client_1.RequestStatus.PENDING,
            donor: {
                connect: {
                    id: Payload.donorId,
                },
            },
            requester: {
                connect: {
                    id: user.id
                },
            },
        },
        select: {
            id: true,
            phoneNumber: true,
            hospitalName: true,
            hospitalAddress: true,
            reason: true,
            dateOfDonation: true,
            requestStatus: true,
            donorId: true,
            requesterId: true,
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    profile: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
    return result;
});
const GetDonorRequestIntoDB = (payloadUser) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            email: payloadUser.email
        }
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = yield prisma_1.default.request.findMany({
        where: {
            requesterId: user.id,
        }, include: {
            requester: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    bloodType: true,
                    location: true,
                    availability: true,
                    profile: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
    return result;
});
const UpdateDonorRequestIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.request.update({
        where: {
            id: id,
        },
        data: {
            requestStatus: payload.status,
        }
    });
    return result;
});
exports.DonorRequestservice = {
    DonorRequestIntoDB,
    GetDonorRequestIntoDB,
    UpdateDonorRequestIntoDB,
};
