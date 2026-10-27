import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { sellerProductsApi } from "../api/seller-products.api";
import type { ProductsParams } from "../types/product.types";

const sellerProductsKey = {
  all: ["products"],
  sellerList: (params?: ProductsParams) =>
    [...sellerProductsKey.all, "seller", "list", params] as const,
  sellerDetail: (id: string) =>
    [...sellerProductsKey.all, "seller", "detail", id] as const,
};

export function useSellerProducts(
  params?: MaybeRefOrGetter<ProductsParams | undefined>,
) {
  const resolveParams = () => (params ? toValue(params) : undefined);

  return useQuery({
    queryKey: computed(() => sellerProductsKey.sellerList(resolveParams())),
    queryFn: () => sellerProductsApi.getSellerProducts(resolveParams()),
  });
}

export function useSellerProduct(id: MaybeRefOrGetter<string>) {
  return useQuery({
    queryKey: computed(() => sellerProductsKey.sellerDetail(toValue(id))),
    queryFn: () => sellerProductsApi.getSellerProduct(toValue(id)),
    enabled: computed(() => !!toValue(id)),
  });
}
