import { useAuthStore } from "../../auth/stores/authStores"
import { useQuery } from "@tanstack/react-query"
import { getPurchasedProductsApi } from "../api/purchasedProduct.api"

export const usePurchasedProducts = () => {
  const userId = useAuthStore((state) => state.user?.id)
  return useQuery({
    queryKey: ["purchased-products", userId],
    queryFn: getPurchasedProductsApi,
    enabled: !!userId,
  })
}
