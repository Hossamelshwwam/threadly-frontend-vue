<template>
  <div
    v-if="loading"
    class="bg-white rounded-xl border border-zinc-200 p-5 space-y-4"
  >
    <div class="h-6 w-36 bg-zinc-100 rounded animate-pulse" />
    <div class="space-y-3">
      <div v-for="i in 4" :key="i" class="flex justify-between">
        <div class="h-4 w-20 bg-zinc-100 rounded animate-pulse" />
        <div class="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
      </div>
    </div>
  </div>

  <div v-else class="bg-white rounded-xl border border-zinc-200 p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base font-bold text-zinc-900">Earnings</h2>
      <TrendingUp :size="18" class="text-lg text-zinc-400" />
    </div>

    <div v-if="summary" class="space-y-3">
      <EarningsRow
        label="Gross Revenue"
        :value="summary.totalEarned"
        :icon="CircleDollarSign"
      />
      <EarningsRow label="Platform Fees" :value="summary.totalFees" negative />
      <div class="border-t border-zinc-100 pt-3">
        <EarningsRow label="Net Earnings" :value="summary.totalNet" bold />
      </div>
      <EarningsRow
        label="Paid Out"
        :value="summary.totalPaid"
        variant="success"
      />
      <EarningsRow
        label="Pending"
        :value="summary.totalPending"
        variant="warning"
      />
    </div>

    <p v-else class="text-sm text-zinc-400 text-center py-6">
      No earnings data yet
    </p>

    <RouterLink
      to="/seller/payouts"
      class="mt-4 flex items-center justify-center gap-1.5 w-full text-xs font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 rounded-lg py-2.5 transition-colors"
    >
      View Payouts
      <ArrowRight :size="14" class="text-sm" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, CircleDollarSign, TrendingUp } from "lucide-vue-next";
import type { SellerPayoutSummary } from "@/domains/payouts/types/payout.types";
import EarningsRow from "./EarningsRow.vue";

withDefaults(
  defineProps<{
    summary?: SellerPayoutSummary;
    loading?: boolean;
  }>(),
  { loading: false },
);
</script>
