<template>
  <aside class="w-full lg:w-64 shrink-0">
    <div class="sticky top-24">
      <div
        class="lg:bg-white rounded-xl lg:shadow-sm lg:border lg:border-zinc-100 p-5 space-y-6"
      >
        <!-- Header -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <h2
              class="text-sm font-semibold tracking-wider uppercase text-zinc-900"
            >
              Filters
            </h2>
            <span
              v-if="appliedFilterCount > 0"
              class="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-white"
            >
              {{ appliedFilterCount }}
            </span>
          </div>
          <div class="flex items-center gap-1">
            <button
              v-if="showClose"
              @click="$emit('close')"
              class="lg:hidden p-1.5 text-zinc-400 hover:text-zinc-600 rounded-lg hover:bg-zinc-100 transition-all"
            >
              <X :size="16" />
            </button>
          </div>
        </div>

        <!-- Search -->
        <div>
          <label
            class="block text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-2.5"
          >
            Search
          </label>
          <div class="relative">
            <Search
              class="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm"
            />
            <input
              type="text"
              :value="filters.search ?? ''"
              @input="onSearchInput"
              placeholder="Search products..."
              class="w-full bg-white border border-zinc-200 text-sm rounded-lg pl-9 pr-3 py-2.5 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/20 transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        <hr class="border-zinc-100" />

        <!-- Sort -->
        <SortFilter
          :value="filters.sort"
          @change="$emit('filter-change', 'sort', $event)"
        />

        <hr class="border-zinc-100" />

        <!-- Category -->
        <CategoryFilter
          :selected="filters.category"
          @select="$emit('filter-change', 'category', $event)"
        />

        <hr class="border-zinc-100" />

        <!-- Price -->
        <PriceFilter
          :min="filters.minPrice"
          :max="filters.maxPrice"
          @change="onPriceChange"
        />

        <!-- Actions -->
        <div class="space-y-2 pt-2">
          <button
            @click="$emit('apply')"
            class="w-full bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-lg py-2.5 transition-colors"
          >
            Apply Filters
          </button>
          <button
            @click="$emit('reset')"
            class="w-full bg-zinc-50 hover:bg-zinc-100 text-zinc-600 text-sm font-medium rounded-lg py-2.5 transition-colors border border-zinc-200"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Search, X } from "lucide-vue-next";
import SortFilter from "./SortFilter.vue";
import CategoryFilter from "./CategoryFilter.vue";
import PriceFilter from "./PriceFilter.vue";

export interface FiltersState {
  category?: string;
  sort?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

withDefaults(
  defineProps<{
    filters: FiltersState;
    appliedFilterCount?: number;
    showClose?: boolean;
  }>(),
  {
    appliedFilterCount: 0,
    showClose: false,
  },
);

const emit = defineEmits<{
  (e: "filter-change", key: string, value: string | undefined): void;
  (e: "apply"): void;
  (e: "reset"): void;
  (e: "close"): void;
}>();

function onSearchInput(e: Event) {
  const value = (e.target as HTMLInputElement).value;
  emit("filter-change", "search", value || undefined);
}

function onPriceChange(
  key: "minPrice" | "maxPrice",
  value: string | undefined,
) {
  emit("filter-change", key, value);
}
</script>

<style scoped></style>
