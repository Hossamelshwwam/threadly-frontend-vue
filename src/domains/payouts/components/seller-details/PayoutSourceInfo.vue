<template>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 p-6 sm:p-8 gap-8 border-b border-zinc-200 bg-zinc-50"
  >
    <div class="space-y-3">
      <div class="flex items-center gap-3 text-zinc-800">
        <div
          class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0"
        >
          <ShoppingBag :size="18" class="text-amber-600" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Source Order
          </p>
          <RouterLink
            v-if="payout.orderId"
            :to="`/seller/orders/${payout.orderId._id}`"
            class="text-sm font-bold font-mono text-zinc-900 underline underline-offset-2 hover:text-amber-600 transition-colors"
          >
            {{ payout.orderId.orderNumber }}
          </RouterLink>
          <span v-else class="text-sm font-medium italic text-zinc-400">
            N/A
          </span>
        </div>
      </div>
    </div>
    <div class="space-y-3">
      <div class="flex items-center gap-3 text-zinc-800">
        <div
          class="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0"
        >
          <Calendar :size="18" class="text-blue-600" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            Order Date
          </p>
          <p
            v-if="payout.orderId?.createdAt"
            class="text-sm font-semibold text-zinc-900"
          >
            {{ orderDate }}
          </p>
          <span v-else class="text-sm font-medium italic text-zinc-400">
            N/A
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { Calendar, ShoppingBag } from "lucide-vue-next";

import type { Payout } from "../../types/payout.types";

const props = defineProps<{
  payout: Payout;
}>();

const orderDate = computed(() => {
  const raw = props.payout.orderId?.createdAt;
  return raw
    ? new Date(raw).toLocaleDateString("en-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
});
</script>
