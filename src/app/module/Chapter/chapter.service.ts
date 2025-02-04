import { Chapter } from "@prisma/client";
import prisma from "../../../utils/prisma";

const GetChapterIntoDB = async (chapterId: string) => {
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
const GetAllChapterIntoDB = async () => {
  const chapter = await prisma.chapter.findMany({
    include: {
      book: true,
      questions: { where: { status: "APPROVED" } },
    },
  });
  return chapter;
};

const AddChapterIntoDB = async (payload: Chapter) => {
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
