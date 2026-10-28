<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg overflow-hidden flex flex-col font-sans"
  >
    <div class="px-5 py-4 border-b border-zinc-100 flex items-center gap-2">
      <CreditCard :size="16" class="text-amber-500 text-base" />
      <h2 class="text-base font-bold text-zinc-900">
        Settlement Account Configuration
      </h2>
    </div>

    <div class="p-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div
        v-for="item in items"
        :key="item.label"
        class="bg-zinc-50 border border-zinc-100 rounded-md p-3.5 flex flex-col gap-1"
      >
        <span
          class="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest"
        >
          {{ item.label }}
        </span>
        <p
          :class="[
            'text-sm font-semibold text-zinc-800 truncate',
            item.className || '',
          ]"
        >
          {{ item.value }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { CreditCard } from "lucide-vue-next";

import type { SellerProfile } from "../../types/seller.types";

const props = defineProps<{
  seller: SellerProfile;
}>();

// Gracefully fallback fields referencing registration payload signatures
const bankName = computed(() => props.seller.bankDetails.bankName || "—");
const accountName = computed(() => props.seller.bankDetails.accountName || "—");
const accountNumber = computed(
  () => props.seller.bankDetails.accountNumber || "—",
);

const items = computed(() => [
  { label: "Bank Institution", value: bankName.value },
  { label: "Beneficiary Name", value: accountName.value },
  {
    label: "Account Number / IBAN",
    value: accountNumber.value,
    className: "font-mono select-all text-xs tracking-wider",
  },
]);
</script>
