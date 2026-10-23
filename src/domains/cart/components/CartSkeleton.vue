<template>
  <div
    class="min-h-screen bg-zinc-50 px-4 py-8 pt-28 sm:px-6 lg:px-8"
  >
    <div class="mx-auto max-w-7xl">
      <div class="mb-10">
        <div class="mb-4 h-6 w-32 animate-pulse rounded-md bg-zinc-200" />
        <div class="h-12 w-64 animate-pulse rounded-xl bg-zinc-200" />
      </div>
      <div class="lg:grid lg:grid-cols-12 lg:gap-12">
        <div class="lg:col-span-8 space-y-6">
          <div
            v-for="i in 3"
            :key="i"
            class="h-48 animate-pulse rounded-3xl bg-white border border-zinc-100 shadow-sm"
          />
        </div>
        <div class="mt-10 lg:col-span-4 lg:mt-0">
          <div
            class="h-80 animate-pulse rounded-3xl bg-white border border-zinc-100 shadow-sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
