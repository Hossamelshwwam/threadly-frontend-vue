<template>
  <div
    class="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
  >
    <div class="relative z-10">
      <div class="flex items-center gap-3">
        <h1
          class="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight"
        >
          Order
          <span class="text-amber-600 font-mono">
            #{{ order._id.slice(-8).toUpperCase() }}
          </span>
        </h1>
        <OrderStatusBadge :status="order.status" />
      </div>
      <p
        class="text-sm font-semibold text-amber-800/80 mt-2 flex items-center gap-1.5"
      >
        <FileText />
        Placed on
        {{ formattedDate }}
      </p>
    </div>

    <div class="relative z-10">
      <p
        class="text-xs font-black text-amber-500 uppercase tracking-widest mb-1"
      >
        Total Amount
      </p>
      <p class="text-3xl font-black text-zinc-900">
        <span class="text-lg text-zinc-400 mr-1">EGP</span>
        {{ order.total.toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FileText } from "lucide-vue-next";

import OrderStatusBadge from "../OrderStatusBadge.vue";
import type { Order } from "../../types/order.types";

const props = defineProps<{
  order: Order;
}>();

const formattedDate = computed(() =>
  new Date(props.order.createdAt).toLocaleDateString("en-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
);
</script>

<style scoped></style>
