<template>
  <!-- Center Segment: Isolated Stocks Statistics Ledger Bar -->
  <div class="p-4 grid grid-cols-2 gap-3 bg-white">
    <div
      :class="`rounded-xl p-3 text-center transition-colors border ${
        variant.stock === 0
          ? 'bg-error-bg border-error/20 text-error'
          : 'bg-success-bg border-success/10 text-success'
      }`"
    >
      <span
        class="block text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5"
      >
        Available
      </span>
      <span class="text-xl font-black block">{{ variant.stock }}</span>
    </div>

    <div
      :class="`rounded-xl p-3 text-center transition-colors border ${
        variant.reserved > 0
          ? 'bg-warning-bg border-warning/20 text-warning-800'
          : 'bg-zinc-50 border-zinc-100 text-zinc-400'
      }`"
    >
      <span
        class="block text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5"
      >
        Reserved
      </span>
      <span class="text-xl font-black block">{{ variant.reserved }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductVariant } from "../../types/inventory.types";

defineProps<{
  variant: ProductVariant;
}>();
</script>
