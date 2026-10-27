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
import type { ProductStatus } from "../types/product.types";

defineProps<{ status: ProductStatus }>();

const styles: Record<ProductStatus, string> = {
  active: "bg-success-bg text-success border-success/30",
  draft: "bg-zinc-100 text-zinc-600 border-zinc-200",
  archived: "bg-error-bg text-error border-error/30",
};
</script>
