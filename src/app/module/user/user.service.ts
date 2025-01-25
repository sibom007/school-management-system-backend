import bcrypt from 'bcrypt';
import config from "../../../config";
import prisma from '../../../utils/prisma';
import { Role, UserStatus } from "@prisma/client";
import AppError from "../../Error/AppError";
import { TUser } from "./user.interface";

const createUserIntoDB = async (payload: TUser) => {
  const UserData = {
    username: payload.username,
    password: await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_rounds)
    ),
    role: (payload.role as Role) || Role.USER,
    status: UserStatus.ACTIVE,
  };

  const email = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (email) {
    throw new AppError(400, "Email already exist");
  }

  const result = await prisma.$transaction(async (TC) => {
    const user = await TC.user.create({
      data: UserData,
      select: {
        id: true,
        username: true,
        role: true,
      },
    });

    return { user };
  });
  return result;
};

export const userservise = {
  createUserIntoDB,
};
