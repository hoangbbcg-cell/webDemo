import { prisma } from "../lid/prisma"
import type { Prisma } from "../../generated/prisma/client";


export const createProductCredential = async (
  userId: number,
  name: string,
  server: string,
  price: number,
  account: string,
  password: string,
) => {
  return prisma.productCredential.create({
    data: {
      userId,
      name,
      server,
      price,
      account,
      password,
    },
  })
}

export const getPurchasedProductsByUserId = async (
  userId: number,
) => {
  return prisma.productCredential.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  })
}

export const transferProductCredential = async (
  tx: Prisma.TransactionClient,
  productId: number,
  userId: number,
) => {
  return tx.productCredential.update({
    where: {
      productId,
    },
    data: {
      productId: null,
      userId,
    },
  })
}