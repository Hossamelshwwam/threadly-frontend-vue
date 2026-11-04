<template>
  <div class="space-y-6 font-sans max-w-6xl pb-12 mx-auto">
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"
      >
        <Wallet :size="20" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-zinc-900">Earnings</h1>
        <p class="text-xs text-zinc-500 mt-0.5">
          Track your sales revenue, fees, and payout history.
        </p>
      </div>
    </div>

    <div
      v-if="isLoading || summary"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <StatCard
        label="Total Earned"
        :value="formatCurrency(summary?.totalEarned)"
        :icon="BadgeDollarSign"
        variant="brand"
        :loading="isLoading"
        :trend="{ label: 'Gross sales before fees' }"
      />
      <StatCard
        label="Platform Fees"
        :value="formatCurrency(summary?.totalFees)"
        :icon="CreditCard"
        variant="info"
        :loading="isLoading"
        :trend="{ label: 'Total commission deducted' }"
      />
      <StatCard
        label="Net Revenue"
        :value="formatCurrency(summary?.totalNet)"
        :icon="Wallet"
        variant="success"
        :loading="isLoading"
        :trend="{ label: netTrend }"
      />
      <StatCard
        label="Paid"
        :value="formatCurrency(summary?.totalPaid)"
        :icon="CheckCheck"
        variant="default"
        :loading="isLoading"
        :trend="{ label: 'Successfully disbursed' }"
      />
    </div>

    <SellerPayoutsFilterBar
      :filters="filters"
      @filter-change="handleFilterChange"
    />

    <div
      class="bg-white border border-zinc-200 rounded-lg shadow-xs overflow-hidden"
    >
      <CustomTable
        title="Payout History"
        :columns="columns"
        :data="payouts"
        :is-loading="isLoading"
        :page="page"
        :limit="limit"
        :total-pages="pagination?.pages"
        :total-items="pagination?.total"
        empty-state-title="No payouts yet"
        empty-state-description="Sales will appear here once admin processes your payouts."
        show-clear-filters
        @page-change="page = $event"
        @clear-filters="handleClearFilters"
      >
        <template #emptyIcon>
          <Wallet :size="48" class="text-5xl text-zinc-300 mx-auto" />
        </template>
      </CustomTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { BadgeDollarSign, CheckCheck, CreditCard, Wallet } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import StatCard from "@/shared/components/StatCard.vue";
import { useSellerPayouts } from "../hooks/useSellerPayouts";
import useSellerPayoutsColumns from "../hooks/columns/useSellerPayoutsColumns";
import SellerPayoutsFilterBar, {
  type SellerPayoutsFilterState,
} from "../components/SellerPayoutsFilterBar.vue";
import type { SellerPayoutsParams } from "../types/payout.types";

const filters = ref<SellerPayoutsFilterState>({
  status: "",
  from: "",
  to: "",
});
const page = ref(1);
const limit = 10;

const params = computed<SellerPayoutsParams>(() => ({
  status: filters.value.status || undefined,
  from: filters.value.from || undefined,
  to: filters.value.to || undefined,
  page: page.value,
  limit,
}));

const { data: response, isLoading } = useSellerPayouts(params);

const payouts = computed(() => response.value?.data?.payouts ?? []);
const summary = computed(() => response.value?.data?.summary);
const pagination = computed(() => response.value?.data?.pagination);

const { columns } = useSellerPayoutsColumns();

const netTrend = computed(() =>
  summary.value && summary.value.totalPaid > 0
    ? `EGP ${summary.value.totalPaid.toLocaleString()} settled`
    : "Awaiting settlement",
);

const handleFilterChange = (newFilters: SellerPayoutsFilterState) => {
  filters.value = newFilters;
  page.value = 1;
};

const handleClearFilters = () => {
  filters.value = { status: "", from: "", to: "" };
  page.value = 1;
};

const formatCurrency = (val?: number) =>
  `EGP ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
</script>
