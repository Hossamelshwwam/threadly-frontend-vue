<template>
  <div
    class="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-100 relative overflow-hidden"
  >
    <BadgeDollarSign
      class="absolute -bottom-6 -right-4 text-zinc-300 opacity-20 text-9xl pointer-events-none"
      :size="128"
    />
    <div class="relative z-10">
      <p
        class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5"
      >
        Net Payout
      </p>
      <div class="flex items-baseline gap-2">
        <span class="text-xl font-bold text-zinc-400">EGP</span>
        <h2 class="text-4xl font-black text-zinc-950 tracking-tight">
          {{
            payout.netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </h2>
      </div>
      <p class="text-xs text-zinc-500 mt-2 font-medium">
        Created on {{ date }}
      </p>
    </div>
    <div class="relative z-10 shrink-0">
      <PayoutStatusBadge :status="payout.status" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BadgeDollarSign } from "lucide-vue-next";

import type { Payout } from "../../types/payout.types";
import PayoutStatusBadge from "../PayoutStatusBadge.vue";

const props = defineProps<{
  payout: Payout;
}>();

const date = computed(() =>
  new Date(props.payout.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
);
</script>
