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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userservise = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const prisma_1 = __importDefault(require("../../../utils/prisma"));
const client_1 = require("@prisma/client");
const paginationHelper_1 = require("../../../helper/paginationHelper");
const user_constant_1 = require("./user.constant");
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const UserData = {
        name: payload.User.name,
        email: payload.User.email,
        password: yield bcrypt_1.default.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds)),
        role: payload.User.role || client_1.Role.USER,
        bloodType: payload.User.bloodType,
        location: payload.User.location,
    };
    const result = yield prisma_1.default.$transaction((TC) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield TC.user.create({
            data: UserData,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                bloodType: true,
                location: true,
            }
        });
        const userProfile = yield TC.userProfile.create({
            data: {
                userId: user.id,
                bio: payload.User.bio,
                age: payload.User.age,
                lastDonationDate: payload.User.lastDonationDate,
            }
        });
        return { user, userProfile };
    }));
    return result;
});
const getdonorUserIntoDB = (params, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = params, filterData = __rest(params, ["searchTerm"]);
    const { page, limit, skip } = paginationHelper_1.paginationHelper.calculatePagination(options);
    const andCondions = [];
    if (params.searchTerm) {
        andCondions.push({
            OR: user_constant_1.userSearchAbleFields.map((field) => ({
                [field]: {
                    contains: params.searchTerm,
                    mode: 'insensitive'
                }
            }))
        });
    }
    ;
    if (Object.keys(filterData).length > 0) {
        andCondions.push({
            AND: Object.keys(filterData).map(key => {
                let value = filterData[key];
                if (key === 'availability' && typeof value === 'string') {
                    value = value === 'true';
                }
                return {
                    [key]: {
                        equals: value
                    }
                };
            })
        });
    }
    ;
    const whereConditons = andCondions.length > 0 ? { AND: andCondions } : {};
    const result = yield prisma_1.default.user.findMany({
        where: whereConditons,
        skip,
        take: limit,
        orderBy: options.sortBy && (options.sortOrder === 'asc' || options.sortOrder === 'desc') ? (options.sortBy === 'age' || options.sortBy === 'lastDonationDate' ? {
            profile: Object.assign(Object.assign({}, (options.sortBy === 'age' && { age: options.sortOrder })), (options.sortBy === 'lastDonationDate' && { lastDonationDate: options.sortOrder })),
        } : {
            [options.sortBy]: options.sortOrder,
        }) : {
            createdAt: 'desc',
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            location: true,
            bloodType: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            profile: {
                select: {
                    id: true,
                    userId: true,
                    bio: true,
                    age: true,
                    lastDonationDate: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
    const total = yield prisma_1.default.user.count({
        where: whereConditons
    });
    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    };
});
const getUserProfileIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: payload.id,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            location: true,
            bloodType: true,
            availability: true,
            createdAt: true,
            updatedAt: true,
            profile: true,
        }
    });
    return result;
});
const UpdateUserProfileIntoDB = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.update({
        where: {
            id: user.id,
        },
        data: {
            profile: {
                update: {
                    bio: payload.bio,
                    age: payload.age,
                    lastDonationDate: payload.lastDonationDate,
                }
            },
        },
        select: {
            profile: {
                select: {
                    id: true,
                    userId: true,
                    bio: true,
                    age: true,
                    lastDonationDate: true,
                    createdAt: true,
                    updatedAt: true,
                }
            }
        }
    });
    return result;
});
exports.userservise = {
    createUserIntoDB,
    getdonorUserIntoDB,
    getUserProfileIntoDB,
    UpdateUserProfileIntoDB,
};
