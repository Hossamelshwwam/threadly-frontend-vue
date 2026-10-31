<template>
  <!-- Upper Segment: Ribbon Frame Metadata Container -->
  <div class="bg-zinc-50/70 border-b border-zinc-100 p-4 space-y-2.5">
    <!-- FIX: Added flex-wrap just in case prices/SKUs get very long -->
    <div class="flex flex-wrap items-center justify-between gap-2">
      <span
        class="font-mono text-[11px] font-bold bg-white text-zinc-700 px-2 py-0.5 rounded border border-zinc-200 truncate max-w-[140px]"
        :title="variant.sku"
      >
        {{ variant.sku }}
      </span>
      <span class="text-sm font-extrabold text-zinc-900 whitespace-nowrap">
        EGP {{ variant.price.toLocaleString() }}
      </span>
    </div>

    <!-- Dynamic Structural Attribute Grid Sub-strip -->
    <!-- FIX: Added flex-wrap for safe wrapping on extremely narrow screens -->
    <div
      class="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-wider"
    >
      <div class="bg-white px-2 py-0.5 rounded border border-zinc-100">
        Size:
        <span class="text-zinc-700 font-extrabold">{{ variant.size }}</span>
      </div>
      <div
        class="bg-white px-2 py-0.5 rounded border border-zinc-100 truncate flex items-center gap-1"
        :title="variant.color"
      >
        Color:
        <div class="text-zinc-700 font-extrabold flex items-center gap-1">
          <span
            :style="{ backgroundColor: variant.color }"
            class="w-3 h-3 rounded-full border border-black/10"
          ></span>
          <span class="truncate max-w-[80px] sm:max-w-none">
            {{ variant.color }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductVariant } from "../../types/inventory.types";

defineProps<{
  variant: ProductVariant;
}>();
</script>
