import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { ordersApi } from "../api/orders.api";
import type {
  OrdersParams,
  UpdateOrderItemPayload,
  AdminUpdateOrderPayload,
} from "../types/order.types";

export const orderKeys = {
  all: ["orders"] as const,
  adminList: (params?: OrdersParams) =>
    [...orderKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...orderKeys.all, "admin", "detail", id] as const,
};

export function useAdminOrders(params?: MaybeRefOrGetter<OrdersParams>) {
  const resolved = computed(() =>
    params === undefined ? undefined : toValue(params),
  );

  return useQuery({
    queryKey: computed(() => orderKeys.adminList(resolved.value)),
    queryFn: () => ordersApi.adminListOrders(resolved.value),
  });
}

export function useAdminOrderDetail(id: MaybeRefOrGetter<string>) {
  const resolved = computed(() => toValue(id));

  return useQuery({
    queryKey: computed(() => orderKeys.adminDetail(resolved.value)),
    queryFn: () => ordersApi.adminGetOrderDetail(resolved.value),
    enabled: computed(() => !!resolved.value),
  });
}

export function useAdminUpdateOrderStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: AdminUpdateOrderPayload;
    }) => ordersApi.adminUpdateOrder(id, payload),
    onSuccess: (_, variables) => {
      // Refresh the ledger table index and single detailed summary dashboards together
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.adminDetail(variables.id),
      });
    },
  });
}

export function useAdminUpdateOrderItem(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: UpdateOrderItemPayload;
    }) => ordersApi.adminUpdateOrderItem(itemId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: orderKeys.adminDetail(orderId),
      });
    },
  });
}
