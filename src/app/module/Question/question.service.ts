import { Book, Chapter, Question, Role } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { ITokenPayload } from "../../../types/types";
import AppError from "../../Error/AppError";

const AddQuestionIntoDB = async (token: ITokenPayload, payload: Question) => {
  const user = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
  });
  if (!user) {
    throw new AppError(400, "User not found");
  }

  return;
};






const QuestionChangeStatusIntoDB = async (
  token: ITokenPayload,
  payload: Question
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  if (user.role !== Role.ADMIN && user.role !== Role.MODERATOR) {
    throw new AppError(400, "You are not authorized to perform this action");
  }
  const result = await prisma.question.update({
    where: {
      id: payload.id,
    },
    data: {
      status: payload.status,
    },
  });
  return result;
};
const DeleteQuestionIntoDB = async (token: ITokenPayload, id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: token.id,
    },
  });
  if (!user) {
    throw new AppError(400, "User not found");
  }
  const result = await prisma.question.delete({
    where: {
      id,
    },
  });
  return result;
};

export const QuestionService = {
  AddQuestionIntoDB,
  QuestionChangeStatusIntoDB,
  DeleteQuestionIntoDB,
};
