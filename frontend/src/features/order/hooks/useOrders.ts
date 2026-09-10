import { useAuthStore } from "../../auth/stores/authStores"
import { useQuery } from "@tanstack/react-query"
import { getOrdersByUserIdApi } from "../api/order.api"

export const useOrders = () => {
  const userId = useAuthStore((state) => state.user?.id)
  return useQuery({
    queryKey: ["orders", userId],
    queryFn: getOrdersByUserIdApi,
    enabled: !!userId,
  })
}
