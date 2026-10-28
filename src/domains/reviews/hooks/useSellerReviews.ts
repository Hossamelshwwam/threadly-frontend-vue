import { computed, toValue, type MaybeRefOrGetter } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { sellerReviewsApi } from "../api/seller-reviews.api";
import type { SellerReviewsParams } from "../types/review.types";

export const sellerReviewKeys = {
  all: ["seller-reviews"] as const,
  list: (params?: SellerReviewsParams) =>
    [...sellerReviewKeys.all, "list", params] as const,
};

export function useSellerReviews(
  params?: MaybeRefOrGetter<SellerReviewsParams | undefined>,
) {
  const resolveParams = () => (params ? toValue(params) : undefined);

  return useQuery({
    queryKey: computed(() => sellerReviewKeys.list(resolveParams())),
    queryFn: () => sellerReviewsApi.listSellerReviews(resolveParams()),
  });
}
