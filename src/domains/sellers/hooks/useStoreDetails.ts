import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRef } from "vue";
import { sellerStoreApi } from "../api/seller-store.api";

export function useStoreDetails(slug: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => ["store", toValue(slug)]),
    queryFn: () => sellerStoreApi.getStoreDetails(toValue(slug)),
    enabled: computed(() => !!toValue(slug)),
  });
}
