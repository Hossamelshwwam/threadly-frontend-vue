<template>
  <span
    :class="`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider whitespace-nowrap font-sans ${styles[status] || styles.pending}`"
  >
    {{ formattedStatus }}
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { OrderStatus } from "../types/order.types";

const props = defineProps<{
  status: OrderStatus;
}>();

const styles: Record<OrderStatus, string> = {
  pending: "bg-zinc-50 border-zinc-200 text-zinc-500",
  confirmed: "bg-blue-50 border-blue-200 text-blue-600",
  partially_shipped: "bg-indigo-50 border-indigo-200 text-indigo-600",
  shipped: "bg-amber-50 border-amber-200 text-amber-600",
  delivered: "bg-success-bg border-success/30 text-success",
  cancelled: "bg-error-bg border-error/30 text-error",
};

const formattedStatus = computed(() => props.status.replace(/_/g, " "));
</script>

<style scoped></style>
