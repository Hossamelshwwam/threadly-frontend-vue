<template>
  <div
    v-if="isCartLoading || isAddressLoading"
    class="py-32 text-center text-zinc-500 font-sans"
  >
    Preparing secure checkout...
  </div>

  <div v-else class="bg-zinc-50 font-sans min-h-screen pt-28 pb-20">
    <AuthGuard>
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header matching the design -->
        <div class="mb-6 space-y-4">
          <RouterLink
            to="/cart"
            class="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors w-fit"
          >
            <ArrowLeft :size="16" /> Back to Cart
          </RouterLink>
          <h1 class="text-3xl font-black text-zinc-900 tracking-tight">
            Checkout
          </h1>
        </div>

        <div class="flex flex-col lg:flex-row gap-6 items-start">
          <!-- LEFT COLUMN: The Stacked Cards -->
          <div class="flex-1 w-full space-y-6">
            <CheckoutDeliveryForm
              :addresses="addresses"
              v-model:select-address="selectAddress"
            />

            <CheckoutPaymentForm v-model:select-method="selectMethod" />
          </div>

          <!-- RIGHT COLUMN: Order Summary Card -->
          <div class="shrink-0 space-y-6">
            <CheckoutOrderSummary
              :cart-items="cart?.items || []"
              :subtotal="subtotal"
              :shipping-fee="shippingFee"
              :total="total"
              :is-pending="isPending"
              :disabled="!selectAddress || isPending"
              @submit="onSubmit"
            />

            <!-- Trust Badges Card -->
            <div
              class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-3 font-sans"
            >
              <div
                v-for="(text, i) in trustBadges"
                :key="i"
                class="flex items-center gap-3 text-sm text-zinc-600 font-medium"
              >
                <span
                  class="text-amber-500 font-extrabold text-base select-none"
                >
                  ✓
                </span>
                <span>{{ text }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue-sonner";
import { ArrowLeft } from "lucide-vue-next";

import useCart from "@/domains/cart/hooks/useCart";
import { useMyAddresses } from "@/domains/users/hooks/useUser";
import { usePlaceOrder } from "@/domains/orders/hooks/useCheckout";
import type { checkoutApi } from "@/domains/orders/api/checkout.api";

import CheckoutDeliveryForm from "../components/checkout/CheckoutDeliveryForm.vue";
import CheckoutPaymentForm from "../components/checkout/CheckoutPaymentForm.vue";
import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary.vue";
import AuthGuard from "@/domains/auth/guard/AuthGuard.vue";

type PlaceOrderResult = Awaited<ReturnType<typeof checkoutApi.placeOrder>>;

const selectAddress = ref("");
const selectMethod = ref<"credit_card" | "cash_on_delivery">(
  "cash_on_delivery",
);
const router = useRouter();

const { data: cartResponse, isLoading: isCartLoading } = useCart();
const { data: addressResponse, isLoading: isAddressLoading } = useMyAddresses();
const { mutateAsync: placeOrderAsync, isPending } = usePlaceOrder();

const cart = computed(() => cartResponse.value?.data);
const addresses = computed(() => addressResponse.value?.data || []);

// watch(
//   [cart, isCartLoading],
//   () => {
//     if (!isCartLoading.value && (!cart.value || cart.value.items.length === 0)) {
//       router.push("/cart");
//     }
//   },
// );

const subtotal = computed(() => cart.value?.total ?? 0);
const shippingFee = 0;
const total = computed(() => subtotal.value + shippingFee);

const trustBadges = [
  "Premium quality materials",
  "Secure 256-bit encryption",
  "Fast & reliable shipping",
  "Dedicated customer support",
];

function apiErrorMessage(err: unknown, fallback: string) {
  const message = (err as { response?: { data?: { message?: string } } })
    ?.response?.data?.message;
  return message || fallback;
}

const onSubmit = async () => {
  const payload = {
    paymentMethod: selectMethod.value,
    addressId: selectAddress.value,
  };

  toast.promise(placeOrderAsync(payload), {
    loading: "Processing your secure payment...",
    success: (res: PlaceOrderResult) => {
      router.push(`/orders/${res.data.order._id}/confirmation`);
      return "Order placed successfully!";
    },
    error: (err: unknown) =>
      apiErrorMessage(err, "Failed to place order. Please try again."),
  });
};
</script>

<style scoped></style>
