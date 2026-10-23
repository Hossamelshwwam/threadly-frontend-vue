<template>
  <span
    :class="`inline-flex items-center text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide whitespace-nowrap font-sans ${styles[status] || styles.unpaid}`"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import type { PaymentStatus } from "../types/order.types";

defineProps<{
  status: PaymentStatus;
}>();

const styles: Record<PaymentStatus, string> = {
  unpaid: "bg-warning-bg border-warning/30 text-warning",
  paid: "bg-success-bg border-success/30 text-success",
  refunded: "bg-zinc-100 border-zinc-200 text-zinc-600",
};
</script>

<style scoped></style>
