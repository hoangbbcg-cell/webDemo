// purchasedProduct.service.ts

import * as purchasedProductRepository
  from "../repositories/purchasedProduct.repository"

export const getPurchasedProductsByUserId = async (
  userId: number,
) => {
  return purchasedProductRepository.getPurchasedProductsByUserId(
    userId,
  )
}