<template>
  <div
    class="bg-zinc-50 rounded-2xl border border-zinc-200 shadow-sm font-sans flex flex-col overflow-hidden"
  >
    <!-- 1. Hero Section: Using Zinc Surfaces and Success Tokens -->
    <div
      class="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-100 relative overflow-hidden"
    >
      <!-- Subtle background decoration -->
      <BadgeDollarSign
        class="absolute -bottom-6 -right-4 text-zinc-300 opacity-20 text-9xl pointer-events-none"
        :size="128"
      />

      <div class="relative z-10">
        <p
          class="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-1.5"
        >
          Total Net Payout
        </p>
        <div class="flex items-baseline gap-2">
          <span class="text-xl font-bold text-zinc-400">EGP</span>
          <h2 class="text-4xl font-black text-zinc-950 tracking-tight">
            {{
              payout.netAmount.toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })
            }}
          </h2>
        </div>
        <p class="text-xs text-zinc-500 mt-2 font-medium">
          Requested on {{ date }}
        </p>
      </div>

      <div class="relative z-10 shrink-0">
        <PayoutStatusBadge :status="payout.status" />
      </div>
    </div>

    <!-- 2. Metadata Grid: Using Amber & Terracotta Brand Colors -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 p-6 sm:p-8 gap-8 border-b border-zinc-200 bg-zinc-50"
    >
      <!-- Vendor Info -->
      <div class="space-y-3">
        <div class="flex items-center gap-3 text-zinc-800">
          <div
            class="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0"
          >
            <Store :size="18" class="text-amber-600" />
          </div>
          <div>
            <p
              class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
            >
              Beneficiary
            </p>
            <RouterLink
              :to="`/admin/sellers/${payout.sellerId?._id}`"
              class="text-sm font-bold hover:text-amber-600 transition-colors"
            >
              {{ payout.sellerId?.storeName || "Unknown Seller" }}
            </RouterLink>
          </div>
        </div>
      </div>

      <!-- Order Info -->
      <div class="space-y-3">
        <div class="flex items-center gap-3 text-zinc-800">
          <div
            class="w-10 h-10 rounded-full bg-terra-50 border border-terra-200 flex items-center justify-center shrink-0"
          >
            <ShoppingBag :size="18" class="text-terra-600" />
          </div>
          <div>
            <p
              class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider"
            >
              Source Ledger
            </p>
            <RouterLink
              v-if="payout.orderId"
              :to="`/admin/orders/${payout.orderId._id}`"
              class="text-sm font-bold font-mono hover:text-terra-600 transition-colors"
            >
              {{ payout.orderId.orderNumber }}
            </RouterLink>
            <span v-else class="text-sm font-medium italic text-zinc-400">
              Unlinked / N/A
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Bank Routing Details -->
    <div
      v-if="bankDetails"
      class="p-6 sm:p-8 border-b border-zinc-200 bg-zinc-100"
    >
      <h4
        class="text-xs font-bold text-zinc-900 uppercase tracking-wider flex items-center gap-2 mb-5"
      >
        <Landmark class="text-zinc-500" :size="16" /> Routing Information
      </h4>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
        <div>
          <p
            class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1"
          >
            Bank Name
          </p>
          <p class="text-sm font-semibold text-zinc-950">
            {{ bankDetails.bankName || "N/A" }}
          </p>
        </div>
        <div>
          <p
            class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1"
          >
            Account Holder
          </p>
          <p class="text-sm font-semibold text-zinc-950">
            {{ bankDetails.accountName || "N/A" }}
          </p>
        </div>
        <div class="sm:col-span-2">
          <p
            class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1"
          >
            IBAN / Account Number
          </p>
          <div class="flex items-center">
            <p
              class="text-sm font-mono font-bold text-zinc-950 tracking-widest bg-zinc-50 border border-zinc-200 py-2 px-3 rounded-md shadow-xs select-all"
            >
              {{ bankDetails.accountNumber || "N/A" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Financial Breakdown (Semantic States) -->
    <div class="p-6 sm:p-8 space-y-4 bg-zinc-50">
      <h4
        class="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-3"
      >
        Settlement Calculation
      </h4>

      <div class="flex justify-between items-center text-sm">
        <span class="text-zinc-600 font-medium">Gross Transaction Volume</span>
        <span class="font-semibold text-zinc-900">
          EGP
          {{
            payout.amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </span>
      </div>

      <div class="flex justify-between items-center text-sm">
        <span class="text-zinc-600 font-medium">Platform Commission</span>
        <!-- Strictly using your defined error semantic tokens here -->
        <span
          class="font-semibold text-error bg-error-bg px-2 py-0.5 rounded border border-error/20"
        >
          - EGP
          {{
            payout.platformFee.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </span>
      </div>

      <div
        class="pt-4 border-t border-dashed border-zinc-300 flex justify-between items-end"
      >
        <span class="text-sm font-bold text-zinc-900">
          Final Disbursement
        </span>
        <!-- Strictly using your defined success semantic token here -->
        <span class="font-black text-xl text-success">
          EGP
          {{
            payout.netAmount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { BadgeDollarSign, Landmark, ShoppingBag, Store } from "lucide-vue-next";

import type { Payout } from "../../types/payout.types";
import PayoutStatusBadge from "../PayoutStatusBadge.vue";

const props = defineProps<{
  payout: Payout;
}>();

const date = computed(() =>
  new Date(props.payout.createdAt).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
);

const bankDetails = computed(() => props.payout.sellerId?.bankDetails);
</script>
