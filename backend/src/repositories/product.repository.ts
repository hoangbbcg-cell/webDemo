import { prisma } from "../lid/prisma";
import type { Prisma } from "../../generated/prisma/client";

export const getProducts = (
  skip: number,
  take: number,
  search: string,
  sort: "asc" | "desc",
) => {
  return prisma.product.findMany({
    where: {
      name: {
        contains: search,
      },
    },
    orderBy: {
      price: sort,
    },
    skip,
    take,
  });
};

export const getProductById = async (id: number) => {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      productCredentials: true,
    },
  });
};

// product.repository.ts
export const createProduct = async (data: {
  name: string;
  price: number;
  server: string;
  account: string;
  password: string;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      server: data.server,

      productCredentials: {
        create: {
          name: data.name,
          server: data.server,
          price: data.price,
          account: data.account,
          password: data.password,
        },
      },
    },
  });
};

export const deleteProduct = async (
  id: number,
  tx?: Prisma.TransactionClient,
) => {
  const db = tx ?? prisma;

  return db.product.delete({
    where: { id },
  });
};
