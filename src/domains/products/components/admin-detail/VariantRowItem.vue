<template>
  <EditVariantForm
    v-if="isEditing"
    :variant="variant"
    :is-pending="isUpdating"
    :on-save="handleUpdateSave"
    @cancel="isEditing = false"
  />

  <!-- State B: Completely Redesigned Dynamic Block Module Layout -->
  <div
    v-else
    class="bg-white border border-zinc-200 rounded-xl overflow-hidden flex flex-col justify-between transition-all hover:border-zinc-300 hover:shadow-sm font-sans h-full"
  >
    <VariantRowHeader :variant="variant" />

    <VariantStockStats :variant="variant" />

    <!-- Bottom Segment: Seamless Interactive Control Panel Bar -->
    <!-- FIX: Stacked on mobile (flex-col), row on tablet (sm:flex-row) -->
    <div
      class="border-t border-zinc-100 p-3 bg-zinc-50/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 mt-auto"
    >
      <VariantRestockForm
        :variant="variant"
        :is-restocking="isRestocking"
        :on-restock="onRestock"
      />

      <VariantRowActions
        :variant="variant"
        :is-restocking="isRestocking"
        :is-deleting="isDeleting"
        :on-delete="onDelete"
        @edit="isEditing = true"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import type { ProductVariant } from "../../types/inventory.types";
import type { UpdateVariantInput } from "../../schemas/inventory.schema";
import EditVariantForm from "./EditVariantForm.vue";
import VariantRowHeader from "./VariantRowHeader.vue";
import VariantStockStats from "./VariantStockStats.vue";
import VariantRestockForm from "./VariantRestockForm.vue";
import VariantRowActions from "./VariantRowActions.vue";

const props = withDefaults(
  defineProps<{
    variant: ProductVariant;
    isRestocking: boolean;
    isDeleting: boolean;
    isUpdating?: boolean;
    onRestock: (variantId: string, quantity: number) => Promise<unknown>;
    onDelete: (variantId: string) => Promise<unknown>;
    onUpdate: (
      variantId: string,
      payload: UpdateVariantInput,
    ) => Promise<unknown>;
  }>(),
  {
    isUpdating: false,
  },
);

const isEditing = ref(false);

const handleUpdateSave = (data: UpdateVariantInput) => {
  return toast.promise(props.onUpdate(props.variant._id, data), {
    loading: "Updating variant specifications...",
    success: () => {
      isEditing.value = false;
      return "Variant data modified successfully.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to save variant updates.",
  });
};
</script>
