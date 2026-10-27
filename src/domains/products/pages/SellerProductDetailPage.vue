<template>
  <div v-if="isLoading" class="space-y-6">
    <div class="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
    <div class="lg:grid-cols-3 grid gap-6 animate-pulse font-sans">
      <div class="lg:col-span-2 space-y-4">
        <div class="bg-white border border-zinc-100 rounded-2xl h-[400px]" />
        <div class="bg-white border border-zinc-100 rounded-2xl h-40" />
      </div>
      <div
        class="col-span-1 bg-white border border-zinc-100 rounded-2xl h-96"
      />
    </div>
  </div>

  <div
    v-else-if="!product"
    class="flex flex-col items-center justify-center py-24 text-center font-sans bg-white rounded-2xl border border-zinc-100"
  >
    <p class="text-zinc-500 font-semibold text-lg">
      Product not found in your inventory
    </p>
    <RouterLink to="/seller/products" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Inventory
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans max-w-7xl mx-auto pb-12">
    <!-- Merchant Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-zinc-100 shadow-sm"
    >
      <RouterLink
        to="/seller/products"
        class="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
      >
        <ArrowLeft :size="18" class="text-lg" /> Back to Inventory
      </RouterLink>

      <RouterLink :to="`/seller/products/${product.data._id}/edit`">
        <CustomButton
          variant="solid"
          theme="primary"
          size="sm"
          :left-icon="EditIcon"
          class="rounded-xl shadow-sm hover:shadow-md transition-all"
        >
          Edit Product
        </CustomButton>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- LEFT COMPONENT COLUMN -->
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm relative overflow-hidden"
        >
          <!-- Soft background glow for merchant feel -->
          <div
            class="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl -z-10 opacity-50"
          />

          <div>
            <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">
              {{ product.data.name }}
            </h1>
            <p class="text-sm text-zinc-400 mt-1 font-medium">
              SLUG:
              <span class="font-mono text-zinc-500">
                {{ product.data.slug }}
              </span>
            </p>
          </div>

          <!-- New Merchant Gallery -->
          <SellerProductImages
            :product-id="product.data._id"
            :images="product.data.images || []"
          />

          <div class="pt-4">
            <h3 class="text-sm font-bold text-zinc-900 mb-2">Description</h3>
            <div class="bg-zinc-50/50 rounded-xl p-4 border border-zinc-100">
              <p
                class="text-zinc-600 text-sm leading-relaxed whitespace-pre-wrap"
              >
                {{ product.data.description }}
              </p>
            </div>
          </div>
        </div>

        <SellerProductVariants :product-id="product.data._id" />

        <SellerProductAttributes :attributes="product.data.attributes" />
      </div>

      <!-- RIGHT COMPONENT COLUMN -->
      <div class="col-span-1">
        <SellerProductSidebar
          :product="product.data"
          :is-archiving="isArchiving"
          :on-archive="archiveAsync"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { ArrowLeft, Pencil } from "lucide-vue-next";

import { useSellerProduct } from "../hooks/useSellerProducts";
import { useArchiveProduct } from "../hooks/useProducts";

// NEW SELLER COMPONENTS
import SellerProductSidebar from "../components/seller-detail/SellerProductSidebar.vue";
import SellerProductAttributes from "../components/seller-detail/SellerProductAttributes.vue";
import SellerProductImages from "../components/seller-detail/SellerProductImages.vue";
import SellerProductVariants from "../components/seller-detail/SellerProductVariants.vue";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  id: string;
}>();

const { data: productData, isLoading } = useSellerProduct(() => props.id);
const { mutateAsync: archiveAsync, isPending: isArchiving } =
  useArchiveProduct();

const product = computed(() => productData.value);

const EditIcon = () => h(Pencil, { size: 14 });
</script>
