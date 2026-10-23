<template>
  <div
    v-if="isLoading"
    class="py-32 flex flex-col items-center justify-center text-amber-600 font-medium animate-pulse flex-1"
  >
    <div
      class="w-10 h-10 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin mb-4"
    />
    Loading your order...
  </div>

  <div
    v-else-if="!order"
    class="py-20 text-center text-zinc-500 font-medium flex-1"
  >
    Order not found.
  </div>

  <div v-else class="flex-1 font-sans animate-fadeIn space-y-6 pb-12">
    <RouterLink
      to="/account/orders"
      class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
    >
      <ChevronLeft :size="18" /> Back to Orders
    </RouterLink>

    <OrderHeader :order="order" />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      <OrderItemsList :order="order" :items="items" />

      <!-- RIGHT COLUMN: Clear, distinct info cards -->
      <div class="lg:col-span-1 space-y-6">
        <OrderShippingCard :order="order" />
        <OrderPaymentCard :order="order" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronLeft } from "lucide-vue-next";

import { useBuyerOrder } from "../hooks/useMyOrders";
import OrderHeader from "../components/buyer/OrderHeader.vue";
import OrderItemsList from "../components/buyer/OrderItemsList.vue";
import OrderShippingCard from "../components/buyer/OrderShippingCard.vue";
import OrderPaymentCard from "../components/buyer/OrderPaymentCard.vue";

const props = defineProps<{
  id: string; // From route params
}>();

const { data: response, isLoading } = useBuyerOrder(() => props.id);

const order = computed(() => response.value?.data?.order);
const items = computed(() => response.value?.data?.items || []);
</script>

<style scoped></style>
