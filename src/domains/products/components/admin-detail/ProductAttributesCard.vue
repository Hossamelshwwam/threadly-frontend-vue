<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-6 space-y-5 font-sans shadow-xs"
  >
    <!-- Structural Header Block -->
    <div class="flex items-center gap-2.5 pb-3 border-b border-zinc-100">
      <ListChecks :size="18" class="text-amber-500 text-lg" />
      <div>
        <h2 class="text-base font-bold text-zinc-900">
          Specifications Matrix
        </h2>
        <p class="text-xs text-on-surface-muted mt-0.5">
          Technical specifications, attributes, and customized configuration
          options.
        </p>
      </div>
    </div>

    <!-- Empty State Block -->
    <div v-if="!attributes || attributes.length === 0" class="py-6 text-center">
      <p class="text-sm font-medium text-zinc-400 italic">
        No custom attributes populated for this item listing.
      </p>
    </div>

    <!-- Micro-Card Dynamic Grid Container -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="(attr, idx) in attributes"
        :key="idx"
        class="bg-zinc-50/70 border border-main rounded-lg p-4 flex flex-col gap-1.5 transition-colors hover:bg-zinc-50"
      >
        <!-- Specification Label Key -->
        <span
          class="text-xs font-bold text-zinc-400 uppercase tracking-wider block truncate"
        >
          {{ attr.key }}
        </span>

        <!-- Textarea Value Area -->
        <p
          class="text-sm text-on-surface font-semibold leading-relaxed whitespace-pre-wrap"
        >
          {{ attr.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ListChecks } from "lucide-vue-next";
import type { Product } from "../../types/product.types";

defineProps<{
  attributes: Product["attributes"];
}>();
</script>
