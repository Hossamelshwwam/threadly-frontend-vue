<template>
  <div
    class="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl bg-white border border-zinc-100 p-10 text-center shadow-sm"
  >
    <div
      class="mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-zinc-50 border border-zinc-100"
    >
      <ShoppingBag :size="48" class="text-zinc-300" />
    </div>

    <h2 class="mb-4 text-3xl font-black text-zinc-950">Your cart is empty</h2>

    <p
      class="mb-10 max-w-md text-base font-medium text-zinc-500 leading-relaxed"
    >
      Looks like you haven't added anything to your cart yet. Discover our
      latest arrivals and find something you love.
    </p>

    <RouterLink
      to="/products"
      class="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-amber-500 px-8 text-base font-black text-white shadow-lg shadow-amber-500/25 transition-all hover:bg-amber-600 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
    >
      Start Shopping
      <ArrowRight
        :size="20"
        class="transition-transform group-hover:translate-x-1"
      />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, ShoppingBag } from "lucide-vue-next";
</script>

<style scoped></style>
