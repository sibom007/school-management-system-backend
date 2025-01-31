import { Book, Chapter } from "@prisma/client";
import { ITokenPayload } from "../../../types/types";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { jwtHelpers } from "../../../helper/jwtHelpers";
import config from "../../../config";

const GetChapterIntoDB = async (token: string, chapterId: string) => {
  const userId = jwtHelpers.verifyToken(
    token,
    config.accesToken_secret!
  ) as ITokenPayload;
  if (!userId) {
    throw new AppError(400, "user not found");
  }

  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: {
      id: chapterId,
    },
    include: {
      book: true,
      questions: true,
    },
  });
  return chapter;
};
const GetAllChapterIntoDB = async (token: string) => {
  if (!token) {
    throw new AppError(400, "Token is required");
  }
  const chapter = await prisma.chapter.findMany({
    include: {
      book: true,
      questions: true,
    },
  });
  return chapter;
};

const AddChapterIntoDB = async (token: string, payload: Chapter) => {
  if (!token) {
    throw new AppError(400, "Token is required");
  }

  const chapter = await prisma.chapter.create({
    data: {
      title: payload.title,
      content: payload.content,
      bookId: payload.bookId,
      chapter: payload.chapter,
    },
  });

  return chapter;
};

export const ChapterService = {
  GetChapterIntoDB,
  GetAllChapterIntoDB,
  AddChapterIntoDB,
};
