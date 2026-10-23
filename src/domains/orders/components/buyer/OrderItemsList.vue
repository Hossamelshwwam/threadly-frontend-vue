<template>
  <div class="lg:col-span-2 space-y-4">
    <h2 class="text-lg font-black text-zinc-900 flex items-center gap-2">
      Items in this order
      <span
        class="bg-zinc-200 text-zinc-700 text-xs px-2 py-0.5 rounded-full"
      >
        {{ items.length }}
      </span>
    </h2>

    <div class="space-y-4">
      <div
        v-for="item in items"
        :key="item._id"
        class="bg-white border border-zinc-200 rounded-2xl shadow-sm flex flex-col sm:flex-row overflow-hidden hover:border-amber-300 transition-colors"
      >
        <!-- Image Section -->
        <div
          class="h-40 sm:h-auto sm:w-40 relative bg-zinc-100 shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-200"
        >
          <img
            :src="item.productId?.images?.[0] || '/placeholder.jpg'"
            :alt="item.productId?.name || 'Product'"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div
            class="absolute top-2 left-2 bg-zinc-900 text-white text-xs font-black px-2 py-1 rounded-md shadow-md"
          >
            Qty: {{ item.quantity }}
          </div>
        </div>

        <!-- Details Section -->
        <div class="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div class="flex justify-between items-start gap-4 mb-2">
              <h3 class="font-bold text-zinc-900 text-lg leading-tight">
                {{ item.productId?.name }}
              </h3>
              <div
                class="font-black text-zinc-900 text-lg whitespace-nowrap bg-zinc-50 px-3 py-1 rounded-lg border border-zinc-100"
              >
                EGP {{ (item.unitPrice * item.quantity).toLocaleString() }}
              </div>
            </div>

            <!-- Visible Attributes -->
            <div class="flex flex-wrap gap-2 my-3">
              <span
                class="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md"
              >
                Size: {{ item.size }}
              </span>
              <span
                class="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-md"
              >
                Color: {{ item.color }}
              </span>
              <span
                class="bg-zinc-100 border border-zinc-200 text-zinc-700 text-xs font-bold px-2.5 py-1 rounded-md flex items-center gap-1"
              >
                <Store :size="12" />
                {{
                  item.sellerId === null
                    ? "Threadly"
                    : item.sellerId?.storeName
                }}
              </span>
            </div>
          </div>

          <!-- Status & Actions -->
          <div
            class="mt-4 pt-4 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3"
          >
            <div class="flex items-center gap-3">
              <OrderItemStatusBadge :status="item.status" />

              <span
                v-if="item.trackingNumber"
                class="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1.5 rounded-lg border border-blue-100"
              >
                <Truck :size="14" /> Tracking:
                <span class="font-mono">{{ item.trackingNumber }}</span>
              </span>
            </div>

            <CancelOrderItemButton
              v-if="isCancelable(item)"
              :order-id="order._id"
              :item-id="item._id"
              :item-name="item.productId?.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Store, Truck } from "lucide-vue-next";

import OrderItemStatusBadge from "../OrderItemStatusBadge.vue";
import CancelOrderItemButton from "./CancelOrderItemButton.vue";
import type { Order, OrderItem } from "../../types/order.types";

defineProps<{
  order: Order;
  items: OrderItem[];
}>();

const isCancelable = (item: OrderItem) =>
  item.status === "pending" || item.status === "processing";
</script>

<style scoped></style>
