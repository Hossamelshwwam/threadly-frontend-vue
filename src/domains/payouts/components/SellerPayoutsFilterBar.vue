<script lang="ts">
import type { PayoutStatus } from "../types/payout.types";

export interface SellerPayoutsFilterState {
  status: PayoutStatus | "";
  from: string;
  to: string;
}
</script>

<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans p-4 space-y-4"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <CustomInput
        name="fromDate"
        type="date"
        label="From Date"
        :model-value="filters.from"
        @update:model-value="(value) => update({ from: value ?? '' })"
        half
      />
      <CustomInput
        name="toDate"
        type="date"
        label="To Date"
        :model-value="filters.to"
        @update:model-value="(value) => update({ to: value ?? '' })"
        half
      />
    </div>

    <div
      class="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
    >
      <span
        class="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0"
      >
        Payout Status
      </span>
      <div
        class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar"
      >
        <button
          v-for="opt in STATUS_OPTIONS"
          :key="opt.label"
          type="button"
          @click="update({ status: opt.value })"
          :class="
            cn(
              'text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer',
              filters.status === opt.value
                ? 'bg-amber-400 text-white shadow-xs'
                : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
            )
          "
        >
          {{ opt.label }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { cn } from "@/shared/lib/utils";

const STATUS_OPTIONS: { label: string; value: PayoutStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

const props = defineProps<{
  filters: SellerPayoutsFilterState;
}>();

const emit = defineEmits<{
  filterChange: [filters: SellerPayoutsFilterState];
}>();

// Every field change applies immediately (no draft/Apply step, unlike the
// admin bar), so each handler emits the full next state.
const update = (patch: Partial<SellerPayoutsFilterState>) => {
  emit("filterChange", { ...props.filters, ...patch });
};
</script>
