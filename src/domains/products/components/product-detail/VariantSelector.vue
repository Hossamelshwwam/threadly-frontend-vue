<template>
  <div v-if="variants.length > 0" class="flex flex-col gap-8">
    <!-- Colors -->
    <div v-if="colors.length > 0" class="flex flex-col gap-4">
      <div class="flex items-end justify-between">
        <span class="text-sm font-bold uppercase tracking-widest text-zinc-900">
          Color
        </span>
        <span class="text-sm font-bold text-zinc-500">
          {{ selectedColor || "None selected" }}
        </span>
      </div>
      <div class="flex flex-wrap gap-3">
        <button
          v-for="color in colors"
          :key="color"
          :disabled="!hasStockForColor(color)"
          @click="
            $emit('color-change', isColorSelected(color) ? undefined : color)
          "
          :class="[
            'group relative flex h-14 items-center justify-center rounded-2xl px-6 text-sm font-black transition-all duration-200',
            isColorSelected(color)
              ? 'bg-zinc-950 text-white ring-4 ring-zinc-950/20 ring-offset-2'
              : !hasStockForColor(color)
                ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
                : 'bg-white border-2 border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-950',
          ]"
        >
          {{ color }}
          <div
            v-if="!hasStockForColor(color)"
            class="absolute inset-0 h-px w-full -rotate-12 bg-zinc-300 top-1/2"
          />
        </button>
      </div>
    </div>

    <!-- Sizes -->
    <div v-if="displaySizes.length > 0" class="flex flex-col gap-4">
      <div class="flex items-end justify-between">
        <span class="text-sm font-bold uppercase tracking-widest text-zinc-900">
          Size
        </span>
        <span class="text-sm font-bold text-zinc-500">
          {{ selectedSize || "None selected" }}
        </span>
      </div>
      <div class="grid grid-cols-4 sm:grid-cols-5 gap-3">
        <button
          v-for="size in displaySizes"
          :key="size"
          :disabled="!hasStockForSize(size)"
          @click="$emit('size-change', isSizeSelected(size) ? undefined : size)"
          :class="[
            'group relative flex h-14 items-center justify-center rounded-2xl text-base font-black transition-all duration-200',
            isSizeSelected(size)
              ? 'bg-zinc-950 text-white ring-4 ring-zinc-950/20 ring-offset-2'
              : !hasStockForSize(size)
                ? 'bg-zinc-100 text-zinc-300 cursor-not-allowed'
                : 'bg-white border-2 border-zinc-200 text-zinc-600 hover:border-zinc-900 hover:text-zinc-950',
          ]"
        >
          {{ size }}
          <div
            v-if="!hasStockForSize(size)"
            class="absolute inset-0 h-px w-full -rotate-45 bg-zinc-300 top-1/2"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { ProductVariant } from "@/domains/products/types/inventory.types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedColor?: string;
  selectedSize?: string;
}

const props = defineProps<VariantSelectorProps>();

defineEmits<{
  (e: "color-change", color: string | undefined): void;
  (e: "size-change", size: string | undefined): void;
}>();

const colors = computed(() => {
  const set = new Set<string>();
  for (const v of props.variants) {
    if (v.color) set.add(v.color);
  }
  return Array.from(set);
});

const sizes = computed(() => {
  const set = new Set<string>();
  for (const v of props.variants) {
    if (v.size) set.add(v.size);
  }
  return Array.from(set);
});

function hasStockForColor(color: string) {
  return props.variants.some(
    (v) => v.color === color && v.stock - v.reserved > 0,
  );
}

function hasStockForSize(size: string) {
  return props.variants.some(
    (v) => v.size === size && v.stock - v.reserved > 0,
  );
}

function isColorSelected(color: string) {
  return props.selectedColor === color;
}

function isSizeSelected(size: string) {
  return props.selectedSize === size;
}

// Only display sizes that are actually available for the selected color
const displaySizes = computed(() => {
  if (!props.selectedColor) return sizes.value;
  return sizes.value.filter((size) =>
    props.variants.some(
      (v) =>
        v.color === props.selectedColor &&
        v.size === size &&
        v.stock - v.reserved > 0,
    ),
  );
});
</script>

<style scoped></style>
