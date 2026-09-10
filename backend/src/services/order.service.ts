import * as orderRepository from "../repositories/order.repository";
import { AppError } from "../errors/AppError";
import { prisma } from "../lid/prisma";
import { Prisma } from "../../generated/prisma/client";

export const createOrder = async (userId: number, productIds: number[]) => {
  try {
    return await prisma.$transaction(async (tx) => {
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
        include: { productCredentials: true },
        orderBy: { id: "asc" },
      });
      if (products.length !== productIds.length) {
        throw new AppError(409, "PRODUCT_UNAVAILABLE", "Một hoặc nhiều nick không còn được bán. Vui lòng kiểm tra lại giỏ hàng.");
      }
      for (const product of products) {
        if (product.quantity < 1 || !product.productCredentials || product.productCredentials.userId !== null) {
          throw new AppError(409, "PRODUCT_UNAVAILABLE", "Nick #" + product.id + " không còn được bán.");
        }
        const claimed = await tx.productCredential.updateMany({
          where: { productId: product.id, userId: null },
          data: { userId, productId: null },
        });
        if (claimed.count !== 1) {
          throw new AppError(409, "PRODUCT_UNAVAILABLE", "Nick vừa được người khác mua.");
        }
      }
      const order = await orderRepository.createOrder(tx, userId, products.map((product) => ({
        productId: product.id,
        name: product.name,
        server: product.server,
        price: Number(product.price),
      })));
      await tx.product.deleteMany({ where: { id: { in: productIds } } });
      return tx.order.findUniqueOrThrow({ where: { id: order.id }, include: { items: true } });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && ["P2025", "P2034"].includes(error.code)) {
      throw new AppError(409, "PRODUCT_UNAVAILABLE", "Nick vừa thay đổi. Vui lòng tải lại và thử lại.");
    }
    throw error;
  }
};

export const getOrdersByUserId = async (userId: number) => {
  return orderRepository.getOrdersByUserId(userId);
};
