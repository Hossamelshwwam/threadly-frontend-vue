<template>
  <form
    @submit="onSubmit"
    class="bg-zinc-50 border border-zinc-200 rounded-lg p-5 space-y-4 animate-fadeIn font-sans"
  >
    <div
      class="flex items-center justify-between border-b border-zinc-200/60 pb-2"
    >
      <h3 class="text-xs font-bold text-zinc-700 uppercase tracking-wider">
        Configure New Item Variant SKU
      </h3>
      <button
        type="button"
        @click="emit('cancel')"
        class="text-zinc-400 hover:text-zinc-600 cursor-pointer"
      >
        <X :size="20" />
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <AddVariantIdentityFields />
      <AddVariantPricingFields />
    </div>

    <div class="flex justify-end gap-2 border-t border-zinc-200/40 pt-3">
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        size="sm"
        @click="emit('cancel')"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        size="sm"
        :disabled="isCreating"
        :left-icon="AddIcon"
      >
        {{ isCreating ? "Adding..." : "Add Variant" }}
      </CustomButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { h } from "vue";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Plus, X } from "lucide-vue-next";

import {
  createVariantSchema,
  type CreateVariantInput,
} from "../../schemas/inventory.schema";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { useCreateVariant } from "../../hooks/useProductInventory";
import AddVariantIdentityFields from "./AddVariantIdentityFields.vue";
import AddVariantPricingFields from "./AddVariantPricingFields.vue";

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

const AddIcon = () => h(Plus, { size: 14 });

const onSubmit = handleSubmit((data: CreateVariantInput) => {
  toast.promise(createVariantAsync(data), {
    loading: "Publishing SKU allocation details...",
    success: () => {
      resetForm();
      return "Variant option appended to stock matrix successfully.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message ||
      "Failed to finalize variant SKU creation.",
  });
});
</script>
