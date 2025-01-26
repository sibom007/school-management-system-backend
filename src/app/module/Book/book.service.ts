import { Book } from "@prisma/client";
import AppError from "../../Error/AppError";
import prisma from "../../../utils/prisma";
import { ITokenPayload } from "../../../types/types";

const GetBookIntoDB = async (Token: string) => {
  if (!Token) {
    throw new AppError(400, "Token is required");
  }
  const responce = await prisma.book.findMany();
  return responce;
};

const AddBookIntoDB = async (Token: ITokenPayload, Book: Book) => {
  if (!Token) {
    throw new AppError(400, "Token is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Token.id,
    },
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const result = await prisma.$transaction(async (tr) => {
    const createdBook = await tr.book.create({
      data: {
        name: Book.name,
        description: Book.description,
        class: Book.class,
        userId: user.id,
        chapterCount: Book.chapterCount,
      },
    });

    // Create chapters based on chapterCount
    const chapters = [];
    for (let i = 1; i <= Book.chapterCount; i++) {
      const chapter = await tr.chapter.create({
        data: {
          title: `Chapter ${i}`,
          bookId: createdBook.id,
          content: `This is the content of chapter ${i}`,
          chapter: i,
        },
      });
      chapters.push(chapter);
    }
    return { createdBook, chapters };
  });

  return result;
};

const UpdateBookIntoDB = async (Token: ITokenPayload, Book: Book) => {
  if (!Token) {
    throw new AppError(400, "Token is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Token.id,
    },
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const result = await prisma.book.update({
    where: {
      id: Book.id,
    },
    data: {
      name: Book.name || undefined,
      description: Book.description || undefined,
      class: Book.class || undefined,
      userId: user.id,
      chapterCount: Book.chapterCount || undefined,
    },
  });
  return result;
};

export const BookService = {
  GetBookIntoDB,
  AddBookIntoDB,
  UpdateBookIntoDB,
};
