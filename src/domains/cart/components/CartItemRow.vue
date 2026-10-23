<template>
  <div
    class="group flex flex-col sm:flex-row gap-6 rounded-3xl bg-white p-4 sm:p-6 shadow-sm border border-zinc-100 transition-all hover:shadow-md hover:border-amber-200"
  >
    <!-- Image -->
    <RouterLink
      :to="`/products/${product.slug || product._id}`"
      class="relative aspect-square sm:aspect-[4/5] w-full sm:w-32 shrink-0 overflow-hidden rounded-2xl bg-zinc-50"
    >
      <img
        v-if="product.images?.[0]"
        :src="product.images[0]"
        :alt="product.name"
        class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        v-else
        class="absolute inset-0 flex items-center justify-center text-zinc-400"
      >
        <ShoppingBag :size="36" class="text-4xl" />
      </div>
    </RouterLink>

    <!-- Content -->
    <div class="flex flex-1 flex-col py-1">
      <!-- Title & Remove Button Row -->
      <div class="flex items-start justify-between gap-4">
        <RouterLink
          :to="`/products/${product.slug || product._id}`"
          class="text-lg font-black text-zinc-900 transition-colors hover:text-amber-600 line-clamp-2"
        >
          {{ product.name }}
        </RouterLink>
        <button
          @click="$emit('remove', variant._id)"
          aria-label="Remove item"
          class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-500"
        >
          <Trash2 :size="16" />
        </button>
      </div>

      <!-- Variants Details (Color & Size) -->
      <div class="mt-3 flex flex-wrap items-center gap-2">
        <span
          v-if="variant.color"
          class="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600"
        >
          Color: {{ variant.color }}
        </span>
        <span
          v-if="variant.size"
          class="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-bold text-zinc-600"
        >
          Size: {{ variant.size }}
        </span>
      </div>

      <!-- Bottom Area: Quantity & Price -->
      <div class="mt-auto pt-6 flex flex-wrap items-end justify-between gap-4">
        <!-- Quantity Selector -->
        <div
          class="flex h-12 w-32 items-center justify-between rounded-xl bg-zinc-50 border border-zinc-200 p-1"
        >
          <button
            @click="handleDecrement"
            :disabled="quantity <= 1 || isUpdating"
            class="flex h-full w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Minus :size="16" />
          </button>
          <span class="text-sm font-black text-zinc-900">{{ quantity }}</span>
          <button
            @click="handleIncrement"
            :disabled="isUpdating"
            class="flex h-full w-10 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-white hover:text-zinc-900 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <Plus :size="16" />
          </button>
        </div>

        <!-- Pricing -->
        <div class="flex flex-col text-right">
          <span
            class="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1"
          >
            EGP {{ item.priceSnapshot.toLocaleString() }} each
          </span>
          <span class="text-2xl font-black text-amber-500">
            EGP {{ itemTotal.toLocaleString() }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-vue-next";
import type { CartItem } from "../types/cart.types";

interface CartItemRowProps {
  item: CartItem;
}

const props = defineProps<CartItemRowProps>();

const emit = defineEmits<{
  (e: "update-quantity", inventoryId: string, quantity: number): void;
  (e: "remove", inventoryId: string): void;
}>();

const quantity = ref(props.item.quantity);
const isUpdating = ref(false);

const product = computed(() => props.item.productId);
const variant = computed(() => props.item.inventoryId);
const itemTotal = computed(() => props.item.priceSnapshot * quantity.value);

function handleIncrement() {
  if (isUpdating.value) return;
  const newQty = quantity.value + 1;
  quantity.value = newQty;
  isUpdating.value = true;
  emit("update-quantity", variant.value._id, newQty);
  setTimeout(() => (isUpdating.value = false), 500);
}

function handleDecrement() {
  if (quantity.value <= 1 || isUpdating.value) return;
  const newQty = quantity.value - 1;
  quantity.value = newQty;
  isUpdating.value = true;
  emit("update-quantity", variant.value._id, newQty);
  setTimeout(() => (isUpdating.value = false), 500);
}
</script>

<style scoped></style>
