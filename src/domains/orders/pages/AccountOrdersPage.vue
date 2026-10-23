<template>
  <div class="font-sans animate-fadeIn flex-1 w-full">
    <!-- Header Section -->
    <div
      class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex items-center justify-between"
    >
      <div>
        <h1 class="text-xl font-bold text-zinc-900 tracking-tight">
          Order History
        </h1>
        <p class="text-xs text-zinc-500 font-medium mt-0.5">
          View and track the status of your recent purchases.
        </p>
      </div>
      <div
        class="h-12 w-12 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center shrink-0 hidden sm:flex"
      >
        <ShoppingBag :size="24" class="text-2xl text-amber-500" />
      </div>
    </div>

    <!-- Reactive Filter Bar -->
    <BuyerOrdersFilterBar
      :filters="filters"
      @filters-change="handleFiltersChange"
    />

    <!-- Performant Data Table -->
    <CustomTable
      :columns="columns"
      :data="orders"
      :is-loading="isLoading"
      :page="page"
      :limit="limit"
      :total-pages="pagination?.pages"
      :total-items="pagination?.total"
      @page-change="handlePageChange"
      empty-state-title="No orders found"
      empty-state-description="We couldn't find any orders matching your selected filters."
    >
      <template #emptyIcon>
        <ShoppingBag :size="60" class="text-6xl text-zinc-300 mx-auto" />
      </template>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ShoppingBag } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import { useMyOrders } from "../hooks/useMyOrders";
import useMyOrdersColumns from "../hooks/columns/useMyOrdersColumns";
import type { OrdersParams } from "../types/order.types";
import BuyerOrdersFilterBar from "../components/buyer/BuyerOrdersFilterBar.vue";

type Filters = Omit<OrdersParams, "page" | "limit">;

const page = ref(1);
const limit = 10;

const filters = ref<Filters>({
  status: "",
  paymentStatus: "",
  from: "",
  to: "",
});

// Combine pagination and filters for the API call
const params = computed<OrdersParams>(() => ({
  page: page.value,
  limit,
  ...filters.value,
}));

const { data: response, isLoading } = useMyOrders(params);
const { columns } = useMyOrdersColumns();

const orders = computed(() => response.value?.data || []);
const pagination = computed(() => response.value?.pagination);

const handleFiltersChange = (newFilters: Filters) => {
  filters.value = newFilters;
  page.value = 1;
};

const handlePageChange = (newPage: number) => {
  page.value = newPage;
};
</script>

<style scoped></style>
