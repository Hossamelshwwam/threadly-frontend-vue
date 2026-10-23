<template>
  <CartSkeleton v-if="isLoading" />

  <div v-else class="min-h-screen bg-zinc-50 pb-24 pt-28">
    <AuthGuard>
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <!-- Header -->
        <div class="mb-10">
          <RouterLink
            to="/products"
            class="mb-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-amber-600"
          >
            <ArrowLeft :size="16" />
            Continue Shopping
          </RouterLink>
          <div class="flex items-end justify-between">
            <div>
              <h1
                class="text-4xl sm:text-5xl font-black tracking-tight text-zinc-950"
              >
                Your Cart
              </h1>
              <p
                v-if="hasItems"
                class="mt-3 text-sm font-bold text-zinc-500"
              >
                {{ itemCount }} {{ itemCount === 1 ? "Item" : "Items" }} selected
              </p>
            </div>
          </div>
        </div>

        <EmptyCart v-if="!hasItems" />

        <div v-else class="lg:grid lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <!-- Cart Items List -->
          <div class="lg:col-span-8 flex flex-col gap-6">
            <CartItemRow
              v-for="item in items"
              :key="item.inventoryId._id"
              :item="item"
              @update-quantity="handleUpdateQuantity"
              @remove="handleRemove"
            />
          </div>

          <!-- Order Summary (Sticky) -->
          <div class="mt-12 lg:col-span-4 lg:mt-0">
            <div class="sticky top-28">
              <CartSummary
                :subtotal="totalPrice"
                :item-count="itemCount"
                :disabled="!hasItems"
              />
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft } from "lucide-vue-next";
import { toast } from "vue-sonner";
import useCart from "../hooks/useCart";
import useUpdateCartItem from "../hooks/useUpdateCartItem";
import useRemoveCartItem from "../hooks/useRemoveCartItem";
import CartItemRow from "../components/CartItemRow.vue";
import CartSummary from "../components/CartSummary.vue";
import EmptyCart from "../components/EmptyCart.vue";
import CartSkeleton from "../components/CartSkeleton.vue";
import AuthGuard from "@/domains/auth/guard/AuthGuard.vue";

const { data: cartData, isLoading, itemCount, totalPrice } = useCart();
const { mutateAsync: updateItem } = useUpdateCartItem();
const { mutateAsync: removeItem } = useRemoveCartItem();

const items = computed(() => cartData.value?.data?.items ?? []);
const hasItems = computed(() => items.value.length > 0);

function apiErrorMessage(err: unknown, fallback: string) {
  const message = (err as { response?: { data?: { message?: string } } })
    ?.response?.data?.message;
  return message || fallback;
}

function handleUpdateQuantity(inventoryId: string, quantity: number) {
  toast.promise(updateItem({ inventoryId, quantity }), {
    loading: "Updating cart...",
    success: "Cart updated successfully",
    error: (err: unknown) => apiErrorMessage(err, "Failed to update"),
  });
}

function handleRemove(inventoryId: string) {
  toast.promise(removeItem(inventoryId), {
    loading: "Removing item...",
    success: "Item removed from cart",
    error: (err: unknown) => apiErrorMessage(err, "Failed to remove"),
  });
}
</script>

<style scoped></style>
