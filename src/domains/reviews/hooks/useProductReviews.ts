import { useQuery } from "@tanstack/vue-query";
import { computed, toValue, type MaybeRef } from "vue";
import { reviewsApi } from "../api/reviews.api";
import type { GetProductReviewsParams } from "../types/review.types";

export function useProductReviews(
  productId: MaybeRef<string>,
  params?: MaybeRef<GetProductReviewsParams>,
) {
  return useQuery({
    queryKey: ["product-reviews", productId, params],
    queryFn: () =>
      reviewsApi.getProductReviews(toValue(productId), toValue(params)),
    enabled: computed(() => !!toValue(productId)),
  });
}
