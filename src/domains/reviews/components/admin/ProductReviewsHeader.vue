<template>
  <!-- Header & Summary -->
  <div
    class="p-6 border-b border-zinc-100 bg-zinc-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
  >
    <div>
      <h3 class="text-sm font-bold text-zinc-900 flex items-center gap-2">
        <MessageSquare :size="14" class="text-zinc-400" />
        Customer Reviews
      </h3>
      <p class="text-xs text-zinc-500 mt-1">
        Monitor and moderate feedback for this product.
      </p>
    </div>

    <div
      v-if="totalReviews > 0"
      class="flex items-center gap-3 bg-white px-4 py-2 rounded-lg border border-zinc-200 shadow-xs"
    >
      <div class="flex items-center gap-1 text-amber-400">
        <Star :size="18" fill="currentColor" />
        <span class="text-lg font-black text-zinc-900 leading-none">
          {{ averageRating.toFixed(1) }}
        </span>
      </div>
      <div class="w-px h-6 bg-zinc-200"></div>
      <span class="text-xs font-semibold text-zinc-500">
        {{ totalReviews }} Reviews
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MessageSquare, Star } from "lucide-vue-next";

defineProps<{
  totalReviews: number;
  averageRating: number;
}>();
</script>
