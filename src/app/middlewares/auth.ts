import { NextFunction, Request, Response } from "express";
import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";
import httpStatus from "http-status";
import AppError from "../Error/AppError";
import { jwtHelpers } from "../../helper/jwtHelpers";

const auth = () => {
  return async (
    req: Request & { user?: { id: string } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      // Extract token from cookies
      const token = req.cookies.auth_token;

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      // Verify the token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.accesToken_secret as Secret
      ) as JwtPayload;

      if (!verifiedUser.id) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token payload!");
      }

      // Attach user ID to the request object
      req.user = { id: verifiedUser.id };
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
