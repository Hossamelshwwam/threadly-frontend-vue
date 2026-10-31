<template>
  <div
    class="bg-white rounded-xl border border-zinc-200 shadow-sm font-sans flex flex-col overflow-hidden"
  >
    <ProductReviewsHeader
      :total-reviews="totalReviews"
      :average-rating="averageRating"
    />

    <!-- Reviews List -->
    <div class="divide-y divide-zinc-100">
      <div
        v-if="isLoading"
        class="p-8 text-center text-zinc-400 text-sm animate-pulse"
      >
        Loading reviews...
      </div>

      <div
        v-else-if="reviews.length === 0"
        class="p-8 text-center text-zinc-500 text-sm"
      >
        No reviews have been submitted for this product yet.
      </div>

      <template v-else>
        <ProductReviewItem
          v-for="review in reviews"
          :key="review._id"
          :review="review"
          :is-row-deleting="isDeleting && deletingId === review._id"
          @delete="handleDelete"
        />
      </template>
    </div>

    <ProductReviewsPagination
      v-if="pagination && pagination.pages > 1"
      :pagination="pagination"
      @prev="prevPage"
      @next="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { toast } from "vue-sonner";

import { useProductReviews } from "../../hooks/useProductReviews";
import { useAdminDeleteReview } from "../../hooks/useAdminDeleteReview";
import type { GetProductReviewsParams } from "../../types/review.types";
import ProductReviewsHeader from "./ProductReviewsHeader.vue";
import ProductReviewItem from "./ProductReviewItem.vue";
import ProductReviewsPagination from "./ProductReviewsPagination.vue";

const props = defineProps<{
  productId: string;
}>();

const params = ref<GetProductReviewsParams>({
  page: 1,
  limit: 5,
  sort: "newest",
});

// Keep track of which review is currently being deleted so we can show a
// targeted loading spinner
const deletingId = ref<string | null>(null);

const { data: response, isLoading } = useProductReviews(
  toRef(props, "productId"),
  params,
);
const { mutateAsync: deleteReview, isPending: isDeleting } =
  useAdminDeleteReview(props.productId);

const reviews = computed(() => response.value?.data?.reviews || []);
const pagination = computed(() => response.value?.pagination);
const totalReviews = computed(() => response.value?.data?.totalReviews || 0);
const averageRating = computed(() => response.value?.data?.averageRating || 0);

const handleDelete = (reviewId: string) => {
  deletingId.value = reviewId;
  toast.promise(deleteReview(reviewId), {
    loading: "Deleting review...",
    success: () => {
      deletingId.value = null;
      return "Review deleted successfully!";
    },
    error: "Failed to delete review",
  });
};

const prevPage = () => {
  params.value = { ...params.value, page: (params.value.page ?? 1) - 1 };
};

const nextPage = () => {
  params.value = { ...params.value, page: (params.value.page ?? 1) + 1 };
};
</script>
