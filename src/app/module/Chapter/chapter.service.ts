import { Book, Chapter } from "@prisma/client";
import { ITokenPayload } from "../../../types/types";
import prisma from "../../../utils/prisma";

const AddChapterIntoDB = async (token: ITokenPayload, payload: Chapter) => {
  const result = await prisma.$transaction(async (tr) => {
    const createdChapter = await tr.chapter.create({
      data: {
        title: payload.title,
        content: payload.content,
        bookId: payload.bookId,
        chapter: payload.chapter,
      },
    });

    await tr.book.update({
      where: {
        id: payload.bookId,
      },
      data: {
        chapters: {
          connect: {
            id: createdChapter.id,
          },
        },
      },
    });

    return createdChapter;
  });

  return result;
};

export const BookService = {
  AddChapterIntoDB,
};
