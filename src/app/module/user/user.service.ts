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

  const username = await prisma.user.findUnique({
    where: {
      username: payload.username,
    },
  });

  if (username) {
    throw new AppError(400, "user already exist");
  }

  const result = await prisma.user.create({
    data: UserData,
    select: {
      username: true,
      role: true,
    },
  });

  return result;
};

export const userservise = {
  createUserIntoDB,
};
