import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { Authservice } from './auth.service';
import { Request, Response } from 'express';


const LoginUser = catchAsync(async (req, res) => {
  const result = await Authservice.LoginIntoDB(res, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});
const Logout = catchAsync(async (req, res) => {
  const result = await Authservice.userLogout(res, req.user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});

const changepassword = catchAsync(async (req: Request, res: Response) => {
  const result = await Authservice.ChangePassword(res, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "LogOut successfully!",
    data: result,
  });
});

export const AuthControllers = {
  LoginUser,
  changepassword,
  Logout,
};
