<template>
  <div class="bg-white rounded-xl border border-zinc-200 p-5">
    <h2 class="text-base font-bold text-zinc-900 mb-4">Quick Actions</h2>
    <div class="grid grid-cols-2 gap-3">
      <RouterLink
        v-for="action in actions"
        :key="action.href"
        :to="action.href"
        class="flex flex-col items-center gap-1.5 p-3 rounded-lg border border-zinc-200 hover:border-amber-300 hover:bg-amber-50/50 transition-colors group"
      >
        <component
          :is="action.icon"
          :size="18"
          class="text-lg text-zinc-400 group-hover:text-amber-500 transition-colors"
        />
        <span
          class="text-xs font-semibold text-zinc-600 group-hover:text-amber-700 transition-colors text-center"
        >
          {{ action.label }}
        </span>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Box, Plus, ShoppingBag, Star } from "lucide-vue-next";

const actions = [
  { href: "/seller/products/new", label: "New Product", icon: Plus },
  { href: "/seller/orders", label: "View Orders", icon: ShoppingBag },
  { href: "/seller/products", label: "Products", icon: Box },
  { href: "/seller/profile", label: "Store Settings", icon: Star },
];
</script>
