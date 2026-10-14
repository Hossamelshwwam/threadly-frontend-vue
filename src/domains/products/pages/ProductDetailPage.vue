<template>
  <ProductDetailSkeleton v-if="isLoading" />

  <div
    v-else-if="!product"
    class="min-h-[70vh] flex flex-col items-center justify-center px-4"
  >
    <div
      class="text-center p-12 bg-white rounded-3xl border border-zinc-100 shadow-sm max-w-md w-full"
    >
      <h1 class="text-2xl font-black text-zinc-950 mb-3">Product Not Found</h1>
      <p class="text-zinc-500 mb-8 leading-relaxed">
        The product you&apos;re looking for doesn&apos;t exist or has been
        removed from our catalog.
      </p>
      <RouterLink
        to="/products"
        class="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 font-bold text-white transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0"
      >
        Browse Products <ArrowRight :size="18" />
      </RouterLink>
    </div>
  </div>

  <div v-else class="min-h-screen bg-zinc-50 pb-24 pt-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <ProductBreadcrumb :product="product" />

      <!-- 50/50 Layout Grid to match the new Gallery direction -->
      <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Left Column: Image Gallery -->
        <div class="lg:col-span-1">
          <ImageGallery :images="product.images" :product-name="product.name" />
        </div>

        <!-- Right Column: Sticky Product Action Box -->
        <div class="mt-10 lg:col-span-1 lg:mt-0">
          <!-- Removed the white box/borders to make it feel like an editorial layout -->
          <div class="sticky top-32 flex flex-col gap-10 pl-0 lg:pl-8 xl:pl-12">
            <ProductInfo
              :product="product"
              :display-price="displayPrice"
              :base-price="product.basePrice"
              :average-rating="averageRating"
              :total-reviews="totalReviews"
            />

            <div v-if="hasVariants" class="py-2">
              <VariantSelector
                :variants="variants"
                :selected-color="selectedColor"
                :selected-size="selectedSize"
                @color-change="setSelectedColor"
                @size-change="setSelectedSize"
              />
            </div>

            <div
              class="rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100"
            >
              <AddToCartSection
                :product-id="product._id"
                :inventory-id="selectedVariant?._id"
                :max-stock="maxStock"
                :has-variants="hasVariants"
                :price="displayPrice"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section 1: Specifications / Attributes -->
      <div
        v-if="product.attributes && product.attributes.length > 0"
        class="mt-16 rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-zinc-100"
      >
        <ProductAttributes :attributes="product.attributes" />
      </div>

      <!-- Bottom Section 2: Reviews -->
      <div
        v-if="product._id"
        class="mt-8 rounded-3xl bg-white p-6 sm:p-10 shadow-sm border border-zinc-100"
      >
        <ReviewsSection
          :reviews="reviews"
          :average-rating="averageRating"
          :total-reviews="totalReviews"
          :rating-breakdown="ratingBreakdown"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { ArrowRight } from "lucide-vue-next";
import { useProductDetail } from "@/domains/products/hooks/useProductDetail";
import { useProductReviews } from "@/domains/reviews/hooks/useProductReviews";
import { useVariantSelection } from "@/domains/products/hooks/useVariantSelection";
import ImageGallery from "@/domains/products/components/product-detail/ImageGallery.vue";
import ProductInfo from "@/domains/products/components/product-detail/ProductInfo.vue";
import VariantSelector from "@/domains/products/components/product-detail/VariantSelector.vue";
import AddToCartSection from "@/domains/products/components/product-detail/AddToCartSection.vue";
import ProductBreadcrumb from "@/domains/products/components/product-detail/ProductBreadcrumb.vue";
import ProductAttributes from "@/domains/products/components/product-detail/ProductAttributes.vue";
import ProductDetailSkeleton from "@/domains/products/components/product-detail/ProductDetailSkeleton.vue";
import ReviewsSection from "@/domains/products/components/product-detail/ReviewsSection.vue";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const { data, isLoading } = useProductDetail(slug);
const product = computed(() => data.value?.product);
const variants = computed(() => data.value?.variants ?? []);

const basePrice = computed(() => product.value?.basePrice ?? 0);

const {
  selectedColor,
  selectedSize,
  selectedVariant,
  displayPrice,
  maxStock,
  hasVariants,
  setSelectedColor,
  setSelectedSize,
} = useVariantSelection(variants.value, basePrice.value);

const productId = computed(() => product.value?._id ?? "");
const { data: reviewsData } = useProductReviews(productId, { limit: 5 });

const reviews = computed(() => reviewsData.value?.data?.reviews ?? []);
const averageRating = computed(
  () => reviewsData.value?.data?.averageRating ?? 0,
);
const totalReviews = computed(() => reviewsData.value?.data?.totalReviews ?? 0);
const ratingBreakdown = computed(
  () => reviewsData.value?.data?.ratingBreakdown,
);
</script>

<style scoped></style>
