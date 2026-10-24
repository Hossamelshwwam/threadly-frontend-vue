<template>
  <div
    class="p-6 border-b border-zinc-100 bg-zinc-50/50 flex items-center gap-4"
  >
    <div
      class="h-16 w-16 relative bg-white border border-zinc-200 rounded-lg overflow-hidden shrink-0"
    >
      <img
        :src="item.productId?.images?.[0] || '/placeholder.jpg'"
        alt="Product"
        class="absolute inset-0 h-full w-full object-cover"
      />
    </div>
    <div>
      <h2 class="font-black text-zinc-900 text-lg leading-tight">
        {{ item.productId?.name }}
      </h2>
      <p class="text-xs font-bold text-zinc-500 mt-1">
        Purchased from {{ item.sellerId?.storeName || "Threadly" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PendingReviewItem } from "../../types/review.types";

defineProps<{
  item: PendingReviewItem;
}>();
</script>

<style scoped></style>
