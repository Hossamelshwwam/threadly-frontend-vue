<template>
  <div
    v-if="isProductLoading"
    class="flex flex-col items-center justify-center py-32 font-sans gap-3"
  >
    <LoaderCircle :size="30" class="text-3xl text-amber-500 animate-spin" />
    <p class="text-sm font-semibold text-zinc-500">
      Retrieving catalog record context...
    </p>
  </div>

  <div
    v-else-if="!product"
    class="flex flex-col items-center justify-center py-24 text-center font-sans"
  >
    <p class="text-zinc-500 font-bold text-lg">
      Product record data not found
    </p>
    <RouterLink to="/admin/products" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Catalog
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <RouterLink
      :to="`/admin/products/${id}`"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ArrowLeft :size="14" />
      Cancel and Return to View Detail
    </RouterLink>

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-zinc-900">
          Modify Listing Parameters
        </h1>
        <p class="text-xs text-on-surface-muted mt-0.5">
          Editing: {{ product.name }}
        </p>
      </div>
    </div>

    <form
      @submit="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
    >
      <div class="lg:col-span-2 space-y-4">
        <!-- Re-use shared presentational spec form -->
        <ProductPrimarySpecsForm :categories="categories" />

        <!-- Re-use shared attributes panel form -->
        <ProductAttributesForm />
      </div>

      <!-- Re-use shared sidebar workflow deck -->
      <ProductPublishSidebar :sellers="sellers" :is-pending="isUpdating" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { ArrowLeft, LoaderCircle } from "lucide-vue-next";
import type { AxiosError } from "axios";

import { useGetProduct } from "../hooks/useAdminProducts";
import { useUpdateProduct } from "../hooks/useProducts";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";
import {
  type UpdateProductInput,
  updateProductSchema,
} from "../schemas/product.schema";

import ProductPrimarySpecsForm from "../components/admin-form/ProductPrimarySpecsForm.vue";
import ProductAttributesForm from "../components/admin-form/ProductAttributesForm.vue";
import ProductPublishSidebar from "../components/admin-form/ProductPublishSidebar.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

// 1. Fetch current single product snapshot parameters directly from your
//    authorized Admin endpoint
const { data: productData, isLoading: isProductLoading } = useGetProduct(
  () => props.id,
);
const { mutateAsync: updateProductAsync, isPending: isUpdating } =
  useUpdateProduct();

// 2. Fetch context selection drops
const { data: sellersData } = useAdminSellers({ page: 1, limit: 100 });
const { data: categoriesData } = useAdminCategories({ page: 1, limit: 100 });

const sellers = computed(() => sellersData.value?.data ?? []);
const categories = computed(() => categoriesData.value?.data ?? []);

const product = computed(() => productData.value?.data);

// 3. Initialize the validation engine
const { handleSubmit, resetForm } = useForm<UpdateProductInput>({
  validationSchema: toTypedSchema(updateProductSchema),
});

// 4. Pre-populate parameters into inputs as soon as the data resolves cleanly
watch(
  product,
  (value) => {
    if (!value) return;

    resetForm({
      values: {
        name: value.name,
        description: value.description,
        basePrice: value.basePrice,
        categoryId:
          typeof value.categoryId === "object"
            ? value.categoryId._id
            : value.categoryId,
        sellerId:
          value.sellerId && typeof value.sellerId === "object"
            ? value.sellerId._id
            : value.sellerId || "",
        status: value.status,
        attributes: value.attributes || [],
      },
    });
  },
  { immediate: true },
);

const onSubmit = handleSubmit((data: UpdateProductInput) => {
  const payload = {
    name: data.name,
    description: data.description,
    basePrice: Number(data.basePrice),
    categoryId: data.categoryId,
    sellerId: data.sellerId || undefined,
    status: data.status,
    attributes: data.attributes,
  };

  toast.promise(updateProductAsync({ id: props.id, payload }), {
    loading: "Saving product parameter adjustments...",
    success: () => {
      router.push(`/admin/products/${props.id}`);
      return "Product configurations updated successfully!";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to adjust product listing.",
  });
});
</script>
