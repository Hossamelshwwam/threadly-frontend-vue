<script lang="ts">
import type { PayoutStatus } from "../types/payout.types";

export interface PayoutFiltersState {
  status: PayoutStatus | "";
  seller: string;
  from: string;
  to: string;
}
</script>

<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden"
  >
    <!-- Header Toggle -->
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
        <span class="text-xs font-bold text-zinc-700 uppercase tracking-wider">
          Filter Payout Requests
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

    <!-- Form Panel -->
    <div
      v-if="isExpanded"
      class="p-4 border-t border-zinc-100 space-y-4 animate-fadeIn"
    >
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <CustomInput
          name="seller"
          type="text"
          label="Search Seller ID / Name"
          placeholder="e.g. 64a7b..."
          :model-value="localFilters.seller"
          @update:model-value="(value) => updateField({ seller: value ?? '' })"
          half
        />
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

      <div
        class="border-t border-zinc-100 pt-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        <span
          class="text-xs font-semibold text-zinc-400 uppercase tracking-wider shrink-0"
        >
          Payout State
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
          Reset
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
          Apply Filters
        </CustomButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, h, ref, watch } from "vue";
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

const STATUS_FILTERS: { label: string; value: PayoutStatus | "" }[] = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Paid", value: "paid" },
  { label: "Rejected", value: "rejected" },
];

const props = defineProps<{
  initialFilters: PayoutFiltersState;
}>();

const emit = defineEmits<{
  apply: [filters: PayoutFiltersState];
  reset: [];
}>();

// Owned by the page so the panel survives this component being re-created
// (the React version keyed the bar, which collapsed it on Apply).
const isExpanded = defineModel<boolean>("expanded", { default: false });
const localFilters = ref<PayoutFiltersState>({ ...props.initialFilters });

// Applying, resetting, or the table's "Clear filters" replaces the applied
// state from outside; keep the draft in sync without remounting the bar.
watch(
  () => props.initialFilters,
  (filters) => {
    localFilters.value = { ...filters };
  },
  { deep: true },
);

const activeFiltersCount = computed(
  () =>
    [
      localFilters.value.status !== "",
      localFilters.value.seller !== "",
      localFilters.value.from !== "",
      localFilters.value.to !== "",
    ].filter(Boolean).length,
);

const updateField = (updated: Partial<PayoutFiltersState>) => {
  localFilters.value = { ...localFilters.value, ...updated };
};

const handleApply = () => emit("apply", localFilters.value);

const handleReset = () => {
  localFilters.value = { status: "", seller: "", from: "", to: "" };
  emit("reset");
};

const FilterOffIcon = () => h(FilterX, { size: 14 });
const CheckIcon = () => h(Check, { size: 14 });
</script>
