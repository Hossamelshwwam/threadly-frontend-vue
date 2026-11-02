<template>
  <div
    class="bg-white border border-zinc-200 rounded-xl p-4 sm:p-5 space-y-4 shadow-sm font-sans min-w-0"
  >
    <div
      class="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3"
    >
      <h3 class="text-sm font-bold text-zinc-900">
        Global Fulfillment State
      </h3>
      <button
        v-if="!isEditing"
        type="button"
        class="text-[10px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/50 px-2.5 py-1.5 rounded transition-colors flex items-center gap-1 cursor-pointer"
        @click="handleOpenEdit"
      >
        <Pencil :size="12" />
        Manual Override
      </button>
    </div>

    <div v-if="!isEditing" class="space-y-4">
      <div
        class="bg-zinc-50 border border-zinc-100 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2"
      >
        <span
          class="text-xs font-semibold text-zinc-500 uppercase tracking-wider"
        >
          Logistics
        </span>
        <OrderStatusBadge :status="currentStatus" />
      </div>
      <div
        class="bg-zinc-50 border border-zinc-100 rounded-lg p-3 flex flex-wrap items-center justify-between gap-2"
      >
        <span
          class="text-xs font-semibold text-zinc-500 uppercase tracking-wider"
        >
          Payment
        </span>
        <PaymentStatusBadge :status="currentPaymentStatus" />
      </div>
      <p
        class="text-[10px] text-zinc-400 leading-relaxed pt-1 flex items-start gap-1.5"
      >
        <TriangleAlert :size="12" class="shrink-0 mt-0.5 text-zinc-300" />
        These statuses update automatically based on the individual fulfillment
        states of the purchased items.
      </p>
    </div>

    <div v-else class="space-y-4 animate-fadeIn">
      <div
        class="bg-amber-50 border border-amber-200/60 p-3 rounded-lg flex items-start gap-2.5 text-amber-800 text-xs mb-2"
      >
        <TriangleAlert :size="14" class="shrink-0 mt-0.5 text-amber-600" />
        <p class="leading-relaxed">
          <strong>Warning:</strong> You are manually overriding the global
          status. This may break automated item-level tracking syncs.
        </p>
      </div>

      <CustomSelect
        name="status"
        label="Override Logistics Status"
        :model-value="status"
        @update:model-value="handleStatusChange"
        :options="[
          { label: 'Pending', value: 'pending' },
          { label: 'Confirmed', value: 'confirmed' },
          { label: 'Partially Shipped', value: 'partially_shipped' },
          { label: 'Shipped', value: 'shipped' },
          { label: 'Delivered', value: 'delivered' },
          { label: 'Cancelled', value: 'cancelled' },
        ]"
        :disabled="isPending"
      />

      <CustomSelect
        name="paymentStatus"
        label="Override Payment Status"
        :model-value="paymentStatus"
        @update:model-value="handlePaymentStatusChange"
        :options="[
          { label: 'Unpaid', value: 'unpaid' },
          { label: 'Paid', value: 'paid' },
          { label: 'Refunded', value: 'refunded' },
        ]"
        :disabled="isPending"
      />

      <div
        class="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-stretch gap-2"
      >
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="sm"
          class="flex-1 order-2 sm:order-1"
          :disabled="isPending"
          @click="handleCancel"
          :left-icon="CloseIcon"
        >
          Cancel
        </CustomButton>

        <ConfirmationDialog
          title="Confirm Manual Status Override"
          description="You are manually forcing the global status of this order. Are you absolutely sure you want to bypass the automated system?"
          confirm-text="Yes, Force Override"
          cancel-text="Cancel"
          variant="warning"
          :is-loading="isPending"
          :on-confirm="handleSaveOverride"
        >
          <CustomButton
            type="button"
            variant="solid"
            theme="primary"
            size="sm"
            class="w-full sm:flex-1 order-1 sm:order-2"
            :disabled="isPending"
            :left-icon="SaveIcon"
          >
            Save Override
          </CustomButton>
        </ConfirmationDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from "vue";
import { Pencil, Save, TriangleAlert, X } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import { useAdminUpdateOrderStatus } from "../../hooks/useAdminOrders";
import type { OrderStatus, PaymentStatus } from "../../types/order.types";
import OrderStatusBadge from "../OrderStatusBadge.vue";
import PaymentStatusBadge from "../PaymentStatusBadge.vue";

const props = defineProps<{
  orderId: string;
  currentStatus: OrderStatus;
  currentPaymentStatus: PaymentStatus;
}>();

const isEditing = ref(false);
const status = ref<OrderStatus>(props.currentStatus);
const paymentStatus = ref<PaymentStatus>(props.currentPaymentStatus);

const { mutateAsync: updateOrder, isPending } = useAdminUpdateOrderStatus();

const handleOpenEdit = () => {
  status.value = props.currentStatus;
  paymentStatus.value = props.currentPaymentStatus;
  isEditing.value = true;
};

const handleCancel = () => {
  isEditing.value = false;
};

const handleStatusChange = (value: string | undefined) => {
  if (value) status.value = value as OrderStatus;
};

const handlePaymentStatusChange = (value: string | undefined) => {
  if (value) paymentStatus.value = value as PaymentStatus;
};

const handleSaveOverride = () => {
  toast.promise(
    updateOrder({
      id: props.orderId,
      payload: { status: status.value, paymentStatus: paymentStatus.value },
    }),
    {
      loading: "Overriding global order status...",
      success: () => {
        isEditing.value = false;
        return "Global statuses overridden successfully.";
      },
      error: (error: AxiosError<{ message: string }>) =>
        error.response?.data?.message || "Failed to update order.",
    },
  );
};

const CloseIcon = () => h(X, { size: 14 });
const SaveIcon = () => h(Save, { size: 14 });
</script>
