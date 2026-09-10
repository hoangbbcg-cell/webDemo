import { apiClient } from "../../../lib/apiClient"
import type { PurchasedProduct } from "../types/purchasedProduct.types"

export const getPurchasedProductsApi = async (
) : Promise<PurchasedProduct[]> => {
  const response = await apiClient.get<PurchasedProduct[]>(
    `/api/purchased-products`,
  )

  return response.data
}