<template>
  <div class="flex flex-col">
    <!-- Sleek Top Badges -->
    <div class="mb-6 flex flex-wrap items-center gap-3">
      <span
        v-if="categoryName"
        class="rounded-full border border-zinc-200 bg-white px-3 py-1 text-[11px] font-black uppercase tracking-widest text-zinc-600"
      >
        {{ categoryName }}
      </span>
      <span
        v-if="sellerName"
        class="flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white"
      >
        <Store :size="14" class="text-amber-400" />
        {{ sellerName }}
      </span>
    </div>

    <!-- Massive Editorial Title -->
    <h1
      class="mb-6 text-4xl sm:text-5xl font-black tracking-tighter text-zinc-950 leading-[1.05] text-balance"
    >
      {{ product.name }}
    </h1>

    <!-- Pricing & Reviews Row - Grouped tightly for impact -->
    <div
      class="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-100 pb-8"
    >
      <div class="flex flex-col gap-1">
        <span
          class="text-sm font-bold uppercase tracking-widest text-zinc-400"
        >
          Total Price
        </span>
        <div class="flex items-baseline gap-3">
          <span class="text-4xl font-black text-amber-500">
            EGP {{ displayPrice.toLocaleString() }}
          </span>
          <span
            v-if="hasDiscount"
            class="text-xl font-bold text-zinc-300 line-through"
          >
            EGP {{ basePrice.toLocaleString() }}
          </span>
        </div>
      </div>

      <a
        v-if="
          averageRating !== undefined &&
          totalReviews !== undefined &&
          totalReviews > 0
        "
        href="#reviews"
        class="group flex items-center gap-2 rounded-2xl bg-zinc-50 p-2 pr-4 transition-colors hover:bg-zinc-100"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"
        >
          <Star :size="18" class="text-amber-400" />
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-black text-zinc-900">
            {{ averageRating.toFixed(1) }} Rating
          </span>
          <span
            class="text-xs font-bold text-zinc-500 group-hover:text-zinc-700"
          >
            Read {{ totalReviews }} Reviews
          </span>
        </div>
      </a>
    </div>

    <!-- Description -->
    <p
      class="text-base font-medium text-zinc-500 leading-relaxed text-pretty"
    >
      {{ product.description }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Star, Store } from "lucide-vue-next";
import type { Product } from "@/domains/products/types/product.types";

interface ProductInfoProps {
  product: Product;
  displayPrice: number;
  basePrice: number;
  averageRating?: number;
  totalReviews?: number;
}

const props = defineProps<ProductInfoProps>();

const categoryName = computed(() =>
  typeof props.product.categoryId === "object"
    ? props.product.categoryId.name
    : undefined,
);
const sellerName = computed(() =>
  typeof props.product.sellerId === "object" && props.product.sellerId !== null
    ? props.product.sellerId.storeName
    : undefined,
);
const hasDiscount = computed(() => props.displayPrice !== props.basePrice);
</script>

<style scoped></style>
