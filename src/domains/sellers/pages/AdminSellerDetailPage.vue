<template>
  <div v-if="isLoading" class="space-y-6">
    <div class="h-5 w-32 rounded bg-zinc-100 animate-pulse" />
    <div class="lg:grid-cols-3 grid gap-6">
      <div class="col-span-1 space-y-4">
        <div
          class="bg-white border border-zinc-200 rounded-lg h-100 animate-pulse"
        />
        <div
          class="bg-white border border-zinc-200 rounded-lg h-50 animate-pulse"
        />
      </div>
      <div class="col-span-2 space-y-4">
        <div
          class="bg-white border border-zinc-200 rounded-lg h-37.5 animate-pulse"
        />
        <div
          class="bg-white border border-zinc-200 rounded-lg h-75 animate-pulse"
        />
      </div>
    </div>
  </div>

  <div
    v-else-if="!seller"
    class="flex flex-col items-center justify-center py-24 text-center font-sans"
  >
    <p class="text-zinc-500 font-semibold text-lg">
      Seller profile data not found
    </p>
    <RouterLink to="/admin/sellers" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Sellers
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans">
    <!-- Return Anchor Navigation Node -->
    <RouterLink
      to="/admin/sellers"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ArrowLeft :size="14" />
      Back to Sellers
    </RouterLink>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Informational Sidebar Column -->
      <div class="col-span-1">
        <SellerProfileSidebar
          :seller="seller"
          :is-updating="isUpdating"
          @update-status="updateStatusHandler"
        />
      </div>

      <!-- Right Tabular Ledger Details Block Matrix Column -->
      <div class="col-span-1 lg:col-span-2 flex flex-col gap-6">
        <SellerBankDetails :seller="seller" />

        <!-- Seller Inventory (latest 10, full list via the products page) -->
        <CustomTable
          title="Listed Inventory Overview"
          :href="`/admin/products?sellerId=${seller._id}`"
          :columns="columns"
          :data="products"
          :is-loading="productsLoading"
          :limit="10"
          empty-state-title="No public products assigned"
          empty-state-description="Product catalog management structures will display here"
        >
          <template #emptyIcon>
            <Box :size="48" class="text-5xl text-zinc-300 mx-auto" />
          </template>
        </CustomTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import { ArrowLeft, Box } from "lucide-vue-next";

import { useAdminSeller } from "../hooks/useAdminSellers";
import { useUpdateSellerStatus } from "../hooks/useUpdateSellerStatus";
import SellerProfileSidebar from "../components/detail/SellerProfileSidebar.vue";
import SellerBankDetails from "../components/detail/SellerBankDetails.vue";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomTable from "@/shared/components/custom-table/CustomTable.vue";
import { useAdminProducts } from "@/domains/products/hooks/useAdminProducts";
import useAdminProductsColumns from "@/domains/products/hooks/columns/useAdminProductsColumns";
import type { ProductsParams } from "@/domains/products/types/product.types";

const props = defineProps<{
  id: string;
}>();

const { data, isLoading } = useAdminSeller(() => props.id);
const { mutateAsync: updateStatus, isPending: isUpdating } =
  useUpdateSellerStatus();

const seller = computed(() => data.value?.data);

// Latest 10 listings for this store; the "View all" link opens the
// platform products page filtered by seller id.
const { columns } = useAdminProductsColumns();

const productsParams = computed<ProductsParams>(() => ({
  seller: props.id,
  page: 1,
  limit: 10,
}));

const { data: productsData, isLoading: productsLoading } =
  useAdminProducts(productsParams);

const products = computed(() => productsData.value?.data ?? []);

const updateStatusHandler = (data: {
  status: "approved" | "suspended";
  adminNote?: string;
}) => {
  toast.promise(
    updateStatus({
      id: props.id,
      status: data.status,
      adminNote: data.adminNote || undefined,
    }),
    {
      loading: "Updating status...",
      success: "Status updated successfully",
      error: "Failed to update status",
    },
  );
};
</script>
