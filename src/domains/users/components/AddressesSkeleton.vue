<template>
  <div class="font-sans animate-pulse flex-1">
    <!-- Header Skeleton -->
    <div
      class="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <!-- Title Placeholder -->
        <div class="h-7 w-48 bg-zinc-200 rounded-lg mb-2.5" />
        <!-- Subtitle Placeholder -->
        <div class="h-4 w-64 bg-zinc-100 rounded-md" />
      </div>
      <!-- Add Button Placeholder -->
      <div class="h-11 w-full sm:w-44 bg-zinc-200 rounded-xl" />
    </div>

    <!-- Grid of Address Card Skeletons -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div
        v-for="i in 4"
        :key="i"
        class="border-2 border-zinc-100 rounded-2xl p-5 bg-white flex flex-col justify-between min-h-[250px]"
      >
        <div>
          <!-- Card Header (Icon + Label) -->
          <div class="flex items-center gap-2 mb-4">
            <div class="w-5 h-5 bg-zinc-200 rounded-full" />
            <div class="h-5 w-24 bg-zinc-200 rounded-md" />
          </div>

          <!-- Address Lines Skeleton -->
          <div class="space-y-3">
            <div class="h-4 w-32 bg-zinc-200 rounded-md" />
            <!-- Name -->
            <div class="h-4 w-3/4 bg-zinc-100 rounded-md" />
            <!-- Street -->
            <div class="h-4 w-2/3 bg-zinc-100 rounded-md" />
            <!-- City/State -->
            <div class="h-4 w-1/4 bg-zinc-100 rounded-md" />
            <!-- Country -->
            <div class="h-4 w-40 bg-zinc-200 rounded-md mt-4" />
            <!-- Phone -->
          </div>
        </div>

        <!-- Actions Skeleton (Edit / Remove / Set Default) -->
        <div
          class="flex items-center gap-4 pt-5 mt-5 border-t border-zinc-50"
        >
          <div class="h-4 w-12 bg-zinc-200 rounded-md" />
          <div class="h-4 w-16 bg-zinc-200 rounded-md" />
          <div class="h-4 w-24 bg-zinc-100 rounded-md ml-auto" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
