<template>
  <span
    :class="
      cn(
        'text-xs font-semibold px-2 py-0.5 rounded-md border capitalize',
        styles[status],
      )
    "
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
import { cn } from "@/shared/lib/utils";
import type { SellerStatus } from "../types/seller.types";

defineProps<{
  status: SellerStatus;
}>();

const styles: Record<SellerStatus, string> = {
  approved: "bg-success-bg text-success border-success/30",
  pending: "bg-amber-50 text-amber-700 border-amber-200",
  suspended: "bg-error-bg text-error border-error/30",
};
</script>
