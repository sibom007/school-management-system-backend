import { Book, Chapter, Question, Role } from "@prisma/client";
import prisma from "../../../utils/prisma";
import { ITokenPayload } from "../../../types/types";
import AppError from "../../Error/AppError";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";

const AddQuestionIntoDB = async (token: string, payload: Question) => {
  const user = jwtHelpers.verifyToken(token, config.accesToken_secret!);
  const result = await prisma.question.create({
    data: {
      question: payload.question,
      answer: payload.answer,
      chapterId: payload.chapterId,
      userId: user.id,
      status: "PENDING",
    },
  });
  return result;
};

const GetQuestionIntoDB = async (token: string, chapterId: string) => {
  const user = jwtHelpers.verifyToken(token, config.accesToken_secret!);
  if (!user) {
    throw new AppError(400, "You are not authorized to perform this action");
  }
  const result = await prisma.question.findMany({
    where: { chapterId: chapterId },
  });
  return result;
};

const QuestionChangeStatusIntoDB = async (token: string, payload: Question) => {
  const user = await prisma.user.findUnique({
    where: {
      id: payload.userId,
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
const DeleteQuestionIntoDB = async (token: string, id: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
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
  GetQuestionIntoDB,
  QuestionChangeStatusIntoDB,
  DeleteQuestionIntoDB,
};
