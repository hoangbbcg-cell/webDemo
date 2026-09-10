import { prisma } from "../lid/prisma";
import type { Prisma } from "../../generated/prisma/client";

type OrderProduct = {
  productId: number
  name: string
  server: string
  price: number
}

export const createOrder = async (
  tx: Prisma.TransactionClient,
  userId: number,
  products:OrderProduct[]
) => {
  return tx.order.create({
    data: {
      userId,

       items: {
        create: products.map((product) => ({
          productId: product.productId,
          name: product.name,
          server: product.server,
          price: product.price,
          quantity: 1,
        })),
      },
    },
    include: {
      items: true,
    },
  });
};
export const getOrdersByUserId = async (userId: number) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
