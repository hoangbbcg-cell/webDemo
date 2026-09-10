import { apiClient } from "../../../lib/apiClient";
import type { Product, CreateProductInput } from "../types/product.types";

export const getProducts = async (
  page: number,
  search: string,
  sort: string,
): Promise<Product[]> => {
  const response = await apiClient.get<Product[]>("/api/products", {
    params: {
      page,
      limit: 20,
      search,
      sort,
    },
  });

  return response.data;
};

export const createProduct = async (
  data: CreateProductInput,
): Promise<Product> => {
  const response = await apiClient.post<Product>("/api/products", data);

  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get<Product>(`/api/products/${id}`);

  return response.data;
};

export const deleteProductById = async (id: number) => {
  const response = await apiClient.delete(`/api/products/${id}`);
  return response.data;
};
