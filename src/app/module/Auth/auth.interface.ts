import { Role } from "@prisma/client"

export type Tlogin = {
  username: string;
  password: string;
};

export type TToken = {
    id: string
    name: string
    email: string
    role: Role;
    createdAt: Date
    updatedAt: Date
}