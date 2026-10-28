<template>
  <div
    class="bg-white border border-zinc-200 rounded-xl shadow-xs font-sans p-4 sm:p-5"
  >
    <div
      class="flex flex-col xl:flex-row xl:items-center justify-between gap-6 xl:gap-4"
    >
      <!-- Rating Filters -->
      <div class="space-y-2.5">
        <span
          class="text-xs font-bold text-zinc-400 uppercase tracking-wider block"
        >
          Rating
        </span>
        <!-- FIX: Added `flex-wrap` and adjusted gap so pills stack cleanly on mobile -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            v-for="opt in RATING_OPTIONS"
            :key="opt.label"
            type="button"
            @click="emit('rating-change', opt.value)"
            :class="
              cn(
                'text-xs font-semibold px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-md transition-colors whitespace-nowrap cursor-pointer',
                activeRating === opt.value
                  ? 'bg-amber-400 text-white shadow-sm'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
              )
            "
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Sort Filters -->
      <div class="space-y-2.5">
        <span
          class="text-xs font-bold text-zinc-400 uppercase tracking-wider block"
        >
          Sort By
        </span>
        <!-- FIX: Added `flex-wrap` so options wrap gracefully on small phones -->
        <div class="flex flex-wrap items-center gap-2 sm:gap-2.5">
          <button
            v-for="opt in SORT_OPTIONS"
            :key="opt.label"
            type="button"
            @click="emit('sort-change', opt.value)"
            :class="
              cn(
                'text-xs font-semibold px-4 py-2 sm:px-3.5 sm:py-1.5 rounded-lg sm:rounded-md transition-colors whitespace-nowrap cursor-pointer',
                activeSort === opt.value
                  ? 'bg-zinc-800 text-white shadow-sm'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
              )
            "
          >
            {{ opt.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";
import type { SortOption } from "../../types/review.types";

const RATING_OPTIONS: { label: string; value: number | null }[] = [
  { label: "All Ratings", value: null },
  { label: "5★", value: 5 },
  { label: "4★", value: 4 },
  { label: "3★", value: 3 },
  { label: "2★", value: 2 },
  { label: "1★", value: 1 },
];

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Highest Rating", value: "rating_desc" },
  { label: "Lowest Rating", value: "rating_asc" },
];

defineProps<{
  activeRating: number | null;
  activeSort: SortOption;
}>();

const emit = defineEmits<{
  "rating-change": [rating: number | null];
  "sort-change": [sort: SortOption];
}>();
</script>
