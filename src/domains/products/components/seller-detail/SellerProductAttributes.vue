<template>
  <div class="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
    <div class="flex items-center gap-3 pb-4 border-b border-zinc-100">
      <div class="p-2 bg-main-subtle rounded-lg">
        <ClipboardList :size="20" class="text-main text-xl" />
      </div>
      <div>
        <h2 class="text-lg font-bold text-zinc-900 tracking-tight">
          Specifications
        </h2>
      </div>
    </div>

    <div
      v-if="!attributes || attributes.length === 0"
      class="text-center py-6"
    >
      <p class="text-sm text-zinc-400">No specifications added.</p>
    </div>

    <dl v-else class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      <div
        v-for="(attr, idx) in attributes"
        :key="idx"
        class="flex flex-col border-b border-zinc-50 pb-2"
      >
        <dt
          class="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-1"
        >
          {{ attr.key }}
        </dt>
        <dd class="text-sm font-semibold text-zinc-800">
          {{ attr.value }}
        </dd>
      </div>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { ClipboardList } from "lucide-vue-next";
import type { Product } from "../../types/product.types";

defineProps<{
  attributes: Product["attributes"];
}>();
</script>
