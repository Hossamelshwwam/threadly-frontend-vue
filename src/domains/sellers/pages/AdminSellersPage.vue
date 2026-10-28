<template>
  <div class="space-y-5 font-sans">
    <!-- Page Header -->
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-bold text-zinc-900">Sellers</h1>
      <span
        v-if="!isLoading"
        class="bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-0.5 rounded-full"
      >
        {{ pagination?.total?.toLocaleString() }}
      </span>
    </div>

    <!-- Filter Action Strip -->
    <AdminSellersFilterBar
      v-model:search="search"
      v-model:status-filter="statusFilter"
    />

    <!-- Table Presenter -->
    <CustomTable
      :columns="columns"
      :data="sellers"
      :is-loading="isLoading"
      empty-state-title="No sellers found"
      show-clear-filters
      :page="page"
      :limit="20"
      :total-pages="pagination?.pages"
      :total-items="pagination?.total"
      @clear-filters="clearFilters"
      @page-change="page = $event"
    >
      <template #emptyIcon>
        <Store :size="48" class="text-5xl text-zinc-300 mx-auto" />
      </template>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { Store } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import AdminSellersFilterBar from "../components/AdminSellersFilterBar.vue";
import { useAdminSellers } from "../hooks/useAdminSellers";
import useAdminSellersColumns from "../hooks/columns/useAdminSellersColumns";
import type { AdminSellersParams, SellerStatus } from "../types/seller.types";

const STATUS_VALUES: SellerStatus[] = ["pending", "approved", "suspended"];

const route = useRoute();

// Deep link support: the dashboard's pending-sellers widget links to
// /admin/sellers?status=pending, so seed the filter from the query string.
function statusFromQuery(): SellerStatus | "" {
  const raw = route.query.status;
  const value = Array.isArray(raw) ? raw[0] : raw;

  return STATUS_VALUES.includes(value as SellerStatus)
    ? (value as SellerStatus)
    : "";
}

const search = ref("");
const debouncedSearch = ref("");
const statusFilter = ref<SellerStatus | "">(statusFromQuery());
const page = ref(1);
const limit = 20;

const { columns } = useAdminSellersColumns();

// Debounce filter modifications
let searchTimer: ReturnType<typeof setTimeout> | undefined;

watch(search, (value) => {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    debouncedSearch.value = value;
  }, 400);
});

onBeforeUnmount(() => clearTimeout(searchTimer));

// Status chips reset pagination
watch(statusFilter, () => {
  page.value = 1;
});

// Keep the filter in sync when only the query string changes
watch(
  () => route.query.status,
  () => {
    statusFilter.value = statusFromQuery();
  },
);

const params = computed<AdminSellersParams>(() => ({
  search: debouncedSearch.value || undefined,
  status: statusFilter.value || undefined,
  page: page.value,
  limit,
}));

const { data, isLoading } = useAdminSellers(params);

const sellers = computed(() => data.value?.data ?? []);
const pagination = computed(() => data.value?.pagination);

const clearFilters = () => {
  search.value = "";
  statusFilter.value = "";
  page.value = 1;
};
</script>
