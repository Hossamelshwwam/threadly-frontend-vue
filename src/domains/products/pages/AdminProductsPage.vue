<template>
  <div class="space-y-4 sm:space-y-5 font-sans min-w-0 w-full">
    <!-- Page Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0"
    >
      <div class="flex items-center gap-3">
        <h1 class="text-xl sm:text-2xl font-bold text-zinc-900">
          Platform Products
        </h1>
        <span
          v-if="!isLoading"
          class="bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-0.5 rounded-full"
        >
          {{ pagination?.total?.toLocaleString() }}
        </span>
      </div>

      <RouterLink to="/admin/products/create" class="w-full sm:w-auto">
        <CustomButton
          variant="solid"
          theme="primary"
          size="md"
          :left-icon="AddIcon"
          class="w-full sm:w-auto"
        >
          Create Product
        </CustomButton>
      </RouterLink>
    </div>

    <!-- Code Split Component Filter Bar -->
    <ProductFilterBar
      v-model:search="search"
      v-model:status-filter="statusFilter"
      v-model:category-filter="categoryFilter"
      v-model:seller="sellerFilter"
      :sellers="sellers"
      :categories="categories"
    />

    <!-- Main Table Layout -->
    <CustomTable
      :columns="columns"
      :data="products"
      :is-loading="isLoading"
      :page="page"
      :limit="limit"
      :total-pages="pagination?.pages"
      :total-items="pagination?.total"
      empty-state-title="No products found"
      empty-state-description="Try adjusting your search query, seller channel, or parameter filters."
      show-clear-filters
      @clear-filters="handleClearFilters"
      @page-change="page = $event"
    >
      <template #emptyIcon>
        <Box :size="48" class="text-5xl text-zinc-300 mx-auto" />
      </template>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Box, Plus } from "lucide-vue-next";

import { useAdminProducts } from "../hooks/useAdminProducts";
import useAdminProductsColumns from "../hooks/columns/useAdminProductsColumns";
import ProductFilterBar from "../components/ProductFilterBar.vue";
import type { ProductStatus, ProductsParams } from "../types/product.types";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";

const route = useRoute();

// Deep link support: the seller detail page's "View all" link points at
// /admin/products?sellerId=<id>, so seed the seller filter from the query.
function sellerFromQuery(): string {
  const raw = route.query.sellerId;
  const value = Array.isArray(raw) ? raw[0] : raw;

  return typeof value === "string" ? value : "";
}

const search = ref("");
const debouncedSearch = ref("");
const statusFilter = ref<ProductStatus | "">("");
const categoryFilter = ref("");
const sellerFilter = ref(sellerFromQuery());
const page = ref(1);
const limit = 10;

// Debounce setup
let searchTimer: ReturnType<typeof setTimeout> | undefined;

watch(search, (value) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = value;
  }, 400);
});

onBeforeUnmount(() => clearTimeout(searchTimer));

// Every filter change resets pagination
watch([search, statusFilter, categoryFilter, sellerFilter], () => {
  page.value = 1;
});

// Keep the seller filter in sync when only the query string changes
watch(
  () => route.query.sellerId,
  () => {
    sellerFilter.value = sellerFromQuery();
  },
);

// Aggregate active selection values
const params = computed<ProductsParams>(() => ({
  search: debouncedSearch.value || undefined,
  status: statusFilter.value || undefined,
  category: categoryFilter.value || undefined,
  seller: sellerFilter.value || undefined,
  page: page.value,
  limit,
}));

// Fetch product collections data stream
const { data: listData, isLoading } = useAdminProducts(params);
const { data: sellersData } = useAdminSellers({ page: 1, limit: 100 });
const { data: categoriesData } = useAdminCategories({ page: 1, limit: 100 });

const products = computed(() => listData.value?.data ?? []);
const pagination = computed(() => listData.value?.pagination);
const sellers = computed(() => sellersData.value?.data ?? []);
const categories = computed(() => categoriesData.value?.data ?? []);

const { columns } = useAdminProductsColumns();

const AddIcon = () => h(Plus, { size: 14 });

const handleClearFilters = () => {
  search.value = "";
  statusFilter.value = "";
  categoryFilter.value = "";
  sellerFilter.value = "";
  page.value = 1;
};
</script>
