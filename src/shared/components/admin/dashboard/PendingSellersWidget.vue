<template>
  <div class="bg-white border border-zinc-200 rounded-lg overflow-hidden">
    <!-- Header -->
    <div
      class="flex items-center justify-between px-5 py-4 border-b border-zinc-100"
    >
      <div class="flex items-center gap-2">
        <h2 class="text-base font-bold text-zinc-900">
          Pending Seller Approvals
        </h2>
        <span
          v-if="sellers.length > 0"
          class="min-w-5 h-5 px-1.5 rounded-full bg-amber-400 text-white text-[10px] font-bold flex items-center justify-center"
        >
          {{ sellers.length }}
        </span>
      </div>
      <RouterLink
        to="/admin/sellers?status=pending"
        class="flex items-center gap-1.5 text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
      >
        View all
        <ArrowRight :size="16" />
      </RouterLink>
    </div>

    <!-- List -->
    <div class="divide-y divide-zinc-50">
      <template v-if="loading">
        <div v-for="i in 3" :key="i" class="flex items-center gap-3 px-5 py-4">
          <div class="w-9 h-9 rounded-md bg-zinc-100 animate-pulse shrink-0" />
          <div class="flex-1 space-y-1.5">
            <div class="h-3.5 w-32 rounded bg-zinc-100 animate-pulse" />
            <div class="h-3 w-24 rounded bg-zinc-100 animate-pulse" />
          </div>
          <div class="h-7 w-16 rounded-md bg-zinc-100 animate-pulse" />
        </div>
      </template>

      <template v-else>
        <div
          v-for="seller in sellers.slice(0, 5)"
          :key="seller._id"
          class="flex items-center gap-3 px-5 py-4 hover:bg-zinc-50/60 transition-colors"
        >
          <!-- Logo / placeholder -->
          <div
            class="w-9 h-9 rounded-md bg-amber-50 border border-amber-100 flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="seller.logo"
              :src="seller.logo"
              :alt="seller.storeName"
              class="object-contain"
              width="24"
              height="24"
            />
            <Store v-else :size="16" class="text-amber-400 text-base" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-zinc-800 truncate">
              {{ seller.storeName }}
            </p>
            <p class="text-xs text-zinc-400 truncate">
              {{ seller.userId?.email }}
            </p>
          </div>

          <!-- Action -->
          <RouterLink
            :to="`/admin/sellers/${seller._id}`"
            class="shrink-0 text-xs font-semibold text-amber-600 hover:text-amber-700 border border-amber-200 hover:border-amber-300 hover:bg-amber-50 px-3 py-1.5 rounded-md transition-all"
          >
            Review
          </RouterLink>
        </div>
      </template>

      <div
        v-if="!loading && sellers.length === 0"
        class="py-10 text-center text-zinc-400 text-sm"
      >
        No pending approvals
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Store } from "lucide-vue-next";

import type { SellerProfile } from "@/domains/sellers/types/seller.types";

withDefaults(
  defineProps<{
    sellers: SellerProfile[];
    loading?: boolean;
  }>(),
  {
    loading: false,
  },
);
</script>
