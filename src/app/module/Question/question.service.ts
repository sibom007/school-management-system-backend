import { Question, QuestionStatus, Role } from "@prisma/client";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { IauthPayloadId } from "../../../types/types";
import { getUserById } from "../../../utils/getUser";

const AddQuestionIntoDB = async (user: IauthPayloadId, payload: Question) => {
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

const GetQuestionIntoDB = async (chapterId: string) => {
  const result = await prisma.question.findMany({
    where: { chapterId: chapterId, status: "APPROVED" },
  });
  return result;
};

const GetUserQuestionIntoDB = async (
  user: IauthPayloadId,
  status?: QuestionStatus | ""
) => {
  const result = await prisma.question.findMany({
    where: {
      userId: user.id,
      ...(status ? { status } : {}),
    },
  });
  return result;
};

const GetPandingQuestionIntoDB = async () => {
  const result = await prisma.question.findMany({
    where: { status: "PENDING" },
  });
  return result;
};

const QuestionChangeStatusIntoDB = async (
  userId: IauthPayloadId,
  payload: Question
) => {
  const user = await getUserById(userId.id);
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

const DeleteQuestionIntoDB = async (id: string) => {
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
  GetPandingQuestionIntoDB,
  QuestionChangeStatusIntoDB,
  GetUserQuestionIntoDB,
  DeleteQuestionIntoDB,
};
