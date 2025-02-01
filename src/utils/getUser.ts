import AppError from "../app/Error/AppError";
import prisma from "./prisma";

export const getUserById = async (id: string) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id, // `status` cannot be used in `findUnique`
    },
    select: {
      id: true,
      username: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  // Check status separately
  if (!user || user.status !== "ACTIVE") {
    throw new AppError(400, "User not found or inactive");
  }

  return user;
};
