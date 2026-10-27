<template>
  <div
    class="bg-white border border-zinc-100 rounded-2xl p-6 md:p-8 space-y-6 shadow-sm"
  >
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div class="flex items-center gap-3">
        <div class="p-2 bg-main-subtle rounded-lg">
          <Boxes :size="20" class="text-main text-xl" />
        </div>
        <div>
          <h2 class="text-lg font-bold text-zinc-900 tracking-tight">
            Inventory &amp; Variants
          </h2>
          <p class="text-xs text-zinc-500">
            Manage sizes, colors, and stock levels.
          </p>
        </div>
      </div>

      <CustomButton
        v-if="!showAddForm"
        variant="outline"
        theme="neutral"
        size="sm"
        :left-icon="PlusIcon"
        @click="showAddForm = true"
        class="rounded-xl font-semibold"
      >
        Add Variant
      </CustomButton>
    </div>

    <div
      v-if="showAddForm"
      class="bg-zinc-50 p-4 rounded-xl border border-zinc-200"
    >
      <SellerAddVariantForm
        :product-id="productId"
        @cancel="showAddForm = false"
      />
    </div>

    <div v-if="isLoading" class="flex justify-center py-8">
      <LoaderCircle :size="24" class="animate-spin text-zinc-400" />
    </div>
    <div
      v-else-if="variants.length === 0"
      class="text-center py-12 bg-zinc-50 rounded-xl border border-dashed border-zinc-200"
    >
      <p class="text-sm font-medium text-zinc-500">
        No inventory variants added yet.
      </p>
    </div>
    <div v-else class="space-y-3">
      <div
        v-for="v in variants"
        :key="v._id"
        class="bg-white border border-zinc-100 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
      >
        <SellerVariantRowItem
          :variant="v"
          :is-restocking="isRestocking"
          :is-deleting="isDeleting"
          :is-updating="isUpdating"
          :on-restock="
            (id, qty) =>
              restockVariantAsync({ variantId: id, payload: { quantity: qty } })
          "
          :on-delete="(id) => deleteVariantAsync(id)"
          :on-update="(id, payload) => updateVariantAsync({ variantId: id, payload })"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import { Boxes, LoaderCircle, Plus } from "lucide-vue-next";

import {
  useProductVariants,
  useRestockVariant,
  useDeleteVariant,
  useUpdateVariant,
} from "../../hooks/useProductInventory";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import SellerAddVariantForm from "./SellerAddVariantForm.vue";
import SellerVariantRowItem from "./SellerVariantRowItem.vue";

const props = defineProps<{
  productId: string;
}>();

const showAddForm = ref(false);
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

const PlusIcon = () => h(Plus, { size: 14 });
</script>
