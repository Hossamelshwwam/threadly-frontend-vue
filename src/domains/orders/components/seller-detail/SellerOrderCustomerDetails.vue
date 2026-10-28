<template>
  <div
    class="bg-white border border-zinc-200 rounded-lg p-5 space-y-4 font-sans shadow-xs"
  >
    <div class="flex items-center gap-2 pb-2 border-b border-zinc-100">
      <MapPin :size="18" class="text-amber-500 text-lg" />
      <h2 class="text-sm font-bold text-zinc-900">Shipping Destination</h2>
    </div>

    <div class="space-y-3 text-sm">
      <div v-if="buyer" class="flex items-start gap-2.5">
        <User :size="16" class="text-zinc-400 mt-0.5 shrink-0" />
        <div class="flex flex-col">
          <span class="font-bold text-zinc-800">
            {{ address.fullName || buyer.name }}
          </span>
          <span class="text-xs text-zinc-400 font-medium">
            {{ buyer.email }}
          </span>
        </div>
      </div>

      <div class="flex items-start gap-2.5 border-t border-zinc-50 pt-2.5">
        <MapPin :size="16" class="text-zinc-400 mt-0.5 shrink-0" />
        <div
          class="text-zinc-600 font-medium flex flex-col gap-0.5 leading-relaxed"
        >
          <span>{{ address.street }}</span>
          <span>{{ address.city }}, {{ address.state }}</span>
          <span>{{ address.country }} {{ address.postalCode && `(${address.postalCode})` }}</span>        </div>
      </div>

      <div
        class="flex items-center gap-2.5 border-t border-zinc-50 pt-2.5 text-zinc-600 font-medium"
      >
        <Phone :size="16" class="text-zinc-400 shrink-0" />
        <span>{{ address.phonenumber }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MapPin, Phone, User } from "lucide-vue-next";

import type { Order, ShippingAddress } from "../../types/order.types";

defineProps<{
  address: ShippingAddress;
  buyer?: Order["buyerId"];
}>();
</script>
