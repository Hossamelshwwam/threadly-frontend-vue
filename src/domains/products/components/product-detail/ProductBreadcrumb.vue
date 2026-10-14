<template>
  <nav class="flex items-center text-xs font-bold text-zinc-400">
    <RouterLink to="/" class="flex items-center hover:text-amber-600 transition-colors">
      <House :size="14" class="mr-1" />
      Home
    </RouterLink>
    <ChevronRight :size="16" class="mx-1.5 text-zinc-300" />

    <RouterLink to="/products" class="hover:text-amber-600 transition-colors">
      {{ categoryName }}
    </RouterLink>
    <ChevronRight :size="16" class="mx-1.5 text-zinc-300" />

    <span class="text-zinc-900 truncate max-w-[200px] sm:max-w-xs">
      {{ product.name }}
    </span>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronRight, House } from "lucide-vue-next";
import type { Product } from "../../types/product.types";

const props = defineProps<{ product: Product }>();

const categoryName = computed(() =>
  typeof props.product.categoryId === "object"
    ? props.product.categoryId.name
    : "Shop",
);
</script>

<style scoped></style>
