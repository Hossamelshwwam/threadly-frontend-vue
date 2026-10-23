<template>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-28 animate-pulse font-sans"
  >
    <!-- Header Skeleton -->
    <div
      class="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm mb-10"
    >
      <div class="h-48 md:h-64 w-full bg-zinc-200" />
      <div class="px-6 md:px-10 pb-8 relative">
        <div class="flex flex-col md:flex-row gap-5 -mt-12">
          <div
            class="h-24 w-24 md:h-32 md:w-32 rounded-2xl bg-zinc-300 border-4 border-white shrink-0"
          />
          <div class="mt-14 md:mt-16 w-full">
            <div class="h-8 w-64 bg-zinc-200 rounded-lg mb-3" />
            <div class="h-4 w-40 bg-zinc-100 rounded-md" />
          </div>
        </div>
        <div class="h-4 w-full max-w-2xl bg-zinc-100 rounded-md mt-6" />
        <div class="h-4 w-3/4 max-w-xl bg-zinc-100 rounded-md mt-2" />
      </div>
    </div>

    <!-- Products Grid Skeleton -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="i" class="flex flex-col gap-3">
        <div class="w-full aspect-[3/4] bg-zinc-200 rounded-2xl" />
        <div class="h-5 w-3/4 bg-zinc-200 rounded-md" />
        <div class="h-5 w-1/3 bg-zinc-200 rounded-md" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
