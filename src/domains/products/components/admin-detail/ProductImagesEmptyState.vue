<template>
  <!-- Dynamic Placeholder Blocks up to limit -->
  <div
    class="col-span-2 sm:col-span-4 border border-dashed border-zinc-200 rounded-lg h-36 flex flex-col items-center justify-center bg-zinc-50/50 text-zinc-400 gap-1.5"
  >
    <ImageIcon :size="28" class="text-zinc-300" />
    <p class="text-xs font-medium">
      No graphic files mapped to this inventory profile yet.
    </p>
  </div>
</template>

<script setup lang="ts">
import { Image as ImageIcon } from "lucide-vue-next";
</script>
