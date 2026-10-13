<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="bg-zinc-50 text-zinc-900 font-sans min-h-screen flex flex-col">
    <RouterView />

    <div
      class="fixed top-0 right-0 w-[500px] h-[500px] bg-amber-400 opacity-10 blur-[120px] rounded-full pointer-events-none"
    ></div>
    <div
      class="fixed bottom-0 left-0 w-[400px] h-[400px] bg-amber-300 opacity-10 blur-[100px] rounded-full pointer-events-none"
    ></div>
  </div>
</template>
