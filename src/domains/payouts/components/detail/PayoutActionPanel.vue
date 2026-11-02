<template>
  <div
    class="bg-white border border-zinc-200 rounded-xl p-5 space-y-4 shadow-xs font-sans"
  >
    <h3
      class="text-sm font-bold text-zinc-900 border-b border-zinc-100 pb-2"
    >
      Settlement Processing
    </h3>

    <div
      v-if="isFinalized && !hasChanged"
      class="bg-zinc-50 border border-zinc-200 p-4 rounded-lg flex flex-col gap-2"
    >
      <div
        class="flex items-center gap-2 text-zinc-500 font-semibold text-sm"
      >
        <Lock :size="14" /> This payout has been finalized.
      </div>
      <div
        v-if="payout.adminNote"
        class="mt-2 text-xs text-zinc-600 bg-white p-3 rounded border border-zinc-100"
      >
        <strong>Admin Note:</strong> {{ payout.adminNote }}
      </div>
    </div>

    <div v-else class="space-y-4 animate-fadeIn">
      <CustomSelect
        name="payoutStatus"
        label="Action State"
        :model-value="status"
        @update:model-value="handleStatusChange"
        :options="[
          { label: 'Pending', value: 'pending' },
          {
            label: 'Processing (Bank Transfer Initiated)',
            value: 'processing',
          },
          { label: 'Paid (Settled)', value: 'paid' },
          { label: 'Rejected', value: 'rejected' },
        ]"
        :disabled="isPending"
      />

      <CustomTextarea
        v-model="note"
        name="adminNote"
        label="Internal Admin Note (Optional)"
        placeholder="Add transaction IDs, rejection reasons, or bank reference numbers here..."
        :disabled="isPending"
        :rows="3"
      />

      <div
        v-if="hasChanged"
        class="pt-3 border-t border-zinc-100 flex justify-end"
      >
        <ConfirmationDialog
          title="Confirm Financial Update"
          :description="confirmDescription"
          confirm-text="Confirm Status Update"
          :variant="status === 'rejected' ? 'danger' : 'default'"
          :is-loading="isPending"
          :on-confirm="handleSave"
        >
          <CustomButton
            type="button"
            variant="solid"
            theme="primary"
            size="sm"
            :disabled="isPending"
            :left-icon="SaveIcon"
          >
            {{ isPending ? "Saving..." : "Save Processing Update" }}
          </CustomButton>
        </ConfirmationDialog>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from "vue";
import { Lock, Save } from "lucide-vue-next";
import { toast } from "vue-sonner";
import type { AxiosError } from "axios";

import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import CustomTextarea from "@/shared/components/custom-textarea/CustomTextarea.vue";
import ConfirmationDialog from "@/shared/components/confirmation-dialog/ConfirmationDialog.vue";
import { useAdminUpdatePayout } from "../../hooks/useAdminPayouts";
import type { Payout, PayoutStatus } from "../../types/payout.types";

const props = defineProps<{
  payout: Payout;
}>();

const status = ref<PayoutStatus>(props.payout.status);
const note = ref(props.payout.adminNote || "");

const { mutateAsync: updatePayout, isPending } = useAdminUpdatePayout();

// If the payout is already finalized, we shouldn't allow changing it easily.
const isFinalized = computed(
  () => props.payout.status === "paid" || props.payout.status === "rejected",
);
const hasChanged = computed(
  () =>
    status.value !== props.payout.status ||
    note.value !== (props.payout.adminNote || ""),
);

const confirmDescription = computed(
  () =>
    `Are you sure you want to mark this payout as "${status.value}"? This action will update the seller's ledger.`,
);

// Reset the draft when a different payout is opened in place.
watch(
  () => props.payout._id,
  () => {
    status.value = props.payout.status;
    note.value = props.payout.adminNote || "";
  },
);

const handleStatusChange = (value: string | undefined) => {
  if (value) status.value = value as PayoutStatus;
};

const handleSave = () => {
  toast.promise(
    updatePayout({
      id: props.payout._id,
      payload: { status: status.value, adminNote: note.value.trim() || undefined },
    }),
    {
      loading: "Updating payout status...",
      success: "Settlement record updated successfully.",
      error: (error: AxiosError<{ message: string }>) =>
        error.response?.data?.message || "Failed to update payout.",
    },
  );
};

const SaveIcon = () => h(Save, { size: 14 });
</script>
