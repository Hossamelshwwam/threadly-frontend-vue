<template>
  <div class="p-6 sm:p-8 space-y-4 bg-zinc-50">
    <h4
      class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3"
    >
      Settlement Calculation
    </h4>

    <div class="flex justify-between items-center text-sm">
      <span class="text-zinc-600 font-medium">Gross Transaction Volume</span>
      <span class="font-semibold text-zinc-900">
        EGP
        {{
          payout.amount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}
      </span>
    </div>

    <div class="flex justify-between items-center text-sm">
      <span class="text-zinc-600 font-medium">Platform Commission</span>
      <span
        class="font-semibold text-error bg-error-bg px-2 py-0.5 rounded border border-error/20"
      >
        - EGP
        {{
          payout.platformFee.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}
      </span>
    </div>

    <div
      class="pt-4 border-t border-dashed border-zinc-300 flex justify-between items-end"
    >
      <span class="text-sm font-bold text-zinc-900">Final Disbursement</span>
      <span class="font-black text-xl text-success">
        EGP
        {{
          payout.netAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
          })
        }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Payout } from "../../types/payout.types";

defineProps<{
  payout: Payout;
}>();
</script>
