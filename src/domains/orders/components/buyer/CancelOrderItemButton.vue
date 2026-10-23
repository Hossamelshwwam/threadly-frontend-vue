<template>
  <ConfirmationDialog
    title="Cancel Order Item"
    :description="description"
    confirm-text="Yes, Cancel Item"
    cancel-text="No, Keep It"
    :is-loading="isPending"
    loading-text="Cancelling..."
    :on-confirm="handleCancel"
  >
    <CustomButton
      type="button"
      variant="outline"
      theme="danger"
      size="sm"
      :left-icon="CircleX"
      class="font-bold text-xs"
    >
      Cancel Item
    </CustomButton>
  </ConfirmationDialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";
import { CircleX } from "lucide-vue-next";

import { useCancelOrderItem } from "../../hooks/useMyOrders";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";

const props = defineProps<{
  orderId: string;
  itemId: string;
  itemName: string;
}>();

const { mutateAsync: cancelItem, isPending } = useCancelOrderItem(
  props.orderId,
);

const description = computed(
  () =>
    `Are you sure you want to cancel "${props.itemName}"? This action cannot be undone, and the stock will be released.`,
);

const handleCancel = async () => {
  toast.promise(cancelItem(props.itemId), {
    loading: "Processing cancellation...",
    success: () => {
      return "Item successfully cancelled and refunded.";
    },
    error: (err: AxiosError<{ message: string }>) =>
      err.response?.data?.message || "Failed to cancel item.",
  });
};
</script>

<style scoped></style>
