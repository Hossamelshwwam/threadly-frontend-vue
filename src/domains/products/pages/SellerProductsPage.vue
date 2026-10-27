<template>
  <div class="max-w-7xl mx-auto space-y-8 font-sans pb-12">
    <!-- Merchant Style Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">
            My Inventory
          </h1>
          <span
            v-if="!isLoading && pagination?.total !== undefined"
            class="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-lg border border-amber-200/50 shadow-sm"
          >
            {{ pagination.total.toLocaleString() }} Items
          </span>
        </div>
        <p class="text-sm text-zinc-500 mt-1.5 font-medium">
          Manage your product catalog, tracking, and visibility.
        </p>
      </div>

      <RouterLink to="/seller/products/create" class="w-fit">
        <CustomButton
          variant="solid"
          theme="primary"
          size="md"
          :left-icon="AddIcon"
          class="rounded-xl shadow-md hover:shadow-lg transition-all px-6"
        >
          Add New Product
        </CustomButton>
      </RouterLink>
    </div>

    <!-- New Soft UI Filter Bar -->
    <ProductFilterBar
      v-model:search="search"
      v-model:status-filter="statusFilter"
      v-model:category-filter="categoryFilter"
      :enable-seller="false"
      :categories="categories"
    />

    <!-- Data Table -->
    <div
      class="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <CustomTable
        :columns="columns"
        :data="products"
        :is-loading="isLoading"
        :page="page"
        :limit="limit"
        :total-pages="pagination?.pages"
        :total-items="pagination?.total"
        @page-change="onPageChange"
        empty-state-title="No products found"
        empty-state-description="Try adjusting your filters, or add a new product to your catalog to start selling."
      >
        <template #emptyIcon>
          <Store :size="60" class="text-6xl text-zinc-300 mx-auto" />
        </template>
      </CustomTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, onUnmounted, ref, watch } from "vue";
import { Plus, Store } from "lucide-vue-next";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomTable from "@/shared/components/custom-table/CustomTable.vue";

import { useSellerProducts } from "../hooks/useSellerProducts";
import useSellerProductsColumns from "../hooks/columns/useSellerProductsColumns";
import type { ProductsParams, ProductStatus } from "../types/product.types";
import ProductFilterBar from "../components/ProductFilterBar.vue";
import { useListCategories } from "@/domains/categories/hooks/useCategories";

const limit = 10;
const page = ref(1);
const searchInput = ref("");
const debouncedSearch = ref("");
const statusFilter = ref<ProductStatus | "">("");
const categoryFilter = ref("");

// Each filter change resets pagination, exactly like the React handlers.
const search = computed({
  get: () => searchInput.value,
  set: (value: string) => {
    searchInput.value = value;
    page.value = 1;
  },
});

const status = computed({
  get: () => statusFilter.value,
  set: (value: ProductStatus | "") => {
    statusFilter.value = value;
    page.value = 1;
  },
});

const category = computed({
  get: () => categoryFilter.value,
  set: (value: string) => {
    categoryFilter.value = value;
    page.value = 1;
  },
});

let debounceTimer: ReturnType<typeof setTimeout> | undefined;

watch(searchInput, (value) => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedSearch.value = value;
  }, 400);
});

onUnmounted(() => {
  clearTimeout(debounceTimer);
});

const params = computed<ProductsParams>(() => ({
  search: debouncedSearch.value || undefined,
  status: statusFilter.value || undefined,
  category: categoryFilter.value || undefined,
  page: page.value,
  limit,
}));

const { data, isLoading } = useSellerProducts(params);
const { columns } = useSellerProductsColumns();
const { data: categoriesData } = useListCategories();

const products = computed(() => data.value?.data || []);
const pagination = computed(() => data.value?.pagination);
const categories = computed(() => categoriesData.value?.data || []);

const AddIcon = () => h(Plus, { size: 18, class: "text-lg" });

const onPageChange = (newPage: number) => {
  page.value = newPage;
};
</script>
