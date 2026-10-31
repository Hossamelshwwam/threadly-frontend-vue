<template>
  <!-- Pagination Controls -->
  <div
    class="p-4 border-t border-zinc-100 flex items-center justify-between bg-zinc-50"
  >
    <p class="text-xs text-zinc-500 font-medium">
      Page {{ pagination.page }} of {{ pagination.pages }}
    </p>
    <div class="flex gap-2">
      <CustomButton
        variant="outline"
        theme="neutral"
        size="sm"
        :disabled="pagination.page === 1"
        @click="emit('prev')"
      >
        Previous
      </CustomButton>
      <CustomButton
        variant="outline"
        theme="neutral"
        size="sm"
        :disabled="pagination.page === pagination.pages"
        @click="emit('next')"
      >
        Next
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductReviewsResponse } from "../../types/review.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

defineProps<{
  pagination: ProductReviewsResponse["pagination"];
}>();

const emit = defineEmits<{
  prev: [];
  next: [];
}>();
</script>
