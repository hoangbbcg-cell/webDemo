// refreshToken.repository.ts

import { prisma } from "../lid/prisma"

export const createRefreshTokenRecord = async (
  userId: number,
  token: string,
  expiresAt: Date
) => {
  return prisma.refreshToken.create({
    data: {
      userId,
      token,
      expiresAt,
    },
  })
}


export const deleteRefreshToken = async (
  token: string
) => {
  return prisma.refreshToken.delete({
    where: {
      token,
    },
  })
}

export const findRefreshToken = async (
  token: string
) => {
  return prisma.refreshToken.findUnique({
    where: {
      token,
    },
  })
}