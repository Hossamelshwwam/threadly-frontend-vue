<template>
  <div
    v-if="isLoading"
    class="py-32 flex flex-col items-center justify-center text-amber-600 font-medium animate-pulse flex-1"
  >
    <div
      class="w-10 h-10 border-4 border-amber-100 border-t-amber-500 rounded-full animate-spin mb-4"
    />
    Finding your pending reviews...
  </div>

  <div v-else class="flex-1 font-sans animate-fadeIn space-y-6 pb-12">
    <!-- VIBRANT HEADER -->
    <div
      class="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-32 h-32 bg-amber-400 opacity-10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl pointer-events-none"
      />

      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-1">
          <div class="bg-white p-2 rounded-lg shadow-sm text-amber-600">
            <Smile :size="24" />
          </div>
          <h1
            class="text-2xl md:text-3xl font-black text-zinc-900 tracking-tight"
          >
            Pending Reviews
          </h1>
        </div>
        <p class="text-sm font-semibold text-amber-800/80 mt-2">
          Share your thoughts on these recently delivered items to help other
          shoppers!
        </p>
      </div>

      <div class="relative z-10 text-center hidden sm:block">
        <p
          class="text-xs font-black text-amber-500 uppercase tracking-widest mb-1"
        >
          Awaiting
        </p>
        <p class="text-3xl font-black text-zinc-900">
          {{ pendingItems.length }}
        </p>
      </div>
    </div>

    <!-- ITEMS LIST -->
    <div
      v-if="pendingItems.length === 0"
      class="bg-white border border-zinc-200 rounded-2xl p-12 text-center flex flex-col items-center"
    >
      <div
        class="h-20 w-20 bg-zinc-50 rounded-full flex items-center justify-center mb-4 border border-zinc-100"
      >
        <Smile :size="36" class="text-4xl text-zinc-300" />
      </div>
      <h3 class="text-xl font-black text-zinc-900">
        You're all caught up!
      </h3>
      <p class="text-zinc-500 font-medium mt-2 mb-6 max-w-sm">
        You don't have any pending reviews right now. Once your next order is
        delivered, it will appear here.
      </p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="item in pendingItems"
        :key="item._id"
        class="bg-white border border-zinc-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:border-amber-300 transition-colors"
      >
        <div class="p-5 flex gap-5">
          <div
            class="h-24 w-24 relative bg-zinc-100 rounded-xl shrink-0 overflow-hidden border border-zinc-200"
          >
            <img
              :src="item.productId?.images?.[0] || '/placeholder.jpg'"
              :alt="item.productId?.name || 'Product'"
              class="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div class="flex-1 flex flex-col justify-between">
            <div>
              <h3
                class="font-bold text-zinc-900 text-lg leading-tight line-clamp-2"
              >
                {{ item.productId?.name }}
              </h3>
              <p
                class="text-xs font-bold text-zinc-500 mt-2 flex items-center gap-1.5"
              >
                <Clock :size="12" /> Delivered recently
              </p>
            </div>
          </div>
        </div>
        <div class="bg-zinc-50 p-4 border-t border-zinc-100">
          <RouterLink
            :to="`/account/reviews/write/${item._id}`"
            class="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-3 rounded-xl transition-colors shadow-sm"
          >
            Write a Review <ChevronRight :size="18" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChevronRight, Clock, Smile } from "lucide-vue-next";

import { usePendingReviews } from "../hooks/useReviews";

const { data: response, isLoading } = usePendingReviews();
const pendingItems = computed(() => response.value?.data || []);
</script>

<style scoped></style>
