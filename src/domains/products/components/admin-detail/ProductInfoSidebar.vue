<template>
  <div class="space-y-4 font-sans">
    <!-- Primary Context Card -->
    <div class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 shadow-xs">
      <div class="flex items-center gap-2 border-b border-zinc-100 pb-2">
        <Box :size="16" class="text-amber-500 text-base" />
        <h2 class="text-sm font-bold text-zinc-800">Lifecycle & Scope</h2>
      </div>

      <div class="space-y-3">
        <div
          v-for="row in rows"
          :key="row.label"
          class="flex items-center justify-between py-2 border-b border-zinc-50 last:border-0"
        >
          <span
            class="text-xs font-semibold text-zinc-400 uppercase tracking-wider"
          >
            {{ row.label }}
          </span>
          <span :class="cn('text-sm font-medium text-zinc-700', row.className)">
            <ProductStatusBadge v-if="row.badge" :status="product.status" />
            <template v-else>{{ row.value }}</template>
          </span>
        </div>
      </div>
    </div>

    <!-- Moderation Controls Card -->
    <div
      v-if="product.status !== 'archived'"
      class="bg-white border border-zinc-200 rounded-lg p-5 space-y-3 shadow-xs"
    >
      <p class="text-sm font-bold text-zinc-700">
        Administrative Safeguards
      </p>
      <ConfirmationDialog
        variant="danger"
        title="Force Archive Product Listing"
        :description="archiveDescription"
        confirm-text="Force Archive"
        require-checkbox
        checkbox-label="I authorize archiving this inventory unit globally"
        :is-loading="isArchiving"
        :on-confirm="handleArchive"
      >
        <CustomButton
          variant="soft"
          theme="danger"
          full-width
          :left-icon="ArchiveIcon"
        >
          Force Archive Listing
        </CustomButton>
      </ConfirmationDialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Archive, Box } from "lucide-vue-next";

import type { Product } from "../../types/product.types";
import ProductStatusBadge from "../ProductStatusBadge.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import { cn } from "@/shared/lib/utils";

const props = defineProps<{
  product: Product;
  isArchiving: boolean;
  onForceArchive: (id: string) => Promise<unknown>;
}>();

interface InfoRow {
  label: string;
  value?: string;
  className?: string;
  badge?: boolean;
}

const rows = computed<InfoRow[]>(() => {
  const categoryName =
    typeof props.product.categoryId === "object"
      ? props.product.categoryId.name
      : "Unassigned";

  const storeName =
    props.product.sellerId && typeof props.product.sellerId === "object"
      ? props.product.sellerId.storeName
      : "Platform Direct";

  return [
    {
      label: "Base Price",
      value: `EGP ${props.product.basePrice.toLocaleString()}`,
      className: "font-bold text-zinc-900",
    },
    {
      label: "Publish Status",
      badge: true,
    },
    { label: "Category", value: categoryName },
    { label: "Seller Channel", value: storeName },
    {
      label: "Created At",
      value: new Date(props.product.createdAt).toLocaleDateString("en-EG", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
    },
  ];
});

const archiveDescription = computed(
  () =>
    `Are you sure you want to globally archive "${props.product.name}"? It will instantly become invisible across all storefronts.`,
);

const ArchiveIcon = () => h(Archive, { size: 14 });

const handleArchive = () => {
  toast.promise(props.onForceArchive(props.product._id), {
    loading: "Archiving product globally...",
    success: "Product forcefully archived",
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to archive product",
  });
};
</script>
