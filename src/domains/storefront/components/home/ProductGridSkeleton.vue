<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
    <div
      v-for="(_, i) in Array.from({ length: 8 })"
      :key="i"
      class="bg-white rounded-2xl overflow-hidden shadow-sm border border-zinc-100"
    >
      <div class="aspect-[4/5] bg-zinc-100 animate-pulse" />
      <div class="p-4 pt-3 space-y-2">
        <div class="h-4 w-3/4 bg-zinc-100 animate-pulse" />
        <div class="flex items-center justify-between">
          <div class="h-6 w-24 bg-amber-200 animate-pulse" />
          <div class="h-5 w-12 bg-amber-100 animate-pulse rounded-full" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
