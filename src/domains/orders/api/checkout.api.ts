import { api } from "@/infrastructure/axios";
import type { ApiResponse } from "@/shared/types/api.types";
import type { Order, OrderItem } from "../types/order.types";

export const checkoutApi = {
  placeOrder: async (
    payload: any,
  ): Promise<ApiResponse<{ order: Order; orderItems: OrderItem[] }>> => {
    const { data } = await api.post("/orders", payload);
    return data;
  },
};
