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
const GetSingleBookIntoDB = async (token: string, bookId: string) => {
  if (!token) {
    throw new AppError(400, "Token is required");
  }
  if (!bookId) {
    throw new AppError(400, "Book id is required");
  }
  const responce = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
    include: {
      user: true,
      chapters: true,
    },
  });
  return responce;
};

const AddBookIntoDB = async (Token: ITokenPayload, Book: Book) => {
  if (!Token) {
    throw new AppError(400, "Token is required");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Book.userId,
    },
  });

  if (!user) {
    throw new AppError(400, "User not found");
  }

  const result = await prisma.book.create({
    data: {
      name: Book.name,
      description: Book.description,
      class: Book.class,
      userId: user.id,
      chapterCount: Book.chapterCount,
    },
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
  GetSingleBookIntoDB,
  AddBookIntoDB,
  UpdateBookIntoDB,
};
