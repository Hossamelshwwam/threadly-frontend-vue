<template>
  <div
    class="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-xs font-sans"
  >
    <div class="px-5 py-4 border-b border-zinc-100 bg-zinc-50/50">
      <h3 class="text-sm font-bold text-zinc-900">Transaction Details</h3>
    </div>

    <div class="p-5 space-y-6">
      <!-- Customer Profile -->
      <div class="flex gap-3">
        <div
          class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"
        >
          <User :size="16" />
        </div>
        <div>
          <p
            class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5"
          >
            Consumer Profile
          </p>
          <p class="text-sm font-bold text-zinc-800">
            {{ order.buyerId.name }}
          </p>
          <p class="text-xs text-zinc-500">{{ order.buyerId.email }}</p>
          <p class="text-xs text-zinc-500 mt-0.5">
            {{ order.shippingAddress.phonenumber }}
          </p>
        </div>
      </div>

      <!-- Shipping Destination -->
      <div class="flex gap-3">
        <div
          class="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"
        >
          <MapPin :size="16" />
        </div>
        <div>
          <p
            class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5"
          >
            Shipping Destination
          </p>
          <p class="text-sm font-bold text-zinc-800">
            {{ order.shippingAddress.fullName }}
          </p>
          <p class="text-xs text-zinc-500 leading-relaxed max-w-[220px]">
            {{ order.shippingAddress.street }}
            <br />
            {{ order.shippingAddress.city }},
            {{ order.shippingAddress.state }}
            {{ order.shippingAddress.postalCode }}
            <br />
            {{ order.shippingAddress.country }}
          </p>
        </div>
      </div>

      <!-- Payment Method -->
      <div class="flex gap-3">
        <div
          class="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0"
        >
          <CreditCard :size="16" />
        </div>
        <div>
          <p
            class="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-0.5"
          >
            Payment Method
          </p>
          <p class="text-sm font-bold text-zinc-800 capitalize">
            {{ order.paymentMethod.replace(/_/g, " ") }}
          </p>
          <p class="text-xs font-mono text-zinc-500 mt-0.5">
            Ref: {{ order.orderNumber }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreditCard, MapPin, User } from "lucide-vue-next";
import type { Order } from "../../types/order.types";

defineProps<{
  order: Order;
}>();
</script>
