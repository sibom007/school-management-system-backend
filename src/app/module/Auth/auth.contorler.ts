import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { Authservice } from './auth.service';
import { Request, Response } from 'express';


const LoginUser = catchAsync(async (req, res) => {
    const { token, userData, refreshToken } = await Authservice.LoginIntoDB(req.body)
    const { email, id, name } = userData;
    const userdata2 = {
        id, name, email
    }

    res.cookie("refreshToken", refreshToken, {
        secure: false,
        httpOnly: true
    })

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'User logged in successfully',
        data: {
            userdata2,
            token,
        },
    });
});

const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await Authservice.refreshToken(refreshToken);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Logged in successfully!",
        data: result
    })
});
const changepassword = catchAsync(async (req: Request & { user?: any }, res: Response) => {
    const user = req.user
    const passwords = req.body
    const result = await Authservice.ChangePassword(passwords, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Password Change successfully!",
        data: result
    })
});




export const AuthControllers = {
    LoginUser,
    refreshToken,
    changepassword
};
