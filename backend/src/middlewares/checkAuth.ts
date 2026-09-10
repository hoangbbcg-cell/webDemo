import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { Role } from "../../generated/prisma/client";

import { AppError } from "../errors/AppError";

export const checkAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(
      new AppError(401, "INVALID_ACCESS_TOKEN", "Access token không hợp lệ"),
    );
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return next(
      new AppError(401, "INVALID_ACCESS_TOKEN", "Access token không hợp lệ"),
    );
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as {
      userId: number;
      role: Role;
    };

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    return next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(
        new AppError(401, "ACCESS_TOKEN_EXPIRED", "Access token expired"),
      );
    }

    return next(
      new AppError(401, "INVALID_ACCESS_TOKEN", "Invalid access token"),
    );
  }
};

export const checkRole = (...allowedRoles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(401, "UNAUTHORIZED", "Bạn chưa đăng nhập"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          403,
          "FORBIDDEN",
          "Bạn không có quyền thực hiện chức năng này",
        ),
      );
    }

    return next();
  };
};
