<template>
  <!-- Only return the dead state if the product is entirely sold out everywhere -->
  <div
    v-if="maxStock <= 0"
    class="flex h-16 w-full items-center justify-center rounded-2xl bg-red-50 text-sm font-bold text-red-500"
  >
    Currently Out of Stock
  </div>

  <div v-else class="flex flex-col gap-4">
    <div class="flex flex-col sm:flex-row items-stretch gap-3">
      <!-- Sleek Quantity Pill -->
      <div
        class="flex h-16 w-full sm:w-[140px] items-center justify-between rounded-2xl bg-zinc-50 border border-zinc-200 p-1.5 shrink-0"
      >
        <button
          @click="quantity = Math.max(1, quantity - 1)"
          :disabled="quantity <= 1"
          class="flex h-full w-12 items-center justify-center rounded-xl text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
        >
          <Minus :size="20" />
        </button>
        <span class="text-lg font-black text-zinc-900">{{ quantity }}</span>
        <button
          @click="quantity = Math.min(availableStock, quantity + 1)"
          :disabled="quantity >= availableStock"
          class="flex h-full w-12 items-center justify-center rounded-xl text-zinc-400 hover:bg-white hover:text-zinc-900 hover:shadow-sm transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:shadow-none"
        >
          <Plus :size="20" />
        </button>
      </div>

      <!-- Massive Primary CTA Button - No longer disabled by missing variants! -->
      <CustomButton
        @click="handleAddToCart"
        :disabled="isPending"
        :loading="isPending"
        full-width
        :left-icon="ShoppingBag"
        class="group h-16 rounded-2xl text-lg"
      >
        {{
          isPending
            ? "Adding to Cart..."
            : `Add to Cart — EGP ${(price * quantity).toLocaleString()}`
        }}
      </CustomButton>
    </div>

    <div class="flex items-center justify-center gap-2">
      <span class="relative flex h-2 w-2">
        <span
          class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
        ></span>
        <span
          class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"
        ></span>
      </span>
      <p
        class="text-xs font-bold uppercase tracking-widest text-zinc-500"
      >
        {{ inventoryId ? `${maxStock} Items Available` : "In Stock and Ready to Ship" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Minus, Plus, ShoppingBag } from "lucide-vue-next";
import { toast } from "vue-sonner";
import useAddProductToCart from "@/domains/cart/hooks/useAddProductToCart";
import { useGetMe } from "@/domains/users/hooks/useUser";
import CustomButton from "@/shared/components/custom-button/CustomButton.vue";

interface AddToCartSectionProps {
  productId: string;
  inventoryId?: string;
  maxStock: number;
  hasVariants: boolean;
  price: number;
}

const props = defineProps<AddToCartSectionProps>();

const quantity = ref(1);
const { mutateAsync: addToCart, isPending } = useAddProductToCart();
const { isError } = useGetMe();

// Use a fallback stock number (e.g. 10) for the quantity selector if they haven't picked a variant yet
const availableStock = computed(() => (props.inventoryId ? props.maxStock : 10));

async function handleAddToCart() {
  if (isError.value) {
    toast.error("Login Required", {
      description: "Please login to add to cart.",
    });
    return;
  }

  // 1. VALIDATION: Check if variants are selected before doing anything
  if (props.hasVariants && !props.inventoryId) {
    toast.error("Selection Required", {
      description: "Please choose a color and size before adding to cart.",
    });
    return;
  }

  if (isPending.value) return;

  // 2. Submit to Cart
  const items = quantity.value;
  try {
    await toast.promise(
      addToCart({
        productId: props.productId,
        inventoryId: props.inventoryId as string,
        quantity: items,
      }),
      {
        loading: "Adding to cart...",
        success: `Added to cart!`,
        error: (err: { response?: { data?: { message?: string } } }) =>
          err.response?.data?.message ?? "Failed to add to cart.",
      },
    );
    quantity.value = 1;
  } catch {
    // toast.promise already surfaced the error
  }
}
</script>

<style scoped></style>
