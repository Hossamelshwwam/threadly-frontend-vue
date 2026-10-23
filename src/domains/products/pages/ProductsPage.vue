<template>
  <div class="container mx-auto px-8 py-8 pt-28">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold text-zinc-900 text-balance">Products</h1>
        <p class="text-sm text-zinc-500 mt-1">
          {{
            totalCount !== undefined
              ? `${totalCount} products available`
              : "Browse our collection"
          }}
        </p>
      </div>
      <button
        @click="mobileFilterOpen = true"
        class="lg:hidden flex items-center gap-2 text-sm font-medium text-zinc-600 bg-white border border-zinc-200 rounded-xl px-4 py-2.5 hover:border-amber-300 hover:text-amber-600 transition-all"
      >
        <ListFilter :size="16" />
        Filters
        <span
          v-if="appliedFilterCount > 0"
          class="flex items-center justify-center w-5 h-5 rounded-full bg-amber-500 text-[10px] font-bold text-white"
        >
          {{ appliedFilterCount }}
        </span>
      </button>
    </div>

    <div class="flex gap-10">
      <div class="hidden lg:block">
        <FilterSidebar
          :filters="draftFilters"
          :applied-filter-count="appliedFilterCount"
          @filter-change="handleFilterChange"
          @apply="handleApply"
          @reset="handleReset"
        />
      </div>

      <MobileFilterSheet
        :open="mobileFilterOpen"
        :filters="draftFilters"
        :applied-filter-count="appliedFilterCount"
        @close="mobileFilterOpen = false"
        @filter-change="handleFilterChange"
        @apply="handleApply"
        @reset="handleReset"
      />

      <div class="flex-1 min-w-0">
        <ProductsGrid
          :products="products"
          :is-loading="isLoading"
          :is-fetching-next-page="isFetchingNextPage"
          :has-next-page="hasNextPage"
          :fetch-next-page="() => fetchNextPage()"
          :total-count="totalCount"
          :on-wishlist-toggle="toggleWishlist"
          :wishlisted-ids="wishlist"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRoute, useRouter, type LocationQuery } from "vue-router";
import { ListFilter } from "lucide-vue-next";
import { useInfinitePublicProducts } from "@/domains/products/hooks/useInfinitePublicProducts";
import { useCategoriesFlat } from "@/domains/storefront/hooks/useCategoriesFlat";
import FilterSidebar, {
  type FiltersState,
} from "@/domains/storefront/components/filters/FilterSidebar.vue";
import ProductsGrid from "@/domains/products/components/ProductsGrid.vue";
import MobileFilterSheet from "@/shared/components/buyer/MobileFilterSheet.vue";

const DEFAULT_FILTERS: FiltersState = {};

const QUERY_KEYS = [
  "category",
  "search",
  "sort",
  "minPrice",
  "maxPrice",
] as const;

const route = useRoute();
const router = useRouter();
const { categories } = useCategoriesFlat();

const appliedFilters = ref<FiltersState>({ ...DEFAULT_FILTERS });
const draftFilters = ref<FiltersState>({ ...DEFAULT_FILTERS });
const mobileFilterOpen = ref(false);
const wishlist = ref<Set<string>>(new Set());

const apiParams = computed(() => {
  const params: Record<string, unknown> = {};
  if (appliedFilters.value.search) params.search = appliedFilters.value.search;
  if (appliedFilters.value.sort) params.sort = appliedFilters.value.sort;
  if (appliedFilters.value.category)
    params.category = appliedFilters.value.category;
  if (appliedFilters.value.minPrice)
    params.minPrice = Number(appliedFilters.value.minPrice);
  if (appliedFilters.value.maxPrice)
    params.maxPrice = Number(appliedFilters.value.maxPrice);
  return params;
});

const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
  useInfinitePublicProducts(apiParams);

const products = computed(
  () => data.value?.pages.flatMap((page) => page.data) ?? [],
);

const totalCount = computed(() => data.value?.pages[0]?.pagination.total);

const appliedFilterCount = computed(
  () =>
    Object.values(appliedFilters.value).filter((v) => v !== undefined && v !== "")
      .length,
);

function handleFilterChange(key: string, value: string | undefined) {
  draftFilters.value = { ...draftFilters.value, [key]: value };
}

// Home page category cards link to /products?category=<slug>, while the filter
// sidebar works with category ids — normalize both to an id.
function filtersFromQuery(query: LocationQuery): FiltersState {
  const next: FiltersState = {};
  for (const key of QUERY_KEYS) {
    const raw = query[key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (typeof value === "string" && value !== "") next[key] = value;
  }

  if (next.category) {
    const match = categories.value.find(
      (category) =>
        category.slug === next.category || category._id === next.category,
    );
    if (match) next.category = match._id;
  }

  return next;
}

function syncQuery() {
  const query: Record<string, string> = {};
  for (const key of QUERY_KEYS) {
    const value = appliedFilters.value[key];
    if (value !== undefined && value !== "") query[key] = String(value);
  }
  router.replace({ query });
}

watch(
  [() => route.query, categories],
  ([query]) => {
    const next = filtersFromQuery(query);
    appliedFilters.value = next;
    draftFilters.value = { ...next };
  },
  { immediate: true },
);

function handleApply() {
  appliedFilters.value = { ...draftFilters.value };
  syncQuery();
}

function handleReset() {
  draftFilters.value = { ...DEFAULT_FILTERS };
  appliedFilters.value = { ...DEFAULT_FILTERS };
  syncQuery();
}

function toggleWishlist(productId: string) {
  const next = new Set(wishlist.value);
  if (next.has(productId)) next.delete(productId);
  else next.add(productId);
  wishlist.value = next;
}
</script>

<style scoped></style>
