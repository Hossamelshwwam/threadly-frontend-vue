<template>
  <div class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <RouterLink
      to="/admin/products"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ArrowLeft :size="14" />
      Back to Products Catalog
    </RouterLink>

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-zinc-900">Publish New Product</h1>
    </div>

    <form
      @submit="onSubmit"
      class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
    >
      <div class="lg:col-span-2 space-y-4">
        <ProductPrimarySpecsForm :categories="categories" />

        <ProductAttributesForm />
      </div>

      <ProductPublishSidebar :sellers="sellers" :is-pending="isPending" />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { ArrowLeft } from "lucide-vue-next";
import type { AxiosError } from "axios";

import { useCreateProduct } from "../hooks/useProducts";
import { useAdminSellers } from "@/domains/sellers/hooks/useAdminSellers";
import { useAdminCategories } from "@/domains/categories/hooks/useAdminCategories";
import {
  type CreateProductInput,
  createProductSchema,
} from "../schemas/product.schema";

import ProductPrimarySpecsForm from "../components/admin-form/ProductPrimarySpecsForm.vue";
import ProductAttributesForm from "../components/admin-form/ProductAttributesForm.vue";
import ProductPublishSidebar from "../components/admin-form/ProductPublishSidebar.vue";

const { mutateAsync: createProductAsync, isPending } = useCreateProduct();

const { handleSubmit, resetForm } = useForm<CreateProductInput>({
  validationSchema: toTypedSchema(createProductSchema),
  initialValues: {
    attributes: [],
    status: "active",
  },
});

const { data: sellersData } = useAdminSellers({ page: 1, limit: 100 });
const { data: categoriesData } = useAdminCategories({ page: 1, limit: 100 });

const sellers = computed(() => sellersData.value?.data ?? []);
const categories = computed(() => categoriesData.value?.data ?? []);

const onSubmit = handleSubmit((data: CreateProductInput) => {
  const payload = {
    name: data.name,
    description: data.description,
    basePrice: Number(data.basePrice),
    categoryId: data.categoryId,
    sellerId: data.sellerId,
    status: data.status,
    attributes: data.attributes,
  };

  toast.promise(createProductAsync(payload), {
    loading: "Publishing product listing core parameters...",
    success: () => {
      resetForm();
      return "Product created successfully! Proceeding to upload asset images.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to create product listing.",
  });
});
</script>
