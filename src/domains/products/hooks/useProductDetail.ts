import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRef } from "vue";
import { publicProductsApi } from "../api/public-products.api";

export const productDetailKeys = {
  all: ["product-detail"] as const,
  bySlug: (slug: string) => [...productDetailKeys.all, slug] as const,
};

export function useProductDetail(slug: MaybeRef<string>) {
  return useQuery({
    queryKey: computed(() => productDetailKeys.bySlug(toValue(slug))),
    queryFn: () => publicProductsApi.getProductBySlug(toValue(slug)),
    enabled: computed(() => !!toValue(slug)),
  });
}
