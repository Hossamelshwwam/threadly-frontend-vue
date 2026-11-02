<template>
  <div class="space-y-6 font-sans">
    <!-- Header -->
    <div class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0"
      >
        <Wallet :size="20" />
      </div>
      <div>
        <h1 class="text-xl font-bold text-zinc-900">Seller Settlements</h1>
        <p class="text-xs text-zinc-500 mt-0.5">
          Manage and process payout requests to vendor bank accounts.
        </p>
      </div>
    </div>

    <!-- Financial Dashboard Summary Ribbon -->
    <div
      v-if="isLoading || summary"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      <!-- 1. Total Net Due to Vendors (Platform Liability) -->
      <StatCard
        label="Total Net Payable"
        :value="formatCurrency(summary?.totalNet)"
        :icon="Wallet"
        variant="brand"
        :loading="isLoading"
        :trend="{
          label: `EGP ${(summary?.totalAmount ?? 0).toLocaleString()} Gross sales volume`,
        }"
      />

      <!-- 2. Payouts Waiting to be Wire Transferred -->
      <StatCard
        label="Pending Settlements"
        :value="formatCurrency(summary?.totalPending)"
        :icon="Clock"
        variant="warning"
        :loading="isLoading"
        :trend="{
          label: `${summary?.totalProcessing ?? 0} transfers currently processing`,
        }"
      />

      <!-- 3. Platform's Cut (Pure Platform Profit) -->
      <StatCard
        label="Platform Revenue"
        :value="formatCurrency(summary?.totalFees)"
        :icon="CreditCard"
        variant="info"
        :loading="isLoading"
        :trend="{ label: 'Total commission fees earned' }"
      />

      <!-- 4. Money Successfully Disbursed and Closed -->
      <StatCard
        label="Successful Settlements"
        :value="formatCurrency(summary?.totalPaid)"
        :icon="CheckCheck"
        variant="success"
        :loading="isLoading"
        :trend="{
          label: summary?.totalRejected
            ? `${summary.totalRejected} requests rejected by admin`
            : 'All cleared disbursements',
        }"
      />
    </div>

    <!-- Filter Bar -->
    <PayoutsFilterBar
      v-model:expanded="filtersOpen"
      :initial-filters="activeFilters"
      @apply="handleApplyFilters"
      @reset="handleClearFilters"
    />

    <!-- Data Table -->
    <div
      class="bg-white border border-zinc-200 rounded-lg shadow-xs overflow-hidden"
    >
      <CustomTable
        title="Payout Requests Ledger"
        :columns="columns"
        :data="payouts"
        :is-loading="isLoading"
        :page="page"
        :limit="limit"
        :total-pages="pagination?.pages"
        :total-items="pagination?.total"
        empty-state-title="No payouts found"
        empty-state-description="Try adjusting your date range or status filters."
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
import { CheckCheck, Clock, CreditCard, Wallet } from "lucide-vue-next";

import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import StatCard from "@/shared/components/StatCard.vue";
import { useAdminPayouts } from "../hooks/useAdminPayouts";
import useAdminPayoutsColumns from "../hooks/columns/useAdminPayoutsColumns";
import PayoutsFilterBar, {
  type PayoutFiltersState,
} from "../components/PayoutsFilterBar.vue";
import type { AdminPayoutsParams } from "../types/payout.types";

const activeFilters = ref<PayoutFiltersState>({
  status: "",
  seller: "",
  from: "",
  to: "",
});

const page = ref(1);
const limit = 10;

// Panel open/closed lives here so re-creating the bar can never collapse it.
const filtersOpen = ref(false);

const params = computed<AdminPayoutsParams>(() => ({
  status: activeFilters.value.status || undefined,
  seller: activeFilters.value.seller || undefined,
  from: activeFilters.value.from || undefined,
  to: activeFilters.value.to || undefined,
  page: page.value,
  limit,
}));

const { data: response, isLoading } = useAdminPayouts(params);

// Extracting from the new nested API response structure
const payouts = computed(() => response.value?.data?.payouts ?? []);
const summary = computed(() => response.value?.data?.summary);
const pagination = computed(() => response.value?.pagination);

const { columns } = useAdminPayoutsColumns();

const handleApplyFilters = (newFilters: PayoutFiltersState) => {
  activeFilters.value = newFilters;
  page.value = 1;
};

const handleClearFilters = () => {
  activeFilters.value = { status: "", seller: "", from: "", to: "" };
  page.value = 1;
};

const formatCurrency = (val?: number) =>
  `EGP ${(val || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
</script>
