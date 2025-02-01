import { Book } from "@prisma/client";
import AppError from "../../Error/AppError";
import prisma from "../../../utils/prisma";
import { IauthPayloadId } from "../../../types/types";
import { getUserById } from "../../../utils/getUser";

const GetBookIntoDB = async (user: IauthPayloadId) => {
  getUserById(user.id);
  const responce = await prisma.book.findMany();
  return responce;
};
const GetSingleBookIntoDB = async (user: IauthPayloadId, bookId: string) => {
  getUserById(user.id);
  if (!bookId) {
    throw new AppError(400, "Book id is required");
  }
  const responce = await prisma.book.findFirst({
    where: {
      id: bookId,
    },
    include: {
      user: true,
      chapters: { include: { questions: { where: { status: "APPROVED" } } } },
    },
  });
  return responce;
};

const AddBookIntoDB = async (user: IauthPayloadId, Book: Book) => {
  getUserById(user.id);
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

const UpdateBookIntoDB = async (user: IauthPayloadId, Book: Book) => {
  getUserById(user.id);
  const result = await prisma.book.update({
    where: {
      id: Book.id,
    },
    data: {
      name: Book.name || undefined,
      description: Book.description || undefined,
      class: Book.class || undefined,
      userId: user?.id,
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
