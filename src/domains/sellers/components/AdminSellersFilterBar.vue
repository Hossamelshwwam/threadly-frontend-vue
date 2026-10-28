<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg px-4 py-3 flex flex-col sm:flex-row gap-3"
  >
    <div class="flex-1">
      <CustomInput
        v-model="search"
        name="search"
        type="text"
        placeholder="Search by store name or owner..."
        :Icon="Search"
      />
    </div>
    <div class="flex items-center gap-1.5 overflow-x-auto">
      <button
        v-for="f in STATUS_FILTERS"
        :key="f.value"
        type="button"
        @click="statusFilter = f.value"
        :class="
          cn(
            'text-sm font-semibold px-4 py-2 rounded-md transition-colors whitespace-nowrap cursor-pointer',
            statusFilter === f.value
              ? 'bg-amber-400 text-white'
              : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200',
          )
        "
      >
        {{ f.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next";

import CustomInput from "@/shared/components/custom-input/CustomInput.vue";
import { cn } from "@/shared/lib/utils";
import type { SellerStatus } from "../types/seller.types";

const STATUS_FILTERS: { label: string; value: SellerStatus | "" }[] = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Suspended", value: "suspended" },
];

const search = defineModel<string>("search", { required: true });
const statusFilter = defineModel<SellerStatus | "">("statusFilter", {
  required: true,
});
</script>
