<template>
  <div v-if="isProductLoading" class="flex justify-center py-32">
    <LoaderCircle :size="36" class="text-4xl text-amber-500 animate-spin" />
  </div>

  <div v-else class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <RouterLink
      :to="`/seller/products/${id}`"
      class="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors bg-white px-3 py-1.5 rounded-lg border border-zinc-100 shadow-sm w-fit"
    >
      <ArrowLeft :size="14" /> Return to Preview
    </RouterLink>

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">
          Edit Details
        </h1>
      </div>
    </div>

    <form
      @submit="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 items-start"
    >
      <div class="lg:col-span-2 space-y-6 md:space-y-8">
        <SellerProductPrimarySpecs :categories="categories" />
        <SellerProductAttributes v-model:attributes="attributes" />
      </div>

      <SellerProductPublishSidebar
        v-model:status="status"
        :is-pending="isUpdating"
        submit-label="Save Changes"
      />
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

import { useSellerProduct } from "../hooks/useSellerProducts";
import { useUpdateProduct } from "../hooks/useProducts";
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import {
  type UpdateProductInput,
  updateProductSchema,
} from "../schemas/product.schema";
import type { ProductStatus } from "../types/product.types";

// REUSING THE SELLER FORM COMPONENTS!
import SellerProductPrimarySpecs from "../components/seller-form/SellerProductPrimarySpecs.vue";
import SellerProductAttributes from "../components/seller-form/SellerProductAttributes.vue";
import SellerProductPublishSidebar from "../components/seller-form/SellerProductPublishSidebar.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const { data: productData, isLoading: isProductLoading } = useSellerProduct(
  () => props.id,
);
const { mutateAsync: updateProductAsync, isPending: isUpdating } =
  useUpdateProduct();

const { data: categoriesData } = useListCategories();
const categories = computed(() => categoriesData.value?.data ?? []);

const product = computed(() => productData.value?.data);

const { handleSubmit, defineField, resetForm } = useForm<UpdateProductInput>({
  validationSchema: toTypedSchema(updateProductSchema),
});

const [attributesValue] = defineField("attributes");
const [statusValue] = defineField("status");

// `attributes` and `status` are optional in the partial update schema, the
// cards always work with a concrete value.
const attributes = computed({
  get: () => attributesValue.value ?? [],
  set: (value: { key: string; value: string }[]) => {
    attributesValue.value = value;
  },
});

const status = computed<ProductStatus>({
  get: () => statusValue.value ?? "draft",
  set: (value) => {
    statusValue.value = value;
  },
});

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
    status: data.status,
    attributes: data.attributes,
  };

  toast.promise(updateProductAsync({ id: props.id, payload }), {
    loading: "Saving changes...",
    success: () => {
      router.push(`/seller/products/${props.id}`);
      return "Product updated successfully!";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to update product.",
  });
});
</script>
