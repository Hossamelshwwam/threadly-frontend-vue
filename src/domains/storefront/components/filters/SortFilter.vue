<template>
  <div>
    <label
      class="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5"
    >
      <ArrowUpDown :size="14" />
      Sort By
    </label>
    <div class="space-y-0.5">
      <button
        v-for="opt in SORT_OPTIONS"
        :key="opt.value"
        @click="$emit('change', value === opt.value ? undefined : opt.value)"
        :aria-pressed="value === opt.value"
        :class="[
          'w-full text-left text-sm px-3 py-2 rounded-lg transition-colors',
          value === opt.value
            ? 'bg-main text-main-subtle font-medium'
            : 'text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50',
        ]"
      >
        {{ opt.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowUpDown } from "lucide-vue-next";

const SORT_OPTIONS = [
  { value: "rating", label: "Top Rated" },
  { value: "newest", label: "Newest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
] as const;

defineProps<{
  value?: string;
}>();

defineEmits<{
  (e: "change", value: string | undefined): void;
}>();
</script>

<style scoped></style>
