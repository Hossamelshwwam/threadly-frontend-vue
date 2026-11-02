<template>
  <div
    class="mt-4 pt-4 border-t border-amber-200/40 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-fadeIn bg-white rounded-xl"
  >
    <!-- Item Logistics Status Controls -->
    <div class="space-y-2 flex flex-col justify-center">
      <label
        class="text-[10px] sm:text-xs font-bold text-zinc-700 uppercase tracking-wider block"
      >
        Item Logistics Status
      </label>

      <div class="flex flex-col sm:flex-row sm:items-center gap-3">
        <!-- 1. Display Current Status securely -->
        <div
          class="flex items-center gap-2 sm:pr-3 sm:border-r border-zinc-200 shrink-0"
        >
          <span class="text-[10px] sm:text-xs font-semibold text-zinc-400">
            Current:
          </span>
          <OrderItemStatusBadge :status="item.status" />
        </div>

        <!-- 2. Display Transition Buttons -->
        <div class="flex flex-wrap items-center gap-2">
          <template v-if="availableTransitions.length > 0">
            <CustomButton
              v-for="status in availableTransitions"
              :key="status"
              type="button"
              size="sm"
              :variant="draftStatus === status ? 'solid' : 'outline'"
              :theme="draftStatus === status ? 'primary' : 'neutral'"
              @click="toggleStatus(status)"
              :disabled="isPending"
              class="capitalize text-[11px] sm:text-xs px-3 py-1.5 sm:h-7"
            >
              {{ formatStatus(status) }}
            </CustomButton>
          </template>
          <span
            v-else
            class="text-xs text-zinc-400 italic bg-zinc-50 px-2 py-1 rounded-md"
          >
            Finalized (No further transitions)
          </span>
        </div>
      </div>
    </div>

    <CustomInput
      :name="`trackingNumber-${item._id}`"
      type="text"
      label="Tracking / Waybill Number"
      placeholder="e.g. ARAMEX-123456"
      v-model="draftTracking"
      :disabled="isPending"
    />

    <!-- Right-aligned action row -->
    <div
      class="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-2 mt-2 sm:mt-1 pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100"
    >
      <CustomButton
        type="button"
        variant="outline"
        theme="neutral"
        size="sm"
        @click="emit('cancel')"
        :disabled="isPending"
        :left-icon="CloseIcon"
        class="w-full sm:w-auto"
      >
        Cancel
      </CustomButton>
      <CustomButton
        type="button"
        variant="solid"
        theme="primary"
        size="sm"
        @click="handleSaveItem"
        :disabled="isPending"
        :left-icon="CheckIcon"
        class="w-full sm:w-auto"
      >
        {{ isPending ? "Saving..." : "Save Item Updates" }}
      </CustomButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import { Check, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { useAdminUpdateOrderItem } from "../../hooks/useAdminOrders";
import type { OrderItem, OrderItemStatus } from "../../types/order.types";
import OrderItemStatusBadge from "../OrderItemStatusBadge.vue";

const STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["delivered"],
};

const props = defineProps<{
  orderId: string;
  item: OrderItem;
}>();

const emit = defineEmits<{
  cancel: [];
}>();

const { mutateAsync: updateOrderItem, isPending } =
  useAdminUpdateOrderItem(props.orderId);

const draftStatus = ref<OrderItemStatus>(props.item.status);
const draftTracking = ref(props.item.trackingNumber || "");

const availableTransitions = computed(
  () => [...(STATUS_TRANSITIONS[props.item.status] || [])] as OrderItemStatus[],
);

const formatStatus = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");

const toggleStatus = (status: OrderItemStatus) => {
  draftStatus.value = draftStatus.value === status ? props.item.status : status;
};

const handleSaveItem = () => {
  toast.promise(
    updateOrderItem({
      itemId: props.item._id,
      payload: {
        status: draftStatus.value,
        trackingNumber: draftTracking.value.trim() || undefined,
      },
    }),
    {
      loading: "Updating item fulfillment...",
      success: () => {
        emit("cancel");
        return "Item status and tracking updated successfully.";
      },
      error: (error: AxiosError<{ message: string }>) =>
        error.response?.data?.message || "Failed to update item.",
    },
  );
};

const CloseIcon = () => h(X, { size: 14 });
const CheckIcon = () => h(Check, { size: 14 });
</script>
