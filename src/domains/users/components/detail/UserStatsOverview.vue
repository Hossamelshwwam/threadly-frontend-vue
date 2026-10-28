<template>
  <div class="grid grid-cols-2 gap-4">
    <div
      class="bg-white border border-zinc-200 rounded-lg p-5 flex flex-col gap-3"
    >
      <div class="flex items-center justify-between">
        <p
          class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
        >
          Total Orders
        </p>
        <span
          class="w-9 h-9 rounded-md bg-zinc-50 border border-zinc-200 flex items-center justify-center"
        >
          <ShoppingBag :size="16" class="text-amber-500 text-base" />
        </span>
      </div>
      <p class="text-3xl font-bold text-zinc-900">{{ orderCount }}</p>
    </div>

    <div
      class="bg-amber-400 border border-amber-400 rounded-lg p-5 flex flex-col gap-3"
    >
      <div class="flex items-center justify-between">
        <p
          class="text-xs font-semibold text-amber-100 uppercase tracking-wider"
        >
          Total Spent
        </p>
        <span
          class="w-9 h-9 rounded-md bg-amber-500/40 flex items-center justify-center"
        >
          <CreditCard :size="16" class="text-white text-base" />
        </span>
      </div>
      <p class="text-3xl font-bold text-white">
        EGP {{ totalSpent.toLocaleString() }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCard, ShoppingBag } from "lucide-vue-next";

defineProps<{
  orderCount: number;
  totalSpent: number;
}>();
</script>
