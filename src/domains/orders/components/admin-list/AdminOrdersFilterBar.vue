<script lang="ts">
import type { OrderStatus, PaymentStatus } from "../../types/order.types";

export interface AdminOrderFiltersState {
  status: OrderStatus | "";
  paymentStatus: PaymentStatus | "";
  from: string;
  to: string;
}
</script>

<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden"
  >
    <!-- Clickable Header Toggle Controller Ribbon -->
    <div
      class="px-4 py-3.5 flex items-center justify-between cursor-pointer select-none bg-zinc-50/40 hover:bg-zinc-50 transition-colors"
      @click="isExpanded = !isExpanded"
    >
      <div class="flex items-center gap-2">
        <Filter
          :size="16"
          :class="
            cn(
              'text-zinc-400 transition-colors',
              activeFiltersCount > 0 && 'text-amber-500',
            )
          "
        />
        <span
          class="text-xs font-bold text-zinc-700 uppercase tracking-wider"
        >
          Filter Ledger Operations
        </span>
        <span
          v-if="activeFiltersCount > 0"
          class="ml-1 px-1.5 py-0.5 text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 rounded-md"
        >
          {{ activeFiltersCount }} Active
        </span>
      </div>
      <div class="text-zinc-400">
        <ChevronUp v-if="isExpanded" :size="20" />
        <ChevronDown v-else :size="20" />
      </div>
    </div>

    <!-- Expandable Parameters Form Panel Wrapper -->
    <div
      v-if="isExpanded"
      class="p-4 border-t border-zinc-100 space-y-4 animate-fadeIn"
    >
      <!-- Top Layer: Date Range Selectors -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-xl">
        <CustomInput
          name="fromDate"
          type="date"
          label="From Date"
          :model-value="localFilters.from"
          @update:model-value="(value) => updateField({ from: value ?? '' })"
          half
        />

        <CustomInput
          name="toDate"
          type="date"
          label="To Date"
          :model-value="localFilters.to"
          @update:model-value="(value) => updateField({ to: value ?? '' })"
          half
        />
      </div>

      <!-- Middle Layer: Payment Status Badge Controls -->
      <div
        class="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        <span
          class="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0"
        >
          Payment State
        </span>
        <div
          class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar"
        >
          <button
            v-for="f in PAYMENT_FILTERS"
            :key="f.label"
            type="button"
            @click="updateField({ paymentStatus: f.value })"
            :class="
              cn(
                'text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer',
                localFilters.paymentStatus === f.value
                  ? 'bg-amber-400 text-white shadow-xs'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
              )
            "
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Bottom Layer: Order Status Badge Controls -->
      <div
        class="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        <span
          class="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0"
        >
          Order State
        </span>
        <div
          class="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 w-full lg:justify-end custom-scrollbar"
        >
          <button
            v-for="f in STATUS_FILTERS"
            :key="f.label"
            type="button"
            @click="updateField({ status: f.value })"
            :class="
              cn(
                'text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer',
                localFilters.status === f.value
                  ? 'bg-amber-400 text-white shadow-xs'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
              )
            "
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Action Controls Layer: Apply & Reset -->
      <div
        class="flex justify-end items-center gap-2 border-t border-zinc-100 pt-4 mt-2"
      >
        <CustomButton
          type="button"
          variant="outline"
          theme="neutral"
          size="sm"
          class="h-9 px-4 text-xs font-semibold"
          :left-icon="FilterOffIcon"
          @click="handleReset"
        >
          Reset Filters
        </CustomButton>
        <CustomButton
          type="button"
          variant="solid"
          theme="primary"
          size="sm"
          class="h-9 px-6 text-xs font-semibold"
          :left-icon="CheckIcon"
          @click="handleApply"
        >
          Confirm & Apply
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref } from "vue";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Filter,
  FilterX,
} from "lucide-vue-next";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";
import { cn } from "@/shared/lib/utils";

const STATUS_FILTERS: { label: string; value: OrderStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Partially Shipped", value: "partially_shipped" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const PAYMENT_FILTERS: { label: string; value: PaymentStatus | "" }[] = [
  { label: "All Payments", value: "" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Paid", value: "paid" },
  { label: "Refunded", value: "refunded" },
];

const props = defineProps<{
  initialFilters: AdminOrderFiltersState;
}>();

const emit = defineEmits<{
  apply: [filters: AdminOrderFiltersState];
  reset: [];
}>();

const isExpanded = ref(false);
const localFilters = ref<AdminOrderFiltersState>({ ...props.initialFilters });

// Evaluates if any active configuration parameters deviate from baseline default properties
const activeFiltersCount = computed(
  () =>
    [
      localFilters.value.status !== "",
      localFilters.value.paymentStatus !== "",
      localFilters.value.from !== "",
      localFilters.value.to !== "",
    ].filter(Boolean).length,
);

const updateField = (updated: Partial<AdminOrderFiltersState>) => {
  localFilters.value = { ...localFilters.value, ...updated };
};

const handleApply = () => {
  emit("apply", localFilters.value);
};

const handleReset = () => {
  localFilters.value = { status: "", paymentStatus: "", from: "", to: "" };
  emit("reset");
};

const FilterOffIcon = () => h(FilterX, { size: 14 });
const CheckIcon = () => h(Check, { size: 14 });
</script>
