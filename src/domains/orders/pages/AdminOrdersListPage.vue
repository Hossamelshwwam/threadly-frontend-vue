<template>
  <div class="space-y-6 font-sans">
    <!-- Draft-State Filter Parameters Bar -->
    <AdminOrdersFilterBar
      :initial-filters="activeFilters"
      @apply="handleApplyFilters"
      @reset="handleClearFilters"
    />

    <!-- Data Grid & Pagination Module -->
    <CustomTable
      title="Transaction Ledger List"
      :columns="columns"
      :data="orders"
      :is-loading="isLoading"
      :page="page"
      :limit="limit"
      :total-pages="pagination?.pages"
      :total-items="pagination?.total"
      empty-state-title="No matching orders found"
      empty-state-description="Try adjusting your date range or status filters."
      show-clear-filters
      @page-change="page = $event"
      @clear-filters="handleClearFilters"
    >
      <template #emptyIcon>
        <ShoppingBag :size="48" class="text-5xl text-zinc-300 mx-auto" />
      </template>
    </CustomTable>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { ShoppingBag } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import { useAdminOrders } from "../hooks/useAdminOrders";
import useAdminOrdersColumns from "../hooks/columns/useAdminOrdersColumns";
import AdminOrdersFilterBar, {
  type AdminOrderFiltersState,
} from "../components/admin-list/AdminOrdersFilterBar.vue";
import type { OrdersParams } from "../types/order.types";

// Master state containing applied filters
const activeFilters = ref<AdminOrderFiltersState>({
  status: "",
  paymentStatus: "",
  from: "",
  to: "",
});

const page = ref(1);
const limit = 20;

// Aggregate API parameters using the active (applied) filters only
const params = computed<OrdersParams>(() => ({
  status: activeFilters.value.status || undefined,
  paymentStatus: activeFilters.value.paymentStatus || undefined,
  from: activeFilters.value.from || undefined,
  to: activeFilters.value.to || undefined,
  page: page.value,
  limit,
}));

// Fetch data cleanly
const { data: listData, isLoading } = useAdminOrders(params);

const orders = computed(() => listData.value?.data ?? []);
const pagination = computed(() => listData.value?.pagination);
const { columns } = useAdminOrdersColumns();

// Handlers for the Action Buttons inside the Filter Bar
const handleApplyFilters = (newFilters: AdminOrderFiltersState) => {
  activeFilters.value = newFilters;
  page.value = 1; // Always reset pagination on a fresh query
};

const handleClearFilters = () => {
  activeFilters.value = { status: "", paymentStatus: "", from: "", to: "" };
  page.value = 1;
};
</script>
