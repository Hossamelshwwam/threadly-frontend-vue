<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-sans shadow-sm"
  >
    <span
      class="text-xs font-bold text-zinc-400 uppercase tracking-wider block"
    >
      Visibility Filter
    </span>

    <div class="flex items-center gap-1.5 sm:gap-2 w-full sm:w-auto">
      <button
        v-for="f in ACTIVE_FILTERS"
        :key="f.label"
        type="button"
        @click="activeFilter = f.value"
        :class="
          cn(
            'flex-1 sm:flex-none text-xs font-semibold px-2 py-2.5 sm:px-4 sm:py-1.5 rounded-lg sm:rounded-md transition-colors cursor-pointer text-center whitespace-nowrap',
            activeFilter === f.value
              ? 'bg-amber-400 text-white shadow-sm'
              : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
          )
        "
      >
        {{ f.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";

const ACTIVE_FILTERS: { label: string; value: boolean | null }[] = [
  { label: "All", value: null },
  { label: "Active Only", value: true },
  { label: "Inactive Only", value: false },
];

const activeFilter = defineModel<boolean | null>("activeFilter", {
  required: true,
});
</script>
