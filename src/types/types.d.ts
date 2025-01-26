import { Role } from "@prisma/client";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // Adjust the type of `user` as needed
  }
}

interface ITokenPayload {
  username: string;
  id: string;
  role: Role;
  id: string;
  iat: number;
  exp: number;
}
