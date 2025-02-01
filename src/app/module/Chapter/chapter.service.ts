import { Chapter } from "@prisma/client";
import prisma from "../../../utils/prisma";
import AppError from "../../Error/AppError";
import { IauthPayloadId } from "../../../types/types";
import { getUserById } from "../../../utils/getUser";

const GetChapterIntoDB = async (user: IauthPayloadId, chapterId: string) => {
  getUserById(user.id);
  const chapter = await prisma.chapter.findUniqueOrThrow({
    where: {
      id: chapterId,
    },
    include: {
      book: true,
      questions: { where: { status: "APPROVED" } },
    },
  });
  return chapter;
};
const GetAllChapterIntoDB = async (user: IauthPayloadId) => {
  getUserById(user.id);
  const chapter = await prisma.chapter.findMany({
    include: {
      book: true,
      questions: { where: { status: "APPROVED" } },
    },
  });
  return chapter;
};

const AddChapterIntoDB = async (user: IauthPayloadId, payload: Chapter) => {
  getUserById(user.id);
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
