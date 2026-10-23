<template>
  <div
    class="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden font-sans"
  >
    <div class="p-6 border-b border-zinc-100">
      <h2 class="text-lg font-bold text-zinc-900">Order Summary</h2>
    </div>

    <div class="p-6 space-y-6">
      <!-- Items List -->
      <div
        class="space-y-4 max-h-[35vh] overflow-y-auto pr-2 custom-scrollbar"
      >
        <div
          v-for="(item, idx) in cartItems"
          :key="idx"
          class="flex items-center gap-4 text-sm pt-2"
        >
          <div class="relative">
            <div
              class="h-14 w-14 relative bg-zinc-50 rounded-lg border border-zinc-200 overflow-hidden shrink-0"
            >
              <img
                v-if="item.productId.images?.[0]"
                :src="item.productId.images[0]"
                :alt="item.productId?.name || 'Product'"
                class="absolute inset-0 h-full w-full object-cover"
              />
              <div
                v-else
                class="absolute inset-0 flex items-center justify-center"
              >
                <ShoppingBag :size="20" class="text-xl text-zinc-300" />
              </div>
            </div>
            <!-- Brand-aligned dark badge for quantity -->
            <span
              class="absolute -top-2 -right-2 bg-main text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white"
            >
              {{ item.quantity }}
            </span>
          </div>

          <div class="flex-1 min-w-0">
            <p class="font-bold text-zinc-900 truncate">
              {{ item.productId?.name }}
            </p>
            <p class="text-xs text-zinc-500 mt-0.5">
              {{ item.inventoryId?.size }} / {{ item.inventoryId?.color }}
            </p>
          </div>

          <div class="font-bold text-zinc-900 whitespace-nowrap">
            EGP {{ (item.priceSnapshot * item.quantity).toLocaleString() }}
          </div>
        </div>
      </div>

      <!-- Totals Breakdown -->
      <div class="space-y-3 text-sm pt-4 border-t border-zinc-100">
        <div class="flex justify-between text-zinc-500 font-medium">
          <span>Subtotal</span>
          <span class="text-zinc-900">
            EGP {{ subtotal.toLocaleString() }}
          </span>
        </div>
        <div class="flex justify-between text-zinc-500 font-medium">
          <span>Delivery</span>
          <span class="text-zinc-900">
            EGP {{ shippingFee.toLocaleString() }}
          </span>
        </div>

        <!-- On-brand Total Box using zinc & amber -->
        <div
          class="flex justify-between items-center bg-zinc-50 border border-zinc-200 text-zinc-900 px-4 py-3 rounded-xl mt-4 font-bold shadow-sm"
        >
          <span>Total</span>
          <div class="flex items-baseline gap-1.5">
            <span class="text-xs text-zinc-500 font-medium">EGP</span>
            <span class="text-lg text-amber-600">
              {{ total.toLocaleString() }}
            </span>
          </div>
        </div>
      </div>

      <p class="text-xs text-zinc-400 text-center leading-relaxed">
        Delivery fee and taxes (if applicable) are calculated during checkout
      </p>

      <!-- Replaced raw button with Design System CustomButton -->
      <CustomButton
        type="submit"
        variant="solid"
        theme="primary"
        fullWidth
        :disabled="disabled"
        @click="$emit('submit')"
      >
        {{ isPending ? "Processing..." : "Complete Purchase" }}
      </CustomButton>

      <div
        class="flex items-center justify-center gap-1.5 pt-2 text-zinc-400"
      >
        <LockKeyhole :size="12" />
        <span class="text-[10px] font-bold uppercase tracking-widest">
          Secure Encrypted Payment
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from "@/domains/cart/types/cart.types";
import { LockKeyhole, ShoppingBag } from "lucide-vue-next";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

interface Props {
  cartItems: CartItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  isPending: boolean;
  disabled: boolean;
}

defineProps<Props>();

defineEmits<{
  (e: "submit"): void;
}>();
</script>

<style scoped></style>
