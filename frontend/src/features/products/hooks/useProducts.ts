import {
  getProducts,
  createProduct,
  getProductById,
} from "../api/product.api"

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query"

export const useProducts = (page = 1, search = "", sort = "asc") => {
  const queryClient = useQueryClient()

  const productsQuery = useQuery({
     queryKey: ["products", page,search,sort],
    queryFn: () => getProducts(page,search,sort),
  })

  const createProductMutation = useMutation({
    mutationFn: createProduct,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      })
    },
  })

  return {
    productsQuery,
    createProductMutation,
  }
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  })
}
