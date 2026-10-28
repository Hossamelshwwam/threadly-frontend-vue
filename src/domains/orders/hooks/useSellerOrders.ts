import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { sellerOrdersApi } from "../api/seller-orders.api";
import type {
  OrdersItemsParams,
  UpdateOrderItemPayload,
} from "../types/order.types";

export const sellerOrdersKeys = {
  all: ["orders"] as const,
  list: (params?: OrdersItemsParams) =>
    [...sellerOrdersKeys.all, "list", params] as const,
};

export function useSellerOrders(
  params?: MaybeRefOrGetter<OrdersItemsParams | undefined>,
) {
  const resolveParams = () => (params ? toValue(params) : undefined);

  return useQuery({
    queryKey: computed(() => sellerOrdersKeys.list(resolveParams())),
    queryFn: () => sellerOrdersApi.getSellerOrders(resolveParams()),
  });
}

export function useSellerOrderItem(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => [...sellerOrdersKeys.all, "detail", toValue(id)]),
    queryFn: () => sellerOrdersApi.getSellerOrderItem(toValue(id)),
    enabled: computed(() => !!toValue(id)),
  });
}

export function useUpdateSellerOrderStatus(itemId: MaybeRefOrGetter<string>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderItemPayload) =>
      sellerOrdersApi.updateOrderItemStatus(toValue(itemId), payload),
    onSuccess: () => {
      // Stream updates: clear both lists and details cache immediately
      queryClient.invalidateQueries({
        queryKey: [...sellerOrdersKeys.all, "detail", toValue(itemId)],
      });
      queryClient.invalidateQueries({
        queryKey: [...sellerOrdersKeys.all, "list"],
      });
    },
  });
}
