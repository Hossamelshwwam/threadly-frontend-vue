<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center py-32 font-sans gap-3"
  >
    <LoaderCircle :size="30" class="text-3xl text-amber-500 animate-spin" />
    <p class="text-sm font-semibold text-zinc-500">Loading order details...</p>
  </div>

  <div
    v-else-if="!item"
    class="flex flex-col items-center justify-center py-24 text-center font-sans bg-white border border-zinc-200 rounded-lg"
  >
    <p class="text-zinc-500 font-bold text-lg">Order item not found</p>
    <RouterLink to="/seller/orders" class="mt-4">
      <CustomButton variant="outline" theme="neutral" size="sm">
        Back to Orders
      </CustomButton>
    </RouterLink>
  </div>

  <div v-else class="space-y-6 font-sans max-w-7xl mx-auto pb-12">
    <!-- Navigation Breadcrumb -->
    <div class="flex items-center justify-between">
      <RouterLink
        to="/seller/orders"
        class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <ArrowLeft :size="14" /> Back to My Orders
      </RouterLink>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
      <!-- LEFT COLUMN: Item Information Manifest -->
      <div class="lg:col-span-3 space-y-4">
        <SellerOrderItemDetails :item="item" :product="product" />
      </div>

      <!-- RIGHT COLUMN: Actions and Context Summary -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Logistics Status Update Panel -->
        <SellerOrderStatusManager :item="item" />

        <!-- Delivery coordinates address panel -->
        <SellerOrderCustomerDetails
          v-if="parentOrder?.shippingAddress"
          :address="parentOrder.shippingAddress"
          :buyer="parentOrder.buyerId"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft, LoaderCircle } from "lucide-vue-next";

import { useSellerOrderItem } from "../hooks/useSellerOrders";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import SellerOrderStatusManager from "../components/seller-detail/SellerOrderStatusManager.vue";
import SellerOrderCustomerDetails from "../components/seller-detail/SellerOrderCustomerDetails.vue";
import SellerOrderItemDetails from "../components/seller-detail/SellerOrderItemDetails.vue";
import type { Order } from "../types/order.types";

const props = defineProps<{
  id: string;
}>();

const { data: itemResponse, isLoading } = useSellerOrderItem(() => props.id);
const item = computed(() => itemResponse.value?.data);

const product = computed(() => item.value?.productId);
const parentOrder = computed(
  () => item.value?.orderId as unknown as Order | undefined,
); // Safe evaluation for population maps
</script>
