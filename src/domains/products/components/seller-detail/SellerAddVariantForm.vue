<template>
  <form
    @submit="onSubmit"
    class="bg-white border border-zinc-100 rounded-xl p-5 space-y-5 animate-fadeIn shadow-sm font-sans"
  >
    <div
      class="flex items-center justify-between border-b border-zinc-100 pb-3"
    >
      <div>
        <h3 class="text-sm font-bold text-zinc-900">Add New Variant</h3>
        <p class="text-xs text-zinc-500 mt-0.5">
          Define a new size or color option.
        </p>
      </div>
      <button
        type="button"
        @click="emit('cancel')"
        class="h-8 w-8 flex items-center justify-center bg-zinc-50 hover:bg-zinc-100 text-zinc-500 rounded-full transition-colors cursor-pointer"
      >
        <X :size="20" />
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CustomInput
        name="sku"
        type="text"
        label="SKU (Stock Keeping Unit) *"
        placeholder="e.g. TSHIRT-BLK-XL"
        half
        :error="skuError"
        v-model="sku"
        InputClass="bg-zinc-50/50"
      />

      <CustomInput
        name="size"
        type="text"
        label="Size *"
        placeholder="e.g. Medium, 42, One Size"
        half
        :error="sizeError"
        v-model="size"
        InputClass="bg-zinc-50/50"
      />

      <CustomInput
        name="color"
        type="text"
        label="Color *"
        placeholder="e.g. Midnight Black"
        :error="colorError"
        v-model="color"
        InputClass="bg-zinc-50/50"
        half
      />

      <CustomInput
        name="price"
        type="number"
        label="Price (EGP) *"
        placeholder="0.00"
        :min="0"
        :step="0.01"
        :error="priceError"
        InputClass="bg-zinc-50/50"
        half
        :model-value="priceInput"
        @update:model-value="onPriceInput"
      />

      <CustomInput
        name="stock"
        type="number"
        label="Initial Stock Quantity *"
        placeholder="0"
        :min="0"
        :error="stockError"
        InputClass="bg-zinc-50/50"
        :model-value="stockInput"
        @update:model-value="onStockInput"
      />
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        size="md"
        @click="emit('cancel')"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        size="md"
        :disabled="isCreating"
        :left-icon="PlusIcon"
      >
        {{ isCreating ? "Saving..." : "Save Variant" }}
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Plus, X } from "lucide-vue-next";

import {
  createVariantSchema,
  type CreateVariantInput,
} from "../../schemas/inventory.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useCreateVariant } from "../../hooks/useProductInventory";

const props = defineProps<{
  productId: string;
}>();

const emit = defineEmits<{
  cancel: [];
}>();

const { mutateAsync: createVariantAsync, isPending: isCreating } =
  useCreateVariant(() => props.productId);

const { handleSubmit, resetForm } = useForm<CreateVariantInput>({
  validationSchema: toTypedSchema(createVariantSchema),
  initialValues: { stock: 0 },
});

const { value: sku, errorMessage: skuError } =
  useField<string | undefined>("sku");
const { value: size, errorMessage: sizeError } =
  useField<string | undefined>("size");
const { value: color, errorMessage: colorError } =
  useField<string | undefined>("color");

// Number inputs hand back strings; the raw string is kept separately so the
// form value stays numeric for zod without rewriting partial input.
const { value: price, errorMessage: priceError } =
  useField<number | undefined>("price");
const priceInput = ref("");

const onPriceInput = (value: string | undefined) => {
  priceInput.value = value ?? "";
  price.value =
    priceInput.value === "" ? undefined : Number(priceInput.value);
};

const { value: stock, errorMessage: stockError } =
  useField<number | undefined>("stock");
const stockInput = ref("0");

const onStockInput = (value: string | undefined) => {
  stockInput.value = value ?? "";
  stock.value =
    stockInput.value === "" ? undefined : Number(stockInput.value);
};

const PlusIcon = () => h(Plus, { size: 14 });

const onSubmit = handleSubmit((data: CreateVariantInput) => {
  toast.promise(createVariantAsync(data), {
    loading: "Adding new variant...",
    success: () => {
      resetForm();
      priceInput.value = "";
      stockInput.value = "0";
      return "Variant successfully added to inventory.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to add variant.",
  });
});
</script>
