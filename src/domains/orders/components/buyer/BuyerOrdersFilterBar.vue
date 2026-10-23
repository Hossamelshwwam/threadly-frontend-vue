<template>
  <div
    class="bg-white border border-zinc-200 rounded-2xl p-5 shadow-sm mb-6 gap-4 animate-fadeIn grid grid-cols-1 lg:grid-cols-2"
  >
    <CustomSelect
      name="status"
      label="Order Status"
      :options="statusOptions"
      :model-value="filters.status || ''"
      half
      @update:model-value="(value: string | undefined) => handleChange('status', value ?? '')"
    />

    <CustomSelect
      name="paymentStatus"
      label="Payment Status"
      :options="paymentStatusOptions"
      half
      :model-value="filters.paymentStatus || ''"
      @update:model-value="
        (value: string | undefined) => handleChange('paymentStatus', value ?? '')
      "
    />

    <CustomInput
      name="from"
      type="date"
      label="From Date"
      :model-value="filters.from || ''"
      half
      @update:model-value="(value: string | undefined) => handleChange('from', value ?? '')"
    />

    <CustomInput
      name="to"
      type="date"
      label="To Date"
      :model-value="filters.to || ''"
      half
      @update:model-value="(value: string | undefined) => handleChange('to', value ?? '')"
    />
  </div>
</template>

<script setup lang="ts">
import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import CustomSelect from "@/shared/components/custom-select/CustomSelect.vue";
import type { OrdersParams } from "../../types/order.types";

type Filters = Omit<OrdersParams, "page" | "limit">;

const props = defineProps<{
  filters: Filters;
}>();

const emit = defineEmits<{
  (e: "filtersChange", newFilters: Filters): void;
}>();

const statusOptions = [
  { label: "All Statuses", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipped", value: "shipped" },
  { label: "Delivered", value: "delivered" },
  { label: "Cancelled", value: "cancelled" },
];

const paymentStatusOptions = [
  { label: "All Payments", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" },
  { label: "Failed", value: "failed" },
  { label: "Refunded", value: "refunded" },
];

const handleChange = (key: keyof Filters, value: string) => {
  emit("filtersChange", { ...props.filters, [key]: value } as Filters);
};
</script>

<style scoped></style>
