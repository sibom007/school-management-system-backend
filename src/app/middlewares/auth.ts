import { NextFunction, Request, Response } from "express";
import config from "../../config";
import {
  JwtPayload,
  Secret,
  TokenExpiredError,
  JsonWebTokenError,
} from "jsonwebtoken";
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
      // Extract token from authorization header
      const token = req.headers.authorization?.split(" ")[1]; // Format: "Bearer <token>"
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }
      // Verify the token
      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.accesToken_secret as Secret
      );

      if (!verifiedUser) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          "Token expired Need to login1"
        );
      }

      // Attach user ID to the request object
      req.user = { id: verifiedUser.id };
      next();
    } catch (err) {
      if (err instanceof TokenExpiredError) {
        return next(new AppError(httpStatus.UNAUTHORIZED, "Token expired"));
      }
      if (err instanceof JsonWebTokenError) {
        return next(
          new AppError(
            httpStatus.UNAUTHORIZED,
            "Invalid token. Please log in again.1"
          )
        );
      }

      next(err); // Pass other errors to the error handler
    }
  };
};

export default auth;
