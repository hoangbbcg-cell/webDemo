import { useAuthStore } from "../../auth/stores/authStores"
import { useQuery } from "@tanstack/react-query"
import { getCart } from "../services/cartApi"

export const useCart = () => {
  const userId = useAuthStore((state) => state.user?.id)
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: getCart,
    enabled: !!userId,
  })
}