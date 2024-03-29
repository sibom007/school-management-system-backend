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
exports.Donorcontorler = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const donor_service_1 = require("./donor.service");
const createRequestADonor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield donor_service_1.DonorRequestservice.DonorRequestIntoDB(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Request successfully made',
        data: result,
    });
}));
const GetRequestofDonor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield donor_service_1.DonorRequestservice.GetDonorRequestIntoDB(user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Donation requests retrieved successfully',
        data: result,
    });
}));
const UpdateRequestofDonor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const UpdatData = req.body;
    const id = req.params.requestId;
    const result = yield donor_service_1.DonorRequestservice.UpdateDonorRequestIntoDB(id, UpdatData);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Donation request status successfully updated',
        data: result,
    });
}));
exports.Donorcontorler = {
    createRequestADonor,
    GetRequestofDonor,
    UpdateRequestofDonor
};
