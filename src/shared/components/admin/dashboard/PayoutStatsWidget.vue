<template>
  <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden">
    <!-- Header -->
    <div
      class="flex items-center justify-between px-5 py-4 border-b border-zinc-100"
    >
      <div class="flex items-center gap-2">
        <CreditCard :size="16" class="text-amber-500 text-base" />
        <h2 class="text-base font-bold text-zinc-900">Payout Overview</h2>
      </div>
      <RouterLink
        to="/admin/payouts"
        class="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
      >
        Manage
        <ArrowRight :size="16" />
      </RouterLink>
    </div>

    <!-- Rows -->
    <div class="divide-y divide-zinc-50">
      <div
        v-for="row in rows"
        :key="row.label"
        class="flex items-center justify-between px-5 py-3.5"
      >
        <div class="flex items-center gap-2.5">
          <span :class="cn('w-2 h-2 rounded-full shrink-0', row.dot)" />
          <span class="text-sm font-medium text-zinc-700">
            {{ row.label }}
          </span>
        </div>
        <div v-if="loading" class="h-4 w-24 rounded bg-zinc-100 animate-pulse" />
        <div v-else class="text-right">
          <p class="text-sm font-bold text-zinc-900">
            EGP {{ row.amount.toLocaleString() }}
          </p>
          <p class="text-xs text-zinc-400">{{ row.count }} payouts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowRight, CreditCard } from "lucide-vue-next";

import { cn } from "@/shared/lib/utils";
import type { PayoutStats } from "@/domains/payouts/types/payout.types";

const props = withDefaults(
  defineProps<{
    stats?: PayoutStats;
    loading?: boolean;
  }>(),
  {
    stats: undefined,
    loading: false,
  },
);

const rows = computed(() => [
  {
    label: "Pending",
    count: props.stats?.pending.count ?? 0,
    amount: props.stats?.pending.netAmount ?? 0,
    dot: "bg-amber-400",
  },
  {
    label: "Processing",
    count: props.stats?.processing.count ?? 0,
    amount: props.stats?.processing.netAmount ?? 0,
    dot: "bg-blue-400",
  },
  {
    label: "Paid",
    count: props.stats?.paid.count ?? 0,
    amount: props.stats?.paid.netAmount ?? 0,
    dot: "bg-green-400",
  },
  {
    label: "Rejected",
    count: props.stats?.rejected.count ?? 0,
    amount: props.stats?.rejected.netAmount ?? 0,
    dot: "bg-red-400",
  },
]);
</script>
