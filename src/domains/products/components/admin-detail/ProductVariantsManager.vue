<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs font-sans"
  >
    <!-- Header Matrix Configuration Strip -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 pb-3"
    >
      <div class="flex items-center gap-2">
        <ListChecks :size="18" class="text-amber-500 text-lg" />
        <div>
          <h2 class="text-sm font-bold text-zinc-900">
            SKU Stock Allocation Matrix
          </h2>
          <p class="text-xs text-on-surface-muted mt-0.5">
            Manage individual dimension tags, unique SKU rules, and physical
            counter logs.
          </p>
        </div>
      </div>

      <CustomButton
        v-if="!showAddForm"
        variant="outline"
        theme="neutral"
        size="sm"
        :left-icon="AddIcon"
        @click="showAddForm = true"
      >
        Add SKU Variant
      </CustomButton>
    </div>

    <!-- Accordion Setup Add Form Block -->
    <AddVariantForm
      v-if="showAddForm"
      :product-id="productId"
      @cancel="showAddForm = false"
    />

    <!-- Dynamic Content Streams Placement Deck -->
    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2"
    >
      <LoaderCircle :size="24" class="animate-spin text-amber-500" />
      <p class="text-xs font-semibold">
        Scanning variant matrices lines...
      </p>
    </div>

    <div
      v-else-if="variants.length === 0"
      class="text-center py-10 border border-dashed border-zinc-200 bg-zinc-50/40 rounded-lg"
    >
      <p class="text-sm font-medium text-zinc-400 italic">
        No distinct dimensions or variant mappings registered for this listing
        item yet.
      </p>
    </div>

    <!-- Rendered Ledger List Rows Group Element Block Container Loop -->
    <div v-else class="grid grid-cols-1 gap-4">
      <VariantRowItem
        v-for="v in variants"
        :key="v._id"
        :variant="v"
        :is-restocking="isRestocking"
        :is-deleting="isDeleting"
        :is-updating="isUpdating"
        :on-restock="handleRestockExecution"
        :on-delete="handleDeleteExecution"
        :on-update="handleUpdateExecution"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import { ListChecks, LoaderCircle, Plus } from "lucide-vue-next";

import {
  useProductVariants,
  useRestockVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "../../hooks/useProductInventory";
import type { UpdateVariantInput } from "../../schemas/inventory.schema";
import VariantRowItem from "./VariantRowItem.vue";
import AddVariantForm from "./AddVariantForm.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  productId: string;
}>();

const showAddForm = ref(false);

// Connect active TanStack query hooks streams cleanly
const { data: variantsResponse, isLoading } = useProductVariants(
  () => props.productId,
);

const { mutateAsync: restockVariantAsync, isPending: isRestocking } =
  useRestockVariant(() => props.productId);
const { mutateAsync: deleteVariantAsync, isPending: isDeleting } =
  useDeleteVariant(() => props.productId);
const { mutateAsync: updateVariantAsync, isPending: isUpdating } =
  useUpdateVariant(() => props.productId);

const variants = computed(() => variantsResponse.value?.data ?? []);

const AddIcon = () => h(Plus, { size: 14 });

const handleRestockExecution = (variantId: string, quantity: number) => {
  return restockVariantAsync({ variantId, payload: { quantity } });
};

const handleDeleteExecution = (variantId: string) => {
  return deleteVariantAsync(variantId);
};

const handleUpdateExecution = (
  variantId: string,
  payload: UpdateVariantInput,
) => {
  return updateVariantAsync({ variantId, payload });
};
</script>
