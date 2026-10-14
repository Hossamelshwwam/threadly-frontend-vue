<template>
  <section class="container mx-auto px-8 py-20">
    <div class="flex flex-col lg:flex-row gap-12 lg:gap-16">
      <div class="w-full lg:w-2/5 lg:sticky lg:top-32 lg:self-start">
        <span class="text-sm font-semibold text-amber-500">
          {{ subtitle || "Collection" }}
        </span>
        <h2
          class="text-5xl lg:text-6xl font-bold text-zinc-900 mt-4 text-balance leading-[1.05]"
        >
          {{ title }}
        </h2>
        <p class="text-zinc-500 mt-4 text-base leading-relaxed max-w-sm mb-5">
          Curated with care, designed to last. Each piece tells its own story.
        </p>
        <CustomButton :right-icon="ArrowRight">
          <RouterLink to="/products">View All Products</RouterLink>
        </CustomButton>
      </div>
      <div class="w-full lg:w-3/5">
        <ProductGridSkeleton v-if="loading" />
        <div
          v-if="products.length > 0"
          class="grid md:grid-cols-2 grid-cols-1 gap-4"
        >
          <ProductCard
            v-for="product in products.slice(0, 4)"
            :key="product._id"
            :product="product"
            :onWishlistToggle="onWishlistToggle"
            :isWishlisted="wishlistedIds?.has(product._id)"
          />
        </div>
        <div v-else class="text-center py-20">
          <p class="text-zinc-400 text-lg">No products available yet.</p>
        </div>
      </div>
    </div>
    <div class="mt-12 text-center md:hidden">
      <RouterLink
        to="/products"
        class="inline-flex items-center gap-2 text-sm font-medium text-amber-600 transition-colors"
      >
        View All <ArrowRight :size="16" />
      </RouterLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from "@/domains/products/types/product.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { ArrowRight } from "lucide-vue-next";
import ProductGridSkeleton from "./ProductGridSkeleton.vue";
import ProductCard from "@/domains/products/components/ProductCard.vue";

interface ProductSectionProps {
  title: string;
  subtitle?: string;
  products: Product[];
  loading?: boolean;
  onWishlistToggle?: (productId: string) => void;
  wishlistedIds?: Set<string>;
}

defineProps<ProductSectionProps>();
</script>

<style scoped></style>
