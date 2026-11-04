import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { sellerPayoutsApi } from "../api/seller-payouts.api";
import type { SellerPayoutsParams } from "../types/payout.types";

export const sellerPayoutKeys = {
  all: ["seller-payouts"] as const,
  list: (params?: SellerPayoutsParams) =>
    [...sellerPayoutKeys.all, "list", params] as const,
  detail: (id: string) => [...sellerPayoutKeys.all, "detail", id] as const,
};

export function useSellerPayouts(
  params?: MaybeRefOrGetter<SellerPayoutsParams>,
) {
  const resolved = computed(() =>
    params === undefined ? undefined : toValue(params),
  );

  return useQuery({
    queryKey: computed(() => sellerPayoutKeys.list(resolved.value)),
    queryFn: () => sellerPayoutsApi.listMyPayouts(resolved.value),
  });
}

export function useSellerPayout(id: MaybeRefOrGetter<string>) {
  const resolved = computed(() => toValue(id));

  return useQuery({
    queryKey: computed(() => sellerPayoutKeys.detail(resolved.value)),
    queryFn: () => sellerPayoutsApi.getMyPayout(resolved.value),
    enabled: computed(() => !!resolved.value),
  });
}
