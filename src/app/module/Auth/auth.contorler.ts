import httpStatus from 'http-status';
import catchAsync from '../../../utils/catchAsync';
import sendResponse from '../../../utils/sendResponse';
import { Authservice } from './auth.service';
import { Request, Response } from 'express';
import config from "../../../config";

const LoginUser = catchAsync(async (req, res) => {
  const result = await Authservice.LoginIntoDB(req.body);
  const { refreshToken, token } = result;
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.node_prosses === "production",
    sameSite: "strict",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: { token },
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await Authservice.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "New token Get successfully",
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
  refreshToken,
  changepassword,
  Logout,
};
