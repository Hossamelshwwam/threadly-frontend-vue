<template>
  <form
    @submit="onSubmit"
    class="bg-zinc-50 border border-zinc-200 rounded-xl p-5 space-y-4 animate-fadeIn font-sans h-full flex flex-col justify-between"
  >
    <div class="space-y-4">
      <div
        class="flex items-center justify-between border-b border-zinc-200 pb-2"
      >
        <div>
          <h3 class="text-sm font-bold text-zinc-900">Edit Variant</h3>
          <span class="text-xs text-zinc-500 font-mono">
            ID: {{ variant._id }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <CustomInput
          name="sku"
          type="text"
          label="SKU"
          half
          :error="skuError"
          v-model="sku"
          InputClass="bg-white"
        />
        <CustomInput
          name="size"
          type="text"
          label="Size"
          half
          :error="sizeError"
          v-model="size"
          InputClass="bg-white"
        />
        <CustomInput
          name="color"
          type="text"
          label="Color"
          half
          :error="colorError"
          v-model="color"
          InputClass="bg-white"
        />
        <CustomInput
          name="price"
          type="number"
          label="Price (EGP)"
          half
          :min="0"
          :step="0.01"
          :error="priceError"
          :model-value="priceInput"
          @update:model-value="onPriceInput"
          InputClass="bg-white"
        />
      </div>
    </div>

    <div class="flex items-center justify-end gap-2 mt-4 pt-2">
      <CustomButton
        type="button"
        variant="soft"
        theme="neutral"
        size="sm"
        @click="emit('cancel')"
        :left-icon="CloseIcon"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        size="sm"
        :disabled="isPending"
        :left-icon="CheckIcon"
      >
        {{ isPending ? "Saving..." : "Save Changes" }}
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { Check, X } from "lucide-vue-next";

import type { ProductVariant } from "../../types/inventory.types";
import {
  updateVariantSchema,
  type UpdateVariantInput,
} from "../../schemas/inventory.schema";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  variant: ProductVariant;
  isPending: boolean;
  onSave: (data: UpdateVariantInput) => unknown;
}>();

const emit = defineEmits<{
  cancel: [];
}>();

const { handleSubmit } = useForm<UpdateVariantInput>({
  validationSchema: toTypedSchema(updateVariantSchema),
  initialValues: {
    sku: props.variant.sku,
    size: props.variant.size,
    color: props.variant.color,
    price: props.variant.price,
  },
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
const priceInput = ref(String(props.variant.price));

const onPriceInput = (value: string | undefined) => {
  priceInput.value = value ?? "";
  price.value =
    priceInput.value === "" ? undefined : Number(priceInput.value);
};

const CloseIcon = () => h(X, { size: 14 });
const CheckIcon = () => h(Check, { size: 14 });

const onSubmit = handleSubmit((data: UpdateVariantInput) => {
  props.onSave(data);
});
</script>
