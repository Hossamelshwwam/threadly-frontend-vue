<template>
  <div class="min-h-screen bg-zinc-50 pb-24 pt-28">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Breadcrumb Skeleton -->
      <div class="h-4 w-48 bg-zinc-200 rounded-md animate-pulse" />

      <!-- 50/50 Layout Grid matching the actual page -->
      <div class="mt-8 lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Left Column: Image Gallery Skeleton -->
        <div class="lg:col-span-1 flex flex-col gap-4">
          <!-- Main Image -->
          <div class="w-full aspect-[4/5] bg-zinc-200/80 rounded-3xl animate-pulse" />
          <!-- Thumbnails (5 columns matching new layout) -->
          <div class="grid grid-cols-5 gap-3">
            <div
              v-for="i in 5"
              :key="i"
              class="aspect-[3/4] w-full bg-zinc-200/80 rounded-xl animate-pulse"
            />
          </div>
        </div>

        <!-- Right Column: Editorial Product Info Skeleton -->
        <div class="mt-10 lg:col-span-1 lg:mt-0">
          <div class="flex flex-col gap-10 pl-0 lg:pl-8 xl:pl-12">
            <!-- Product Info Block -->
            <div class="flex flex-col">
              <!-- Badges -->
              <div class="mb-6 flex gap-3">
                <div class="h-6 w-24 bg-zinc-200 rounded-full animate-pulse" />
                <div class="h-6 w-32 bg-zinc-200 rounded-full animate-pulse" />
              </div>

              <!-- Title -->
              <div class="mb-6 space-y-3">
                <div
                  class="h-10 sm:h-12 w-3/4 bg-zinc-200 rounded-xl animate-pulse"
                />
                <div
                  class="h-10 sm:h-12 w-1/2 bg-zinc-200 rounded-xl animate-pulse"
                />
              </div>

              <!-- Price Row -->
              <div
                class="mb-8 flex items-end justify-between border-b border-zinc-200 pb-8"
              >
                <div class="space-y-2">
                  <div class="h-3 w-16 bg-zinc-200 rounded animate-pulse" />
                  <div class="h-10 w-32 bg-zinc-200 rounded-lg animate-pulse" />
                </div>
                <div class="h-14 w-32 bg-zinc-200 rounded-2xl animate-pulse" />
              </div>

              <!-- Description Lines -->
              <div class="space-y-3">
                <div class="h-4 w-full bg-zinc-200 rounded-md animate-pulse" />
                <div class="h-4 w-5/6 bg-zinc-200 rounded-md animate-pulse" />
                <div class="h-4 w-4/6 bg-zinc-200 rounded-md animate-pulse" />
              </div>
            </div>

            <!-- Variant Selector Skeleton -->
            <div class="flex flex-col gap-8 py-2">
              <div class="space-y-4">
                <div class="flex justify-between">
                  <div class="h-4 w-12 bg-zinc-200 rounded animate-pulse" />
                  <div class="h-4 w-20 bg-zinc-200 rounded animate-pulse" />
                </div>
                <div class="flex gap-3">
                  <div
                    class="h-14 w-24 bg-zinc-200 rounded-2xl animate-pulse"
                  />
                  <div
                    class="h-14 w-24 bg-zinc-200 rounded-2xl animate-pulse"
                  />
                </div>
              </div>
            </div>

            <!-- Add To Cart Box Skeleton -->
            <div
              class="rounded-3xl bg-white p-6 shadow-sm border border-zinc-100"
            >
              <div class="flex flex-col sm:flex-row gap-3 mb-4">
                <div
                  class="h-16 w-full sm:w-[140px] bg-zinc-100 rounded-2xl animate-pulse shrink-0"
                />
                <div class="h-16 flex-1 bg-zinc-200 rounded-2xl animate-pulse" />
              </div>
              <div class="mx-auto h-3 w-32 bg-zinc-100 rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
