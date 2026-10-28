<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 font-sans shadow-xs"
  >
    <div class="flex items-center gap-2 pb-2 border-b border-zinc-100">
      <Ship :size="18" class="text-amber-500 text-lg" />
      <h2 class="text-sm font-bold text-zinc-900">
        Logistics Fulfillment Action
      </h2>
    </div>

    <!-- 1. Display Current Status & Dynamic Transition Buttons -->
    <div class="flex flex-col gap-3.5">
      <div
        class="flex flex-col sm:flex-row sm:items-center gap-3 bg-zinc-50/50 p-3 rounded-xl border border-zinc-100"
      >
        <div
          class="flex items-center gap-2 pr-3 sm:border-r border-zinc-200 shrink-0"
        >
          <span
            class="text-xs font-bold text-zinc-400 uppercase tracking-wider"
          >
            Current:
          </span>
          <OrderItemStatusBadge :status="item.status" />
        </div>

        <div class="flex items-center gap-2">
          <template v-if="availableTransitions.length > 0">
            <CustomButton
              v-for="status in availableTransitions"
              :key="status"
              type="button"
              size="sm"
              variant="outline"
              :theme="status === 'cancelled' ? 'danger' : 'neutral'"
              @click="handleTransitionClick(status)"
              :disabled="isPending"
              class="capitalize text-xs h-8 px-3 rounded-lg hover:bg-zinc-100 font-semibold"
            >
              {{ formatStatus(status) }}
            </CustomButton>
          </template>
          <span v-else class="text-xs text-zinc-400 font-semibold italic">
            Finalized (No further transitions)
          </span>
        </div>
      </div>

      <!-- 2. Interactive Tracking Section (Shows if item is in transit or if user is adding it) -->
      <SellerOrderItemTracking
        v-model:is-editing-tracking="isEditingTracking"
        v-model:tracking-number="trackingNumber"
        :is-pending="isPending"
        :item="item"
        @save="handleSaveTrackingOnly"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { Ship } from "lucide-vue-next";

import type {
  OrderItem,
  OrderItemStatus,
  UpdateOrderItemPayload,
} from "../../types/order.types";
import { useUpdateSellerOrderStatus } from "../../hooks/useSellerOrders";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import OrderItemStatusBadge from "../OrderItemStatusBadge.vue";
import SellerOrderItemTracking from "./SellerOrderItemTracking.vue";

// Your exact transition mapping matrix
const STATUS_TRANSITIONS: Record<OrderItemStatus, OrderItemStatus[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
  delivered: [],
  cancelled: [],
};

const props = defineProps<{
  item: OrderItem;
}>();

const { mutateAsync: updateStatusAsync, isPending } = useUpdateSellerOrderStatus(
  () => props.item._id,
);

// Local tracking input state if seller chooses to type a carrier number before moving to shipped
const trackingNumber = ref(props.item.trackingNumber || "");
const isEditingTracking = ref(false);

const availableTransitions = computed(
  () => STATUS_TRANSITIONS[props.item.status] || [],
);

const handleTransitionClick = (targetStatus: OrderItemStatus) => {
  // If the seller clicks 'shipped' but hasn't filled a tracking code, let's open the input view first
  if (targetStatus === "shipped" && !trackingNumber.value.trim()) {
    isEditingTracking.value = true;
    toast.info(
      "Please supply a courier tracking number to mark this item as shipped.",
    );
    return;
  }

  const payload: UpdateOrderItemPayload = {
    status: targetStatus,
    trackingNumber: trackingNumber.value.trim() || undefined,
  };

  toast.promise(updateStatusAsync(payload), {
    loading: `Moving item status to ${targetStatus}...`,
    success: () => {
      isEditingTracking.value = false;
      return `Item successfully updated to ${targetStatus}.`;
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to update fulfillment state.",
  });
};

const handleSaveTrackingOnly = () => {
  const payload: UpdateOrderItemPayload = {
    status: props.item.status,
    trackingNumber: trackingNumber.value.trim() || undefined,
  };

  toast.promise(updateStatusAsync(payload), {
    loading: "Saving tracking details...",
    success: () => {
      isEditingTracking.value = false;
      return "Tracking number linked successfully.";
    },
    error: (error: AxiosError<{ message: string }>) =>
      error.response?.data?.message || "Failed to update tracking details.",
  });
};

const formatStatus = (status: string) => {
  return status.replace("_", " ");
};
</script>
