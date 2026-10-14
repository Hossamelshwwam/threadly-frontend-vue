<template>
  <ProductGridSkeleton v-if="isLoading" />

  <div
    v-else-if="products.length === 0"
    class="flex flex-col items-center justify-center py-24 text-center"
  >
    <div
      class="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center mb-4"
    >
      <PackageSearch :size="28" class="text-zinc-300" />
    </div>
    <h3 class="text-lg font-semibold text-zinc-800 mb-1">No products found</h3>
    <p class="text-sm text-zinc-400 max-w-xs">
      Try adjusting your filters or search terms to find what you&apos;re
      looking for.
    </p>
  </div>

  <div v-else>
    <p v-if="totalCount !== undefined" class="text-sm text-zinc-500 mb-6">
      Showing {{ products.length }}
      <template v-if="totalCount > products.length">
        of {{ totalCount }}
      </template>
      results
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
      <ProductCard
        v-for="product in products"
        :key="product._id"
        :product="product"
        :onWishlistToggle="onWishlistToggle"
        :isWishlisted="wishlistedIds?.has(product._id)"
      />
    </div>

    <!-- Sentinel for infinite scroll -->
    <div ref="sentinelRef" class="h-10 mt-8" />

    <div v-if="isFetchingNextPage" class="flex justify-center py-8">
      <div
        class="w-6 h-6 border-2 border-amber-500/30 border-t-amber-500 rounded-full animate-spin"
      />
    </div>

    <p
      v-if="!hasNextPage && products.length > 0"
      class="text-center text-xs text-zinc-400 mt-8 pb-4"
    >
      You&apos;ve reached the end
    </p>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, watch } from "vue";
import { PackageSearch } from "lucide-vue-next";
import type { Product } from "@/domains/products/types/product.types";
import ProductCard from "@/domains/products/components/ProductCard.vue";
import ProductGridSkeleton from "@/domains/storefront/components/home/ProductGridSkeleton.vue";

interface ProductsGridProps {
  products: Product[];
  isLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  totalCount?: number;
  onWishlistToggle?: (productId: string) => void;
  wishlistedIds?: Set<string>;
}

const props = defineProps<ProductsGridProps>();

const sentinelRef = ref<HTMLDivElement | null>(null);
let observer: IntersectionObserver | null = null;

function disconnect() {
  observer?.disconnect();
  observer = null;
}

watch(
  [() => props.hasNextPage, () => props.isFetchingNextPage, sentinelRef],
  ([hasNextPage, isFetchingNextPage, node]) => {
    disconnect();
    if (!node || !hasNextPage || isFetchingNextPage) return;

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          props.fetchNextPage();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);
  },
  { immediate: true },
);

onUnmounted(disconnect);
</script>

<style scoped></style>
