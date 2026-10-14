<template>
  <div>
    <HeroSection />
    <CategoryGrid />
    <ProductSection
      title="Featured Arrivals"
      subtitle="Selected Works"
      :products="featuredData?.data ?? []"
      :loading="featuredLoading"
      @wishlistToggle="toggleWishlist"
      :wishlistedIds="wishlist"
    />
    <ProductSection
      title="New Arrivals"
      subtitle="Fresh Drops"
      :products="newArrivalsData?.data ?? []"
      :loading="newArrivalsLoading"
      @wishlistToggle="toggleWishlist"
      :wishlistedIds="wishlist"
    />
    <NewsletterSection />
  </div>
</template>

<script setup lang="ts">
import { usePublicProducts } from "@/domains/products/hooks/usePublicProducts.ts";
import CategoryGrid from "../components/home/CategoryGrid.vue";
import HeroSection from "../components/home/HeroSection.vue";
import NewsletterSection from "../components/home/NewsletterSection.vue";
import ProductSection from "../components/home/ProductSection.vue";
import { ref } from "vue";

const { data: featuredData, isLoading: featuredLoading } = usePublicProducts({
  limit: 8,
  sort: "rating",
});

const { data: newArrivalsData, isLoading: newArrivalsLoading } =
  usePublicProducts({
    limit: 8,
    sort: "newest",
  });

const wishlist = ref<Set<string>>(new Set());

const toggleWishlist = (productId: string) => {
  const next = new Set(wishlist.value);

  if (next.has(productId)) {
    next.delete(productId);
  } else {
    next.add(productId);
  }

  wishlist.value = next;
};
</script>

<style scoped></style>
