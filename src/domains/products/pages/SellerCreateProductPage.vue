<template>
  <div class="space-y-6 font-sans max-w-6xl mx-auto pb-12">
    <RouterLink
      to="/seller/products"
      class="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
    >
      <ArrowLeft :size="14" /> Back to Inventory
    </RouterLink>

    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-extrabold text-zinc-900 tracking-tight">
          Add New Product
        </h1>
        <p class="text-sm text-zinc-500 mt-1 font-medium">
          Start by filling out the basic details, then you can add images and
          sizes.
        </p>
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
        :is-pending="isPending"
        submit-label="Create Product"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import { ArrowLeft } from "lucide-vue-next";
import type { AxiosError } from "axios";

import { useCreateProduct } from "../hooks/useProducts";
import { useListCategories } from "@/domains/categories/hooks/useCategories";
import {
  type CreateProductInput,
  createProductSchema,
} from "../schemas/product.schema";
import type { productsApi } from "../api/products.api";

import SellerProductPrimarySpecs from "../components/seller-form/SellerProductPrimarySpecs.vue";
import SellerProductAttributes from "../components/seller-form/SellerProductAttributes.vue";
import SellerProductPublishSidebar from "../components/seller-form/SellerProductPublishSidebar.vue";

type CreateProductResult = Awaited<
  ReturnType<typeof productsApi.createProduct>
>;

const router = useRouter();
const { mutateAsync: createProductAsync, isPending } = useCreateProduct();

const { handleSubmit, defineField } = useForm<CreateProductInput>({
  validationSchema: toTypedSchema(createProductSchema),
  initialValues: { attributes: [], status: "draft" },
});

const { data: categoriesData } = useListCategories();
const categories = computed(() => categoriesData.value?.data ?? []);

const [attributesValue] = defineField("attributes");
const [status] = defineField("status");

// `attributes` is optional in the schema, the card always works with an array.
const attributes = computed({
  get: () => attributesValue.value ?? [],
  set: (value: { key: string; value: string }[]) => {
    attributesValue.value = value;
  },
});

const onSubmit = handleSubmit((data: CreateProductInput) => {
  const payload = {
    name: data.name,
    description: data.description,
    basePrice: Number(data.basePrice),
    categoryId: data.categoryId,
    status: data.status,
    attributes: data.attributes,
  };

  toast.promise(createProductAsync(payload), {
    loading: "Creating product...",
    success: (res: CreateProductResult) => {
      // Push them to the edit/preview page immediately so they can add images/variants!
      router.push(`/seller/products/${res.data._id}`);
      return "Product created! Now let's add some images and variants.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to create product.",
  });
});
</script>
