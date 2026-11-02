<template>
  <div
    class="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden font-sans min-w-0 w-full"
  >
    <!-- Header -->
    <div
      class="px-4 sm:px-5 py-3 sm:py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between"
    >
      <h3 class="text-sm font-bold text-zinc-900">
        Purchased Items ({{ items.length }})
      </h3>
    </div>

    <!-- Items List -->
    <div class="divide-y divide-zinc-100">
      <AdminOrderItemRow
        v-for="item in items"
        :key="item._id"
        :item="item"
        :order-id="order._id"
        :is-editing="editingItemId === item._id"
        @edit-start="editingItemId = item._id"
        @edit-cancel="editingItemId = null"
      />
    </div>

    <!-- Financial Totals Footer -->
    <div
      class="bg-zinc-50/50 p-4 sm:p-5 border-t border-zinc-100 space-y-3 text-[13px] sm:text-sm"
    >
      <div class="flex justify-between text-zinc-500">
        <span>Original Items Total</span>
        <span class="font-semibold text-zinc-700">
          EGP
          {{ allTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}
        </span>
      </div>

      <div
        v-if="allCancelledTotal > 0"
        class="flex flex-wrap justify-between items-center text-error bg-error-bg/40 px-3 py-2 rounded-lg border border-error/10 gap-2"
      >
        <span
          class="font-semibold text-[11px] sm:text-xs tracking-wide uppercase"
        >
          Cancelled Items Deduction
        </span>
        <span class="font-bold">
          - EGP
          {{
            allCancelledTotal.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </span>
      </div>

      <div class="flex justify-between text-zinc-500 pt-1">
        <span>Shipping &amp; Fees (Estimated)</span>
        <span class="font-semibold text-zinc-700">
          EGP
          {{
            (order.total - order.subtotal).toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </span>
      </div>

      <!-- Gross Total -->
      <div
        class="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-1 sm:gap-0 pt-4 border-t border-zinc-200/60 mt-4"
      >
        <div>
          <span
            class="font-extrabold text-zinc-900 block text-sm sm:text-base"
          >
            Adjusted Gross Total
          </span>
          <span
            v-if="allCancelledTotal > 0"
            class="text-[10px] text-zinc-400 font-medium"
          >
            Reflects cancelled item deductions
          </span>
        </div>
        <span
          class="font-extrabold text-zinc-900 text-lg sm:text-xl self-end sm:self-auto"
        >
          EGP
          {{
            order.total.toLocaleString(undefined, { minimumFractionDigits: 2 })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Order, OrderItem } from "../../types/order.types";
import AdminOrderItemRow from "./AdminOrderItemRow.vue";

const props = defineProps<{
  items: OrderItem[];
  order: Order;
}>();

const editingItemId = ref<string | null>(null);

const allTotal = computed(() =>
  props.items.reduce((prev, cur) => prev + cur.total, 0),
);

const allCancelledTotal = computed(() =>
  props.items
    .filter((it) => it.status === "cancelled")
    .reduce((prev, cur) => prev + cur.total, 0),
);
</script>
