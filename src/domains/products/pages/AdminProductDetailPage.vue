<template>
  <div v-if="isLoading" class="space-y-6">
    <div class="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
    <div class="lg:grid-cols-3 grid gap-6 animate-pulse font-sans">
      <div class="lg:col-span-2 space-y-4">
        <div class="bg-white border border-zinc-200 rounded-lg h-64" />
        <div class="bg-white border border-zinc-200 rounded-lg h-40" />
      </div>
      <div
        class="col-span-1 bg-white border border-zinc-200 rounded-lg h-96"
      />
    </div>
  </div>

  <div
    v-else-if="!product"
    class="flex flex-col items-center justify-center py-24 text-center font-sans"
  >
    <p class="text-zinc-500 font-semibold text-lg">
      Product record data not found
    </p>
    <RouterLink to="/admin/products" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Catalog
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans max-w-7xl mx-auto pb-12">
    <!-- Header breadcrumb row -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"
    >
      <RouterLink
        to="/admin/products"
        class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <ArrowLeft :size="14" /> Back to Products Catalog
      </RouterLink>

      <RouterLink :to="`/admin/products/${product._id}/edit`" class="w-fit">
        <CustomButton
          variant="outline"
          theme="neutral"
          size="sm"
          :left-icon="EditIcon"
        >
          Modify Listing Parameters
        </CustomButton>
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <!-- LEFT COMPONENT COLUMN: Core Specs Display -->
      <div class="lg:col-span-2 space-y-4">
        <div
          class="bg-white border border-zinc-200 rounded-lg p-6 space-y-4 shadow-xs"
        >
          <div>
            <h1 class="text-2xl font-bold text-zinc-900 leading-tight">
              {{ product.name }}
            </h1>
            <p class="text-xs font-mono text-zinc-400 mt-1">
              Product ObjectId: {{ product._id }}
            </p>
          </div>

          <!-- REPLACE the old static gallery grid preview box with the interactive manager component -->
          <ProductImagesManager
            :product-id="product._id"
            :images="product.images || []"
          />

          <div class="border-t border-zinc-100 pt-4 space-y-1.5">
            <span
              class="text-xs font-600 text-zinc-400 uppercase tracking-wider block"
            >
              Description
            </span>
            <p
              class="text-zinc-600 text-base leading-relaxed whitespace-pre-wrap"
            >
              {{ product.description }}
            </p>
          </div>
        </div>

        <ProductVariantsManager :product-id="product._id" />

        <ProductAttributesCard :attributes="product.attributes" />

        <ProductReviewsPanel :product-id="product._id" />
      </div>

      <!-- RIGHT COMPONENT COLUMN: Controls & Context Summary -->
      <div class="col-span-1">
        <ProductInfoSidebar
          :product="product"
          :is-archiving="isArchiving"
          :on-force-archive="forceArchiveAsync"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { ArrowLeft, Pencil } from "lucide-vue-next";

import {
  useAdminForceArchiveProduct,
  useGetProduct,
} from "../hooks/useAdminProducts";
import ProductInfoSidebar from "../components/admin-detail/ProductInfoSidebar.vue";
import ProductAttributesCard from "../components/admin-detail/ProductAttributesCard.vue";
import ProductImagesManager from "../components/admin-detail/ProductImagesManager.vue";
import ProductVariantsManager from "../components/admin-detail/ProductVariantsManager.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ProductReviewsPanel from "@/domains/reviews/components/admin/ProductReviewsPanel.vue";

const props = defineProps<{
  id: string;
}>();

const { data: productData, isLoading } = useGetProduct(() => props.id);
const { mutateAsync: forceArchiveAsync, isPending: isArchiving } =
  useAdminForceArchiveProduct();

const product = computed(() => productData.value?.data);

const EditIcon = () => h(Pencil, { size: 14 });
</script>
