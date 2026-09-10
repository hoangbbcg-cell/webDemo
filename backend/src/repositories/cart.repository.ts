// src/features/cart/cart.repository.ts

import { prisma } from "../lid/prisma"

export const getCartByUserId = async (userId: number) => {
  return prisma.cart.findUnique({
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
  })
}

export const createCart = async (userId: number) => {
  return prisma.cart.create({
    data: {
      userId,
    },
  })
}

export const getCartItem = async (
  cartId: number,
  productId: number
) => {
  return prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
      },
    },
  })
}

export const createCartItem = async (
  cartId: number,
  productId: number,
) => {
  return prisma.cartItem.create({
    data: {
      cartId,
      productId,
    },
  })
}