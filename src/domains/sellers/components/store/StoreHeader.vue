<template>
  <div
    class="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm animate-fadeIn"
  >
    <!-- Banner Section -->
    <div
      class="h-48 md:h-64 w-full relative bg-amber-50 border-b border-zinc-200 overflow-hidden"
    >
      <img
        v-if="store.banner"
        :src="store.banner"
        :alt="`${store.storeName} Banner`"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <!-- Decorative fallback if no banner -->
      <div
        v-else
        class="absolute inset-0 bg-linear-to-r from-amber-100 to-amber-50 flex items-center justify-center"
      >
        <Store :size="128" class="text-amber-200/50 text-9xl" />
      </div>
    </div>

    <!-- Info Section -->
    <div class="px-6 md:px-10 pb-8 relative">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <!-- Logo & Name -->
        <div
          class="flex flex-col md:flex-row md:items-end gap-5 -mt-12 relative z-10"
        >
          <div
            class="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-white border-4 border-white shadow-md overflow-hidden relative shrink-0"
          >
            <img
              v-if="store.logo"
              :src="store.logo"
              :alt="store.storeName"
              class="absolute inset-0 h-full w-full object-cover"
            />
            <div
              v-else
              class="w-full h-full bg-zinc-100 flex items-center justify-center"
            >
              <Store :size="36" class="text-4xl text-zinc-400" />
            </div>
          </div>

          <div class="mb-2">
            <h1
              class="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight"
            >
              {{ store.storeName }}
            </h1>
            <div
              class="flex flex-wrap items-center gap-4 text-xs font-bold text-zinc-500 mt-2"
            >
              <span class="flex items-center gap-1.5">
                <CalendarCheck :size="14" /> Joined
                {{ new Date(store.createdAt).getFullYear() }}
              </span>
            </div>
          </div>
        </div>

        <!-- Action / Rating Area (Optional) -->
        <div class="mb-2 flex items-center gap-2">
          <span
            class="bg-amber-50 text-amber-700 border border-amber-200 px-4 py-2 rounded-xl text-sm font-black shadow-sm"
          >
            Official Threadly Partner
          </span>
        </div>
      </div>

      <!-- Description -->
      <p
        v-if="store.description"
        class="mt-6 text-zinc-600 text-sm font-medium leading-relaxed max-w-3xl"
      >
        {{ store.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarCheck, Store } from "lucide-vue-next";
import type { SellerProfile } from "../../types/seller.types";

defineProps<{ store: SellerProfile }>();
</script>

<style scoped></style>
