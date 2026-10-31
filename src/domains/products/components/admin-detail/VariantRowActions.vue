<template>
  <!-- Dropdown / Edit Menu shortcut triggers -->
  <!-- FIX: 50/50 split on mobile (flex-1), icon squares on desktop (w-10 h-10) -->
  <div
    class="flex items-center gap-2 shrink-0 sm:border-l sm:border-zinc-200 sm:pl-2"
  >
    <button
      type="button"
      @click="emit('edit')"
      :disabled="isDeleting || isRestocking"
      class="flex-1 sm:flex-none h-10 sm:w-10 flex items-center justify-center gap-2 border border-zinc-200 bg-white text-zinc-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 rounded-lg transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
      title="Modify attributes mapping"
    >
      <Pencil :size="16" />
      <span class="sm:hidden text-xs font-bold">Edit</span>
    </button>

    <ConfirmationDialog
      :on-confirm="handleDeleteTrigger"
      title="Permanently Drop Variant Configuration"
      :description="deleteDescription"
      confirm-text="Delete SKU Allocation"
      cancel-text="Cancel"
      variant="danger"
      :is-loading="isDeleting"
    >
      <button
        type="button"
        :disabled="isDeleting || isRestocking"
        class="max-sm:flex-1 w-full sm:w-10 h-10 flex items-center justify-center gap-2 border border-zinc-200 bg-white text-zinc-400 hover:text-error hover:border-error/30 hover:bg-error-bg rounded-lg transition-colors cursor-pointer disabled:opacity-40 shadow-sm"
        title="Drop assignment from catalog"
      >
        <Trash2 :size="16" />
        <span class="sm:hidden text-xs font-bold">Delete</span>
      </button>
    </ConfirmationDialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Pencil, Trash2 } from "lucide-vue-next";

import type { ProductVariant } from "../../types/inventory.types";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";

const props = defineProps<{
  variant: ProductVariant;
  isRestocking: boolean;
  isDeleting: boolean;
  onDelete: (variantId: string) => Promise<unknown>;
}>();

const emit = defineEmits<{
  edit: [];
}>();

const deleteDescription = computed(
  () =>
    `Are you sure you want to drop SKU alignment "${props.variant.sku}"? Dropping this allocation removes all stock profiles and size tags instantly.`,
);

const handleDeleteTrigger = () => {
  toast.promise(props.onDelete(props.variant._id), {
    loading: "Removing variant stock reference from catalog database...",
    success: "Variant allocation dropped successfully.",
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to remove variant SKU.",
  });
};
</script>
