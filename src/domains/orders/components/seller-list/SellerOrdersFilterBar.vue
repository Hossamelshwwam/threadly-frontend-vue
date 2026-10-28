<script lang="ts">
import type { OrderItemStatus } from "../../types/order.types";

export interface SellerOrderFiltersState {
  status: OrderItemStatus | "";
  from: string;
  to: string;
}
</script>

<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg shadow-xs font-sans flex flex-col overflow-hidden"
  >
    <!-- Static Header Ribbon -->
    <div
      class="px-4 py-3.5 flex items-center justify-between bg-zinc-50/40 border-b border-zinc-100"
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
    </div>

    <!-- Reactive Parameters Form Panel Layout -->
    <div class="p-4 space-y-4">
      <!-- Top Layer: Instant Date Range Adjustments -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-xl">
        <CustomInput
          name="fromDate"
          type="date"
          label="From Date"
          :model-value="filters.from"
          @update:model-value="(value) => handleUpdateField({ from: value ?? '' })"
          half
        />

        <CustomInput
          name="toDate"
          type="date"
          label="To Date"
          :model-value="filters.to"
          @update:model-value="(value) => handleUpdateField({ to: value ?? '' })"
          half
        />
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
            @click="handleUpdateField({ status: f.value })"
            :class="
              cn(
                'text-xs font-semibold px-3.5 py-1.5 rounded-md transition-colors whitespace-nowrap cursor-pointer',
                filters.status === f.value
                  ? 'bg-amber-400 text-white shadow-xs'
                  : 'bg-zinc-50 border border-zinc-200 text-zinc-600 hover:bg-zinc-100',
              )
            "
          >
            {{ f.label }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Filter } from "lucide-vue-next";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { cn } from "@/shared/lib/utils";

const STATUS_FILTERS: { label: string; value: OrderItemStatus | "" }[] = [
  { label: "All Items", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const props = defineProps<{
  filters: SellerOrderFiltersState;
}>();

const emit = defineEmits<{
  "filters-change": [filters: SellerOrderFiltersState];
}>();

// Compute parameter state variances to flag active elements
const activeFiltersCount = computed(
  () =>
    [
      props.filters.status !== "",
      props.filters.from !== "",
      props.filters.to !== "",
    ].filter(Boolean).length,
);

const handleUpdateField = (updated: Partial<SellerOrderFiltersState>) => {
  emit("filters-change", {
    ...props.filters,
    ...updated,
  });
};
</script>
