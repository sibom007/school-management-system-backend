import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { DonorRequestservice } from "./donor.service";

const createRequestADonor = catchAsync(async (req, res) => {
    const user =req.user
    const result = await DonorRequestservice.DonorRequestIntoDB(user,req.body);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
});


export const Donorcontorler = {
    createRequestADonor
}