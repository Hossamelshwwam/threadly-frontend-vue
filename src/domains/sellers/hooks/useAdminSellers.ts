import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { sellersApi } from "../api/sellers.api";
import type { AdminSellersParams } from "../types/seller.types";

export const sellerKeys = {
  all: ["sellers"] as const,
  adminList: (params?: AdminSellersParams) =>
    [...sellerKeys.all, "admin", "list", params] as const,
  adminDetail: (id: string) =>
    [...sellerKeys.all, "admin", "detail", id] as const,
};

export function useAdminSellers(
  params?: MaybeRefOrGetter<AdminSellersParams | undefined>,
) {
  const resolveParams = () => (params ? toValue(params) : undefined);

  return useQuery({
    queryKey: computed(() => sellerKeys.adminList(resolveParams())),
    queryFn: () => sellersApi.adminListSellers(resolveParams()),
  });
}

export function useAdminSeller(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => sellerKeys.adminDetail(toValue(id))),
    queryFn: () => sellersApi.adminGetSeller(toValue(id)),
    enabled: computed(() => !!toValue(id)),
  });
}
