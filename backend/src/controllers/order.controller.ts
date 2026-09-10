import type {
  NextFunction,
  Request,
  Response,
} from "express"

import * as orderService from "../services/order.service"

export const createOrderController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { productIds } = req.body

    const userId = req.user!.userId

    const order = await orderService.createOrder(
      userId,
      productIds,
    )

    return res.status(201).json(order)
  } catch (error) {
    next(error)
  }
}

export const getMyOrdersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId

    const orders = await orderService.getOrdersByUserId(userId)

    return res.json(orders)
  } catch (error) {
    next(error)
  }
}