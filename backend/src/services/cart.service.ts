import {
  createCart,
  createCartItem,
  getCartByUserId,
  getCartItem,
} from "../repositories/cart.repository"

import { AppError } from "../errors/AppError"

export const getCart = async (userId: number) => {
  let cart = await getCartByUserId(userId)

  if (!cart) {
    await createCart(userId)
    cart = await getCartByUserId(userId)
  }

  return cart
}

export const addToCart = async (
  userId: number,
  productId: number,
) => {
  let cart = await getCartByUserId(userId)

  if (!cart) {
    await createCart(userId)
    cart = await getCartByUserId(userId)
  }

  if (!cart) {
    throw new AppError(
      500,
      "CART_CREATE_FAILED",
      "Không thể tạo giỏ hàng"
    )
  }

  const cartItem = await getCartItem(
    cart.id,
    productId
  )

  if (cartItem) {
    return cartItem
  }

  return createCartItem(
    cart.id,
    productId
  )
}