import { apiClient } from "../../../lib/apiClient"
import type { Cart,CartItem } from "../types/cart"

export const getCart = async (): Promise<Cart> => {
  const response = await apiClient.get<Cart>("/api/cart")

  return response.data
}


export const addToCartApi = async (
  productId: number,
  quantity: number
): Promise<CartItem> => {
  const response = await apiClient.post<CartItem>(
    "/api/cart/item",
    {
      productId,
      quantity,
    }
  )

  return response.data
}