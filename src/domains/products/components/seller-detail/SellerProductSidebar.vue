<template>
  <div class="space-y-6 font-sans sticky top-6">
    <!-- Price & Status Card -->
    <div
      class="bg-zinc-900 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden"
    >
      <Tag
        :size="96"
        class="absolute -bottom-4 -right-4 text-8xl text-white/5 rotate-12"
      />

      <p
        class="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1"
      >
        Base Price
      </p>
      <h2 class="text-4xl font-extrabold tracking-tight mb-4">
        <span class="text-xl text-zinc-400 mr-1">EGP</span>
        {{ product.basePrice.toLocaleString() }}
      </h2>

      <div
        class="flex items-center justify-between border-t border-white/10 pt-4 mt-2"
      >
        <span class="text-sm text-zinc-300">Visibility</span>
        <ProductStatusBadge :status="product.status" />
      </div>
    </div>

    <!-- Details Card -->
    <div
      class="bg-white border border-zinc-100 rounded-2xl p-6 space-y-4 shadow-sm"
    >
      <h3
        class="text-sm font-bold text-zinc-800 border-b border-zinc-100 pb-2"
      >
        Listing Details
      </h3>

      <div class="space-y-3">
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-zinc-400">Category</span>
          <span class="text-sm font-semibold text-zinc-800">
            {{ categoryName }}
          </span>
        </div>
        <div class="flex flex-col gap-1">
          <span class="text-xs font-medium text-zinc-400">
            Created On
          </span>
          <span class="text-sm font-semibold text-zinc-800">
            {{ createdOn }}
          </span>
        </div>
      </div>
    </div>

    <!-- Seller Action: Archive -->
    <div
      v-if="product.status !== 'archived'"
      class="bg-error-bg/50 border border-error/20 rounded-2xl p-6 space-y-3"
    >
      <h3 class="text-sm font-bold text-error">Danger Zone</h3>
      <p class="text-xs text-error/80 leading-relaxed mb-3">
        Archiving this product will hide it from your storefront immediately.
        You cannot un-archive it yourself.
      </p>

      <ConfirmationDialog
        variant="danger"
        title="Archive Product Listing"
        :description="archiveDescription"
        confirm-text="Yes, Archive"
        :is-loading="isArchiving"
        :on-confirm="handleArchive"
      >
        <CustomButton
          variant="outline"
          theme="danger"
          full-width
          :left-icon="EyeOffIcon"
          class="bg-white hover:bg-error hover:text-white transition-all rounded-xl border-error/30"
        >
          Archive Product
        </CustomButton>
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { toast } from "vue-sonner";
import { EyeOff, Tag } from "lucide-vue-next";
import type { Product } from "../../types/product.types";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import ProductStatusBadge from "../ProductStatusBadge.vue";

const props = defineProps<{
  product: Product;
  isArchiving: boolean;
  onArchive: (id: string) => Promise<unknown>;
}>();

const EyeOffIcon = () => h(EyeOff, { size: 14 });

const categoryName = computed(() =>
  typeof props.product.categoryId === "object"
    ? props.product.categoryId.name
    : "Unassigned",
);

const createdOn = computed(() =>
  new Date(props.product.createdAt).toLocaleDateString("en-EG", {
    dateStyle: "long",
  }),
);

const archiveDescription = computed(
  () =>
    `Are you sure you want to archive "${props.product.name}"? Buyers will no longer be able to see or purchase it.`,
);

const handleArchive = () => {
  toast.promise(props.onArchive(props.product._id), {
    loading: "Archiving product...",
    success:
      "Product successfully archived. It is no longer visible to buyers.",
    error: "Failed to archive product.",
  });
};
</script>
