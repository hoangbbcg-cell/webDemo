import { apiClient } from "../../../lib/apiClient";
import type { CreateOrderData, Order } from "../types/order.types";

import { getCsrfTokenApi } from "../../auth/api/csrf.api";

export const createOrderApi = async (data: CreateOrderData) => {
  const csrfToken = await getCsrfTokenApi();

  const response = await apiClient.post<Order>(
    "/api/orders",
     data ,
    {
      headers: {
        "x-csrf-token": csrfToken,
      },
    },
  );

  return response.data;
};

export const getOrdersByUserIdApi = async (): Promise<Order[]> => {
  const response = await apiClient.get(`/api/orders`);

  return response.data;
};
