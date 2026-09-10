// cart.controller.ts

import type { NextFunction, Request, Response } from "express"
import { getCart ,addToCart} from "../services/cart.service"

export const getCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId

    const cart = await getCart(userId)

    return res.json(cart)
  } catch (error) {
    next(error)
  }
}

export const addToCartController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.userId 

    const { productId } = req.body

    const cartItem = await addToCart(
      userId,
      Number(productId),
    )

    return res.status(201).json(cartItem)
  } catch (error) {
    next(error)
  }
}