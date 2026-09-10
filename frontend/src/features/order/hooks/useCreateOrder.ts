import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createOrderApi } from "../api/order.api"

export const useCreateOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createOrderApi,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      })

      queryClient.invalidateQueries({
        queryKey: ["purchased-products"],
      })

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      })
      queryClient.invalidateQueries({
        queryKey:["cart"]
      })
    },
  })
}