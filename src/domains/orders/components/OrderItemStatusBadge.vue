<template>
  <span
    :class="`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-sm border shrink-0 w-fit ${styles[status] || styles.processing}`"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { OrderItemStatus } from "../types/order.types";

defineProps<{
  status: OrderItemStatus;
}>();

const styles: Record<OrderItemStatus, string> = {
  pending: "bg-zinc-100 text-zinc-500 border-zinc-200",
  processing: "bg-warning-bg text-warning border-warning/20",
  shipped: "bg-blue-50 text-blue-600 border-blue-200",
  delivered: "bg-success-bg text-success border-success/20",
  cancelled: "bg-error-bg text-error border-error/20",
};
</script>

<style scoped></style>
