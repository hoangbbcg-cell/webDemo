import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

import { addToCartApi } from "../services/cartApi"

export const useAddToCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      productId,
      quantity,
    }: {
      productId: number
      quantity: number
    }) => {
      return addToCartApi(productId, quantity)
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      })
    },
  })
}