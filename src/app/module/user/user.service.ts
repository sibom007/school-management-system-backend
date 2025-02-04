import bcrypt from 'bcrypt';
import config from "../../../config";
import prisma from '../../../utils/prisma';
import { Role, UserStatus } from "@prisma/client";
import AppError from "../../Error/AppError";
import { TUser } from "./user.interface";
import { getUserById } from "../../../utils/getUser";
import { IauthPayloadId } from "../../../types/types";

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

const GetUserById = async (user: IauthPayloadId) => {
  const result = await getUserById(user.id);
  if (!result) {
    throw new AppError(404, "User not found");
  }
  return result;
};

const ChangeUserRole = async (payload: { id: string; role: Role }) => {
  const result = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      role: payload.role,
    },
  });
  return result;
};

const GetAllUsersIntoDB = async (user: IauthPayloadId) => {
  const result = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
    },
    select: {
      id: true,
      username: true,
      role: true,
      status: true,
    },
  });
  return result;
};
const UserStatusChangeIntoDB = async (payload: {
  id: string;
  status: UserStatus;
}) => {
  const result = await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};

export const userservise = {
  createUserIntoDB,
  GetUserById,
  ChangeUserRole,
  GetAllUsersIntoDB,
  UserStatusChangeIntoDB,
};
