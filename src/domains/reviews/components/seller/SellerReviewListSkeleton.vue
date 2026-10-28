<template>
  <div class="divide-y divide-zinc-100">
    <div v-for="i in 4" :key="i" class="p-5 animate-pulse">
      <div class="flex gap-4">
        <div class="w-16 h-16 rounded-lg bg-zinc-200 shrink-0" />
        <div class="flex-1 space-y-3">
          <div class="flex items-start justify-between gap-4">
            <div class="space-y-2 flex-1">
              <div class="h-4 w-40 rounded bg-zinc-200" />
              <div class="h-3 w-24 rounded bg-zinc-100" />
            </div>
            <div class="h-3 w-20 rounded bg-zinc-100 shrink-0" />
          </div>
          <div class="flex gap-1">
            <div
              v-for="s in 5"
              :key="s"
              class="w-3.5 h-3.5 rounded bg-zinc-200"
            />
          </div>
          <div class="space-y-2">
            <div class="h-3 w-full rounded bg-zinc-100" />
            <div class="h-3 w-3/4 rounded bg-zinc-100" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
