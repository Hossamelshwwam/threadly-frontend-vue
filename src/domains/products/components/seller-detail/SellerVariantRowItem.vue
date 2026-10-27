<template>
  <SellerEditVariantForm
    v-if="isEditing"
    :variant="variant"
    :is-pending="isUpdating"
    :on-save="handleUpdateSave"
    @cancel="isEditing = false"
  />

  <div
    v-else
    class="bg-white rounded-xl flex flex-col justify-between font-sans h-full shadow-sm border border-zinc-100"
  >
    <!-- Top Banner: Price & SKU -->
    <!-- FIX: Changed to flex-wrap to prevent clipping if prices get very long -->
    <div
      class="p-4 flex flex-wrap items-start justify-between gap-3 border-b border-zinc-50"
    >
      <div class="flex flex-col gap-1">
        <span class="text-lg font-black text-zinc-900 tracking-tight">
          EGP {{ variant.price.toLocaleString() }}
        </span>
        <span
          class="font-mono text-[10px] bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-md w-fit"
        >
          {{ variant.sku }}
        </span>
      </div>

      <!-- Attributes Badge Group -->
      <div class="flex flex-col items-end gap-1.5">
        <span
          class="bg-amber-50 text-amber-700 border border-amber-200/50 px-2.5 py-0.5 rounded-md text-xs font-bold shadow-sm"
        >
          Size: {{ variant.size }}
        </span>
        <div
          class="flex items-center gap-1.5 bg-zinc-50 border border-zinc-200 px-2 py-0.5 rounded-md shadow-sm"
        >
          <span
            :style="{ backgroundColor: variant.color }"
            class="w-2.5 h-2.5 rounded-full border border-black/10"
          ></span>
          <span class="text-[11px] font-semibold text-zinc-700">
            {{ variant.color }}
          </span>
        </div>
      </div>
    </div>

    <!-- Middle: Stock Indicators -->
    <!-- No changes needed here, a 2-column grid works perfectly on mobile -->
    <div class="p-4 grid grid-cols-2 gap-3 bg-zinc-50/50">
      <div
        :class="
          cn(
            'p-3 rounded-xl border shadow-sm flex flex-col items-center justify-center',
            variant.stock === 0
              ? 'bg-error-bg/50 border-error/20 text-error'
              : 'bg-white border-zinc-200 text-zinc-800',
          )
        "
      >
        <span
          class="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5"
        >
          Available
        </span>
        <span
          :class="
            cn(
              'text-xl font-black',
              variant.stock === 0 ? 'text-error' : 'text-emerald-600',
            )
          "
        >
          {{ variant.stock }}
        </span>
      </div>

      <div
        :class="
          cn(
            'p-3 rounded-xl border shadow-sm flex flex-col items-center justify-center',
            variant.reserved > 0
              ? 'bg-warning-bg/50 border-warning/20 text-warning-800'
              : 'bg-white border-zinc-200 text-zinc-500',
          )
        "
      >
        <span
          class="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-0.5"
        >
          Reserved
        </span>
        <span class="text-xl font-black">{{ variant.reserved }}</span>
      </div>
    </div>

    <!-- Bottom: Actions Strip -->
    <!-- FIX: Stacked layout on mobile (flex-col), row layout on tablet (sm:flex-row) -->
    <div
      class="border-t border-zinc-100 p-3 bg-white flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-2 mt-auto rounded-b-xl"
    >
      <!-- Restock Form -->
      <form @submit.prevent="handleRestockSubmit" class="relative flex-1">
        <CustomInput
          :name="`restock-${variant._id}`"
          type="number"
          placeholder="Add stock..."
          :min="1"
          :disabled="isRestocking"
          :model-value="restockAmount"
          @update:model-value="onRestockInput"
          InputClass="bg-zinc-50 border-zinc-200 rounded-lg h-10 text-sm focus:bg-white w-full pr-14"
        />
        <button
          type="submit"
          :disabled="isRestocking || !restockAmount"
          class="absolute right-1 top-1 bottom-1 px-3 bg-zinc-900 text-white rounded-md flex items-center justify-center transition-all cursor-pointer hover:bg-amber-500 disabled:opacity-0 disabled:pointer-events-none font-bold text-xs"
        >
          Add
        </button>
      </form>

      <!-- Edit & Delete Buttons -->
      <!-- FIX: These split the screen 50/50 on mobile, but shrink to fixed icons on tablet -->
      <div
        class="flex items-center gap-2 sm:shrink-0 sm:border-l sm:border-zinc-100 sm:pl-2"
      >
        <button
          type="button"
          @click="isEditing = true"
          :disabled="isDeleting || isRestocking"
          class="flex-1 sm:flex-none h-10 sm:w-10 flex items-center justify-center gap-2 bg-zinc-50 text-zinc-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer disabled:opacity-40"
        >
          <Pencil :size="18" />
          <!-- Text label only shows on mobile for clarity, hidden on desktop to save space -->
          <span class="sm:hidden text-xs font-bold">Edit</span>
        </button>

        <ConfirmationDialog
          :on-confirm="handleDelete"
          title="Delete Variant"
          :description="deleteDescription"
          confirm-text="Delete"
          variant="danger"
          :is-loading="isDeleting"
        >
          <button
            type="button"
            :disabled="isDeleting || isRestocking"
            class="w-full sm:w-10 h-10 flex items-center justify-center gap-2 bg-zinc-50 text-zinc-400 hover:text-error hover:bg-error-bg rounded-lg transition-colors cursor-pointer disabled:opacity-40"
          >
            <Trash2 :size="18" />
            <span class="sm:hidden text-xs font-bold">Delete</span>
          </button>
        </ConfirmationDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";import type { AxiosError } from "axios";
import { Pencil, Trash2 } from "lucide-vue-next";

import type { ProductVariant } from "../../types/inventory.types";
import type { UpdateVariantInput } from "../../schemas/inventory.schema";
import SellerEditVariantForm from "./SellerEditVariantForm.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { cn } from "@/shared/lib/utils";

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
const restockAmount = ref("");

const deleteDescription = computed(
  () => `Remove "${props.variant.sku}" completely?`,
);

const onRestockInput = (value: string | undefined) => {
  restockAmount.value = value ?? "";
};

const handleRestockSubmit = () => {
  const amount = parseInt(restockAmount.value, 10);
  if (isNaN(amount) || amount < 1) {
    toast.error("Please insert a valid restock increment of 1 or more units.");
    return;
  }

  toast.promise(props.onRestock(props.variant._id, amount), {
    loading: "Adding stock...",
    success: () => {
      restockAmount.value = "";
      return `Successfully added ${amount} units to ${props.variant.sku}`;
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to add stock.",
  });
};

const handleUpdateSave = (data: UpdateVariantInput) => {
  return toast.promise(props.onUpdate(props.variant._id, data), {
    loading: "Updating variant...",
    success: () => {
      isEditing.value = false;
      return "Variant details saved.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to update variant.",
  });
};

const handleDelete = () => {
  toast.promise(props.onDelete(props.variant._id), {
    loading: "Deleting...",
    success: "Variant deleted.",
    error: "Failed to delete variant.",
  });
};
</script>
