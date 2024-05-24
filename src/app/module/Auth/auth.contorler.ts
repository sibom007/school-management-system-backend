import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { Authservice } from './auth.service';
import { Request, Response } from 'express';


const LoginUser = catchAsync(async (req, res) => {
   
    const {
      token: accessToken,
      userData,
      refreshToken,
    } = await Authservice.LoginIntoDB(req.body);
    const { id, email, role } = userData;
    const userData2 = { id, role, email };

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "User logged in successfully",
      data: {
        userData2,
        accessToken,
        refreshToken,
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
