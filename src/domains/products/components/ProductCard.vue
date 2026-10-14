<template>
  <div
    class="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-zinc-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/50 hover:shadow-lg hover:shadow-amber-100"
  >
    <RouterLink
      :to="`/products/${product.slug || product._id}`"
      class="relative aspect-square overflow-hidden bg-zinc-100"
    >
      <img
        v-if="product.images?.[0]"
        :src="product.images[0]"
        :alt="product.name"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div v-else class="absolute inset-0 flex items-center justify-center">
        <ShoppingBag class="text-4xl text-zinc-400" />
      </div>

      <div class="absolute top-3 left-3 flex flex-col gap-2">
        <span
          v-if="categoryName"
          class="bg-white/80 backdrop-blur-md text-zinc-900 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-sm border border-zinc-100"
        >
          {{ categoryName }}
        </span>
      </div>
    </RouterLink>

    <button
      v-if="onWishlistToggle"
      @click="handleWishlistToggle"
      :aria-label="isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'"
      class="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/70 backdrop-blur-md text-zinc-600 transition-all border border-zinc-200 hover:border-amber-500 cursor-pointer"
    >
      <Heart
        :size="18"
        :fill="props.isWishlisted ? 'currentColor' : 'none'"
        :class="props.isWishlisted ? 'text-amber-500' : ''"
      />
    </button>

    <RouterLink
      :to="`/products/${product.slug || product._id}`"
      class="flex flex-col flex-1 p-4 bg-white"
    >
      <div
        v-if="storeName"
        class="flex items-center gap-1.5 text-zinc-600 mb-2"
      >
        <Store :size="14" class="text-amber-600" />
        <span class="text-xs font-medium truncate">{{ storeName }}</span>
      </div>
      <h3
        class="text-sm font-bold text-zinc-950 leading-snug line-clamp-2 mb-3 group-hover:text-amber-700 transition-colors"
      >
        {{ product.name }}
      </h3>

      <div
        class="mt-auto flex items-end justify-between pt-3 border-t border-zinc-100"
      >
        <div class="flex flex-col">
          <span
            class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5"
          >
            Price
          </span>
          <p class="text-lg font-black text-amber-600 leading-none">
            EGP {{ product.basePrice.toLocaleString() }}
          </p>
        </div>

        <div
          class="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition-colors group-hover:bg-amber-500 group-hover:text-white"
        >
          <ShoppingBag :size="16" />
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Product } from "../types/product.types";
import { Heart, ShoppingBag, Store } from "lucide-vue-next";

interface ProductCardProps {
  product: Product;
  onWishlistToggle?: (productId: string) => void;
  isWishlisted?: boolean;
}

const props = defineProps<ProductCardProps>();

const categoryName = computed(() =>
  typeof props.product.categoryId === "object"
    ? props.product.categoryId.name
    : null,
);
const storeName = computed(() =>
  typeof props.product.sellerId === "object" && props.product.sellerId !== null
    ? props.product.sellerId.storeName
    : null,
);

function handleWishlistToggle(event: MouseEvent) {
  event.preventDefault();
  event.stopPropagation();

  props.onWishlistToggle?.(props.product._id);
}
</script>

<style scoped></style>
