import { Book, Chapter } from "@prisma/client";
import { ITokenPayload } from "../../../types/types";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";

const GetChapterIntoDB = async (token: ITokenPayload, chapterId: string) => {
  if (!token) {
    throw new AppError(400, "Token is required");
  }
  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: {
      id: chapterId,
    },
  });
  return chapter;
};

export const ChapterService = {
  GetChapterIntoDB,
};
