import type {
  NextFunction,
  Request,
  Response,
} from "express"

import * as purchasedProductService
  from "../services/purchasedProduct.service"

export const getPurchasedProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user!.userId

    const products =
      await purchasedProductService.getPurchasedProductsByUserId(
        userId,
      )

    return res.json(products)
  } catch (error) {
    next(error)
  }
}