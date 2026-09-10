import jwt from "jsonwebtoken"
import type { Role } from "../../generated/prisma/client"


import { AppError } from "../errors/AppError"

export const createAccessToken = (userId: number,role:Role) => {
  return jwt.sign(
    {
      userId,
      role,
    },
    process.env.JWT_ACCESS_SECRET as string,
    {
      expiresIn: "15m",
    }
  )
}

export const createRefreshToken = (userId: number) => {
  return jwt.sign(
    {
      userId,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  )
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string
    ) as {
      userId: number
    }
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(
        401,
        "REFRESH_TOKEN_EXPIRED",
        "Refresh token expired"
      )
    }

    throw new AppError(
      401,
      "INVALID_REFRESH_TOKEN",
      "Invalid refresh token"
    )
  }
}