<template>
  <div
    v-if="isLoading"
    class="flex flex-col items-center justify-center h-64 gap-3"
  >
    <LoaderCircle :size="30" class="animate-spin text-amber-500 text-3xl" />
    <p class="text-sm font-medium text-zinc-500">
      Retrieving secure transaction ledger...
    </p>
  </div>

  <div v-else-if="isError || !order" class="text-center py-12 space-y-3">
    <p class="text-error font-semibold">Failed to load order details.</p>
    <CustomButton variant="outline" @click="router.back()">
      Go Back
    </CustomButton>
  </div>

  <div
    v-else
    class="space-y-4 sm:space-y-6 font-sans max-w-6xl mx-auto pb-12 min-w-0 w-full"
  >
    <!-- Header Strip -->
    <div
      class="flex flex-col sm:flex-row sm:items-start justify-between gap-4"
    >
      <RouterLink
        to="/admin/orders"
        class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
      >
        <ArrowLeft :size="14" /> Back to Orders
      </RouterLink>
      <div>
        <div class="flex flex-wrap items-center gap-2 sm:gap-3 mb-1">
          <h1
            class="text-lg sm:text-xl font-bold text-zinc-900 leading-none"
          >
            Order {{ order.orderNumber }}
          </h1>
          <OrderStatusBadge :status="order.status" />
          <PaymentStatusBadge :status="order.paymentStatus" />
        </div>
        <p class="text-[10px] sm:text-xs text-zinc-400 mt-1">
          Placed on {{ orderDate }}
        </p>
      </div>
    </div>

    <!-- Main Grid Layout -->
    <!-- 1 col on mobile, 3 cols on desktop -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
      <!-- Left Column: Items -->
      <div class="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
        <AdminOrderItemsTable :items="items" :order="order" />
      </div>

      <!-- Right Column: Summaries & Controls -->
      <div class="space-y-4 sm:space-y-6 min-w-0">
        <AdminOrderStatusManager
          :order-id="order._id"
          :current-status="order.status"
          :current-payment-status="order.paymentStatus"
        />
        <AdminOrderCustomerDetails :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowLeft, LoaderCircle } from "lucide-vue-next";

import { useAdminOrderDetail } from "../hooks/useAdminOrders";
import OrderStatusBadge from "../components/OrderStatusBadge.vue";
import PaymentStatusBadge from "../components/PaymentStatusBadge.vue";
import AdminOrderStatusManager from "../components/admin-detail/AdminOrderStatusManager.vue";
import AdminOrderCustomerDetails from "../components/admin-detail/AdminOrderCustomerDetails.vue";
import AdminOrderItemsTable from "../components/admin-detail/AdminOrderItemsTable.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

const props = defineProps<{
  id: string;
}>();

const router = useRouter();

const {
  data: response,
  isLoading,
  isError,
} = useAdminOrderDetail(() => props.id);

const order = computed(() => response.value?.data?.order);
const items = computed(() => response.value?.data?.items ?? []);

const orderDate = computed(() =>
  order.value
    ? new Date(order.value.createdAt).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "",
);
</script>
