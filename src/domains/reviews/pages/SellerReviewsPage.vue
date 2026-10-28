<template>
  <div
    v-if="storeLoading"
    class="flex flex-col items-center justify-center h-[60vh]"
  >
    <LoaderCircle :size="36" class="text-4xl text-amber-500 animate-spin mb-4" />
  </div>

  <div v-else class="space-y-6 font-sans max-w-6xl mx-auto">
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"
      >
        <MessageSquare :size="20" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-zinc-900">My Reviews</h1>
        <p class="text-xs text-zinc-500 mt-0.5">
          What customers are saying about your products.
        </p>
      </div>
    </div>

    <SellerReviewsFilterBar
      :active-rating="rating"
      :active-sort="sort"
      @rating-change="handleRatingChange"
      @sort-change="handleSortChange"
    />

    <div class="overflow-hidden">
      <SellerReviewListSkeleton v-if="isLoading" />
      <SellerReviewEmptyState
        v-else-if="reviews.length === 0"
        :has-active-filter="rating !== null"
        @clear="handleClearFilters"
      />
      <div v-else class="divide-y divide-zinc-100">
        <SellerReviewCard
          v-for="review in reviews"
          :key="review._id"
          :review="review"
        />
      </div>
    </div>

    <SellerReviewPagination
      v-if="pagination"
      :page="page"
      :total-pages="pagination.pages"
      :total="pagination.total"
      @page-change="handlePageChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { LoaderCircle, MessageSquare } from "lucide-vue-next";

import { useSellerReviews } from "../hooks/useSellerReviews";
import { useGetMyStore } from "@/domains/sellers/hooks/useGetMyStore";
import SellerReviewsFilterBar from "../components/seller/SellerReviewsFilterBar.vue";
import SellerReviewCard from "../components/seller/SellerReviewCard.vue";
import SellerReviewListSkeleton from "../components/seller/SellerReviewListSkeleton.vue";
import SellerReviewEmptyState from "../components/seller/SellerReviewEmptyState.vue";
import SellerReviewPagination from "../components/seller/SellerReviewPagination.vue";
import type { SellerReviewsParams, SortOption } from "../types/review.types";

const rating = ref<number | null>(null);
const sort = ref<SortOption>("newest");
const page = ref(1);
const limit = 10;

const { isLoading: storeLoading } = useGetMyStore();

const params = computed<SellerReviewsParams>(() => ({
  rating: rating.value ?? undefined,
  sort: sort.value,
  page: page.value,
  limit,
}));

const { data: response, isLoading } = useSellerReviews(params);

const reviews = computed(() => response.value?.data ?? []);
const pagination = computed(() => response.value?.pagination);

const handleRatingChange = (newRating: number | null) => {
  rating.value = newRating;
  page.value = 1;
};

const handleSortChange = (newSort: SortOption) => {
  sort.value = newSort;
  page.value = 1;
};

const handleClearFilters = () => {
  rating.value = null;
  page.value = 1;
};

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};
</script>
