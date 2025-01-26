import httpStatus from "http-status";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { Tlogin } from "./auth.interface";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { UserStatus } from '@prisma/client';

const LoginIntoDB = async (payload: Tlogin) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      username: payload.username,
    },
  });

  const currentpassword = await bcrypt.compare(
    payload.password,
    userData.password
  );

  const currentemail = userData.username === payload.username;

  if (!currentemail) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Email is not match");
  }

  if (!currentpassword) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Password is not match");
  }
  const token = jwtHelpers.generateToken(
    {
      id: userData.id,
      username: userData.username,
      role: userData.role,
    },
    config.accesToken_secret as Secret,
    "30d"
  );

  return { token, userData };
};

const ChangePassword = async (payload: any, user: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      username: user.username,
      status: UserStatus.ACTIVE,
    },
  });
  const iscurrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData?.password
  );

  if (!iscurrectPassword) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password incorrect!");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      username: userData.username,
    },
    data: {
      password: hashedPassword,
    },
  });
  const { id, username, status } = userData;
  const UserData2 = { id, username, status };
  return UserData2;
};



export const Authservice = {
    LoginIntoDB,
    ChangePassword,
}