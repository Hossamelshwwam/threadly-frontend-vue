import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/vue-query";
import { buyerOrdersApi } from "../api/orders.api";
import type { OrdersParams } from "../types/order.types";

export function useMyOrders(params: OrdersParams) {
  return useQuery({
    queryKey: ["my-orders", params],
    queryFn: () => buyerOrdersApi.getMyOrders(params),
    placeholderData: keepPreviousData,
  });
}

export function useBuyerOrder(id: string) {
  return useQuery({
    queryKey: ["my-orders", "detail", id],
    queryFn: () => buyerOrdersApi.getBuyerOrder(id),
    enabled: !!id,
  });
}

export function useCancelOrderItem(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (itemId: string) => buyerOrdersApi.cancelOrderItem(itemId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-orders", "detail", orderId],
      });
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
    },
  });
}
