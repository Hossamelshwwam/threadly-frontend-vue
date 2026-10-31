<template>
  <!-- Absolute-Inlined Action Form -->
  <form
    @submit.prevent="handleRestockSubmit"
    class="relative flex-1 font-sans w-full"
  >
    <CustomInput
      :name="`restock-${variant._id}`"
      type="number"
      placeholder="Add stock..."
      :min="1"
      :disabled="isRestocking"
      :model-value="restockAmount"
      @update:model-value="onRestockInput"
      InputClass="bg-white rounded-lg h-10 w-full pr-14 shadow-sm border-zinc-200"
    />
    <button
      type="submit"
      :disabled="isRestocking || !restockAmount"
      class="absolute right-1 top-1 bottom-1 px-3 bg-zinc-900 text-white rounded-md flex items-center justify-center transition-all cursor-pointer hover:bg-zinc-800 disabled:opacity-0 disabled:pointer-events-none font-bold text-xs"
      title="Execute inline restocking"
    >
      Add
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import type { ProductVariant } from "../../types/inventory.types";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";

const props = defineProps<{
  variant: ProductVariant;
  isRestocking: boolean;
  onRestock: (variantId: string, quantity: number) => Promise<unknown>;
}>();

const restockAmount = ref("");

const onRestockInput = (value: string | undefined) => {
  restockAmount.value = value ?? "";
};

const handleRestockSubmit = () => {
  const amount = parseInt(restockAmount.value, 10);
  if (isNaN(amount) || amount < 1) {
    toast.error(
      "Please insert a valid restock increment of 1 or more units.",
    );
    return;
  }

  toast.promise(props.onRestock(props.variant._id, amount), {
    loading: "Incrementing physical inventory shelves...",
    success: () => {
      restockAmount.value = "";
      return `Successfully appended ${amount} units to SKU: ${props.variant.sku}`;
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to restock variant selection.",
  });
};
</script>
