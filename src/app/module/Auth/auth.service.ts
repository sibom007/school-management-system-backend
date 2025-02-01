import httpStatus from "http-status";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { Tlogin } from "./auth.interface";
import bcrypt from 'bcrypt';
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { UserStatus } from "@prisma/client";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { IauthPayloadId } from "../../../types/types";
import { getUserById } from "../../../utils/getUser";

const LoginIntoDB = async (res: Response, payload: Tlogin) => {
  try {
    const userData = await prisma.user.findUnique({
      where: {
        username: payload.username,
      },
    });

    if (!userData) {
      throw new AppError(httpStatus.NOT_FOUND, "Username does not exist");
    }

    const isPasswordCorrect = await bcrypt.compare(
      payload.password,
      userData.password
    );

    if (!isPasswordCorrect) {
      throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
    }

    const token = jwt.sign(
      {
        id: userData.id,
      },
      config.accesToken_secret as Secret,
      { expiresIn: "30d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true, // Prevents JavaScript access (more secure)
      secure: process.env.NODE_ENV === "production", // Only HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    const user = {
      id: userData.id,
      username: userData.username,
      role: userData.role,
      status: userData.status,
    };

    return user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new AppError(httpStatus.UNAUTHORIZED, error.message);
    } else {
      throw new AppError(httpStatus.UNAUTHORIZED, "An unknown error occurred");
    }
  }
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
const userLogout = async (res: Response, userId: IauthPayloadId) => {
  try {
    // Fetch user before proceeding
    const user = await getUserById(userId.id);

    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User not found");
    }

    // Clear auth cookie
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: config.node_prosses === "production",
      sameSite: "strict",
      path: "/", // Ensure the path matches how the cookie was originally set
    });

    // Send a JSON response to confirm logout
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "An unknown error occurred";
    return res.status(httpStatus.UNAUTHORIZED).json({ message });
  }
};
export const Authservice = {
  LoginIntoDB,
  userLogout,
  ChangePassword,
};