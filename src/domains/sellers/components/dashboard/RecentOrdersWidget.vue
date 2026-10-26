<template>
  <div
    v-if="loading"
    class="bg-white rounded-xl border border-zinc-200 p-5 space-y-4"
  >
    <div class="h-6 w-32 bg-zinc-100 rounded animate-pulse" />
    <div class="space-y-3">
      <div v-for="i in 5" :key="i" class="flex items-center gap-3">
        <div class="h-10 w-10 rounded-md bg-zinc-100 animate-pulse" />
        <div class="flex-1 space-y-1.5">
          <div class="h-4 w-40 bg-zinc-100 rounded animate-pulse" />
          <div class="h-3 w-24 bg-zinc-100 rounded animate-pulse" />
        </div>
        <div class="h-4 w-16 bg-zinc-100 rounded animate-pulse" />
        <div class="h-6 w-20 bg-zinc-100 rounded animate-pulse" />
      </div>
    </div>
  </div>

  <div v-else class="bg-white rounded-xl border border-zinc-200 p-5">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-base font-bold text-zinc-900">Recent Orders</h2>
      <RouterLink
        to="/seller/orders"
        class="text-xs font-semibold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition-colors"
      >
        View All
        <ArrowRight :size="14" class="text-sm" />
      </RouterLink>
    </div>

    <div
      v-if="orders.length === 0"
      class="flex flex-col items-center justify-center py-10 text-center"
    >
      <Inbox :size="36" class="text-4xl text-zinc-300 mb-3" />
      <p class="text-sm font-medium text-zinc-500">No orders yet</p>
      <p class="text-xs text-zinc-400 mt-1">
        Orders will appear here once customers start buying
      </p>
    </div>

    <div v-else class="divide-y divide-zinc-100">
      <RouterLink
        v-for="item in orders"
        :key="item._id"
        :to="`/seller/orders/${item._id}`"
        class="flex items-center gap-3 py-3 group hover:bg-zinc-50 -mx-5 px-5 transition-colors"
      >
        <div
          class="h-10 w-10 relative rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 shrink-0"
        >
          <img
            v-if="item.productId?.images?.[0]"
            :src="item.productId.images[0]"
            alt=""
            class="h-full w-full object-cover"
          />
          <Inbox
            v-else
            :size="16"
            class="absolute inset-0 m-auto text-zinc-300"
          />
        </div>
        <div class="flex-1 min-w-0">
          <p
            class="text-sm font-bold text-zinc-900 truncate group-hover:text-amber-600 transition-colors"
          >
            {{ item.productId?.name || "Unknown Product" }}
          </p>
          <p class="text-xs text-zinc-500">
            {{ item.quantity }}x @ EGP {{ item.unitPrice.toLocaleString() }}
          </p>
        </div>
        <div class="text-right shrink-0">
          <p class="text-sm font-bold text-zinc-900">
            EGP {{ item.total.toLocaleString() }}
          </p>
        </div>
        <OrderItemStatusBadge :status="item.status" />
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Inbox } from "lucide-vue-next";
import type { OrderItem } from "@/domains/orders/types/order.types";
import OrderItemStatusBadge from "@/domains/orders/components/OrderItemStatusBadge.vue";

withDefaults(
  defineProps<{
    orders: OrderItem[];
    loading?: boolean;
  }>(),
  { loading: false },
);
</script>
