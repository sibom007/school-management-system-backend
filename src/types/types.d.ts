import { Role } from "@prisma/client";
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: any; // Adjust the type of `user` as needed
  }
}

export interface IauthPayloadId {
  id: string;
}
