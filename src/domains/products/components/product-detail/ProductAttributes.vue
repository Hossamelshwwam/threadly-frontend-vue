<template>
  <div v-if="attributes.length > 0" class="flex flex-col gap-4">
    <h3
      class="flex items-center gap-2 text-sm font-bold text-zinc-900 uppercase tracking-wider"
    >
      <ListChecks :size="18" class="text-amber-500" />
      Product Details
    </h3>

    <div
      class="flex flex-col rounded-2xl border border-zinc-100 bg-zinc-50 overflow-hidden"
    >
      <div
        v-for="(attr, idx) in attributes"
        :key="attr.key"
        :class="[
          'flex items-center justify-between p-4 text-sm',
          idx !== attributes.length - 1 ? 'border-b border-zinc-100' : '',
        ]"
      >
        <span class="font-medium text-zinc-500">{{ attr.key }}</span>
        <span class="font-bold text-zinc-900 text-right">{{ attr.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListChecks } from "lucide-vue-next";
import type { ProductAttribute } from "@/domains/products/types/product.types";

defineProps<{ attributes: ProductAttribute[] }>();
</script>

<style scoped></style>
