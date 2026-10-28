<template>
  <div class="max-w-7xl mx-auto space-y-8 font-sans pb-12">
    <!-- Merchant Style Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">
            Customer Orders
          </h1>
          <span
            v-if="!isLoading && pagination?.total !== undefined"
            class="bg-blue-50 text-blue-700 text-xs font-black px-3 py-1 rounded-lg border border-blue-200/50 shadow-sm"
          >
            {{ pagination.total.toLocaleString() }} Items
          </span>
        </div>
        <p class="text-sm text-zinc-500 mt-1.5 font-medium">
          Manage fulfillments, update shipping statuses, and track deliveries.
        </p>
      </div>
    </div>

    <SellerOrdersFilterBar
      :filters="filters"
      @filters-change="handleApplyFilters"
    />

    <div
      class="bg-white border border-zinc-100 rounded-2xl shadow-sm overflow-hidden"
    >
      <CustomTable
        :columns="columns"
        :data="orders"
        :is-loading="isLoading"
        :page="page"
        :limit="limit"
        :total-pages="pagination?.pages"
        :total-items="pagination?.total"
        @page-change="onPageChange"
        empty-state-title="No orders found"
        empty-state-description="You don't have any customer orders matching this criteria."
      >
        <template #emptyIcon>
          <Inbox :size="60" class="text-6xl text-zinc-300 mx-auto" />
        </template>
      </CustomTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Inbox } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import { useSellerOrders } from "../hooks/useSellerOrders";
import useSellerOrdersColumns from "../hooks/columns/useSellerOrdersColumns";
import SellerOrdersFilterBar, {
  type SellerOrderFiltersState,
} from "../components/seller-list/SellerOrdersFilterBar.vue";
import type { OrdersItemsParams } from "../types/order.types";

const limit = 10;
const page = ref(1);

const filters = ref<SellerOrderFiltersState>({
  status: "",
  from: "",
  to: "",
});

const params = computed<OrdersItemsParams>(() => ({
  status: filters.value.status || undefined,
  from: filters.value.from || undefined,
  to: filters.value.to || undefined,
  page: page.value,
  limit,
}));

const { data, isLoading } = useSellerOrders(params);
const { columns } = useSellerOrdersColumns();

const orders = computed(() => data.value?.data || []);
const pagination = computed(() => data.value?.pagination);

const handleApplyFilters = (newFilters: SellerOrderFiltersState) => {
  filters.value = newFilters;
  page.value = 1;
};

const onPageChange = (newPage: number) => {
  page.value = newPage;
};
</script>
