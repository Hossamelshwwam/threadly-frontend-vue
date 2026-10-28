<template>
  <div v-if="totalPages > 1" class="flex items-center justify-between">
    <p class="text-xs text-zinc-500">
      Showing page {{ page }} of {{ totalPages }}
      <span class="text-zinc-300 mx-1">·</span>
      {{ total }} total
    </p>
    <div class="flex items-center gap-2">
      <button
        @click="emit('page-change', Math.max(1, page - 1))"
        :disabled="page <= 1"
        class="px-3 py-1.5 text-xs font-semibold rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      <div class="flex items-center gap-1">
        <button
          v-for="pageNum in pageNumbers"
          :key="pageNum"
          @click="emit('page-change', pageNum)"
          :class="
            cn(
              'w-7 h-7 text-xs font-bold rounded-md transition-colors',
              pageNum === page
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-500 hover:bg-zinc-100',
            )
          "
        >
          {{ pageNum }}
        </button>
      </div>
      <button
        @click="emit('page-change', Math.min(totalPages, page + 1))"
        :disabled="page >= totalPages"
        class="px-3 py-1.5 text-xs font-semibold rounded-md border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { cn } from "@/shared/lib/utils";

const props = defineProps<{
  page: number;
  totalPages: number;
  total: number;
}>();

const emit = defineEmits<{
  "page-change": [page: number];
}>();

const pageNumbers = computed(() =>
  Array.from({ length: Math.min(props.totalPages, 5) }, (_, i) => {
    if (props.totalPages <= 5) {
      return i + 1;
    } else if (props.page <= 3) {
      return i + 1;
    } else if (props.page >= props.totalPages - 2) {
      return props.totalPages - 4 + i;
    } else {
      return props.page - 2 + i;
    }
  }),
);
</script>
