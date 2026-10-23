<template>
  <StorefrontSkeleton v-if="isLoading && !store" />

  <div
    v-else-if="storeError || !store"
    class="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 font-sans animate-fadeIn"
  >
    <ShoppingBag :size="60" class="text-6xl text-zinc-300 mb-4" />
    <h1 class="text-2xl font-black text-zinc-900 mb-2">Store not found</h1>
    <p class="text-zinc-500 font-medium">
      This store might have been removed or the URL is incorrect.
    </p>
  </div>

  <div
    v-else
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28 font-sans animate-fadeIn"
  >
    <!-- 1. Store Profile Header -->
    <StoreHeader :store="store" />

    <!-- 2. Store Products Section -->
    <div class="mt-12">
      <div
        class="flex items-center justify-between mb-8 border-b border-zinc-200 pb-4"
      >
        <h2 class="text-xl font-black text-zinc-900 flex items-center gap-2">
          All Products
          <span
            class="bg-zinc-100 text-zinc-600 text-xs px-2 py-1 rounded-lg"
          >
            {{ totalProducts }}
          </span>
        </h2>
      </div>

      <div
        v-if="products.length === 0"
        class="bg-white border border-zinc-200 rounded-3xl p-16 text-center shadow-sm"
      >
        <ShoppingBag :size="48" class="mx-auto text-5xl text-zinc-300 mb-4" />
        <h3 class="text-lg font-black text-zinc-900">No products available</h3>
        <p class="text-zinc-500 mt-1 font-medium">
          This seller hasn't listed any items yet.
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
      >
        <ProductCard
          v-for="product in products"
          :key="product._id"
          :product="product"
        />
      </div>

      <!-- Load More Button (Infinite Query) -->
      <div v-if="hasNextPage" class="mt-12 flex justify-center">
        <CustomButton
          variant="outline"
          theme="neutral"
          :disabled="isFetchingNextPage"
          @click="fetchNextPage()"
          class="font-bold rounded-xl px-8 h-12"
        >
          <span v-if="isFetchingNextPage" class="flex items-center gap-2">
            <LoaderCircle class="animate-spin" :size="18" />
            Loading...
          </span>
          <template v-else>Load More Products</template>
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { LoaderCircle, ShoppingBag } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useStoreDetails } from "@/domains/sellers/hooks/useStoreDetails";
import StorefrontSkeleton from "@/domains/sellers/components/store/StorefrontSkeleton.vue";
import StoreHeader from "@/domains/sellers/components/store/StoreHeader.vue";
import { useInfinitePublicProducts } from "@/domains/products/hooks/useInfinitePublicProducts";
import ProductCard from "@/domains/products/components/ProductCard.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

// 1. Fetch Store Profile
const {
  data: storeRes,
  isLoading: isLoadingStore,
  error: storeError,
} = useStoreDetails(slug);

const store = computed(() => storeRes.value?.data);

// 2. Fetch Products infinitely (tied to the seller ID once available)
const productsParams = computed(() =>
  store.value?._id ? { seller: store.value._id } : undefined,
);

const {
  data: productsRes,
  isLoading: isLoadingProducts,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
} = useInfinitePublicProducts(productsParams, computed(() => !!store.value?._id));

const isLoading = computed(() => isLoadingStore.value || isLoadingProducts.value);

// Flatten the pages array from infinite query into a single products array
const products = computed(
  () => productsRes.value?.pages.flatMap((page) => page.data) || [],
);

// Get the total count from the first page's pagination metadata
const totalProducts = computed(
  () => productsRes.value?.pages[0]?.pagination?.total || products.value.length,
);
</script>

<style scoped></style>
